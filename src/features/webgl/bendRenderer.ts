// A minimal WebGL renderer for bent, textured planes (Home Selected Work).
// One shader program and one shared subdivided plane; each project is drawn
// with its own uniforms. No framework, no lights, no post-processing.

export const PLANE_SEGMENTS_X = 32;
export const PLANE_SEGMENTS_Y = 2;

export type PlaneState = {
  centerX: number; // stage CSS px
  centerY: number;
  width: number; // CSS px
  height: number;
  bend: number; // total arc angle in radians; 0 = flat
  rotateY: number; // radians, same sense as CSS rotateY()
  rotateZ: number; // radians, same sense as CSS rotateZ()
  radius: number; // corner radius, CSS px
  opacity: number;
};

const VERTEX_SHADER = `
attribute vec2 aPos; // plane-local, -0.5..0.5
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform vec2 uSize;
uniform float uBend;
uniform float uRotateY;
uniform float uRotateZ;
uniform float uFocal;
varying vec2 vUv;
varying vec2 vLocal;

void main() {
  float px = aPos.x * uSize.x;
  float py = aPos.y * uSize.y;

  // Cylindrical bend: the plane's width is laid along an arc of angle
  // uBend; both side edges come toward the viewer (concave).
  float bx = px;
  float bz = 0.0;
  float bend = abs(uBend);
  if (bend > 0.0001) {
    float radius = uSize.x / bend;
    float theta = px / radius;
    bx = radius * sin(theta);
    bz = radius * (1.0 - cos(theta));
  }

  // rotateY, then a perspective divide
  float c = cos(uRotateY);
  float s = sin(uRotateY);
  float rx = bx * c + bz * s;
  float rz = -bx * s + bz * c;
  float depth = (uFocal - rz) / uFocal;

  // small in-plane tilt (rotateZ), applied on screen
  vec2 p = vec2(rx, py) / depth;
  float cz = cos(uRotateZ);
  float sz = sin(uRotateZ);
  p = vec2(p.x * cz - p.y * sz, p.x * sz + p.y * cz);

  vec2 screen = uCenter + p;
  vec2 ndc = vec2(screen.x / uResolution.x * 2.0 - 1.0, 1.0 - screen.y / uResolution.y * 2.0);

  // w = depth keeps texture interpolation perspective-correct
  gl_Position = vec4(ndc * depth, 0.0, depth);
  vUv = aPos + 0.5;
  vLocal = vec2(px, py);
}
`;

// highp so shared uniforms (uSize) match the vertex shader's precision, as
// GLSL ES requires; devices without it fail to link and keep the CSS scene
const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uTexture;
uniform vec2 uUvScale;
uniform vec2 uUvOffset;
uniform vec2 uSize;
uniform float uRadius;
uniform float uOpacity;
varying vec2 vUv;
varying vec2 vLocal;

void main() {
  vec4 color = texture2D(uTexture, vUv * uUvScale + uUvOffset);

  // rounded-rectangle mask with a 1px soft edge
  vec2 q = abs(vLocal) - (uSize * 0.5 - uRadius);
  float dist = length(max(q, 0.0)) - uRadius;
  float alpha = uOpacity * clamp(0.5 - dist, 0.0, 1.0);

  gl_FragColor = vec4(color.rgb * alpha, alpha);
}
`;

type TextureSlot = {
  texture: WebGLTexture;
  width: number;
  height: number;
  ready: boolean;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);

    return null;
  }

  return shader;
}

export class BendRenderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private buffer: WebGLBuffer;
  private indexBuffer: WebGLBuffer;
  private indexCount: number;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private slots: (TextureSlot | null)[] = [];
  private cssWidth = 1;
  private cssHeight = 1;

  // Returns null when WebGL is unavailable or would be slow (software
  // rendering); callers then keep the CSS presentation.
  // `focalLength`: CSS-pixel distance of the viewer, as in CSS perspective()
  static create(
    canvas: HTMLCanvasElement,
    focalLength: number,
  ): BendRenderer | null {
    const gl = (() => {
      try {
        return canvas.getContext("webgl", {
          alpha: true,
          antialias: true,
          premultipliedAlpha: true,
          failIfMajorPerformanceCaveat: true,
        });
      } catch {
        return null;
      }
    })();

    if (!gl) {
      return null;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();

    if (!vertex || !fragment || !program) {
      return null;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return null;
    }

    return new BendRenderer(gl, program, focalLength);
  }

  private constructor(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    focalLength: number,
  ) {
    this.gl = gl;
    this.program = program;

    // Shared grid: (segX + 1) × (segY + 1) vertices, two triangles per cell
    const positions: number[] = [];
    const indices: number[] = [];

    for (let y = 0; y <= PLANE_SEGMENTS_Y; y++) {
      for (let x = 0; x <= PLANE_SEGMENTS_X; x++) {
        positions.push(x / PLANE_SEGMENTS_X - 0.5, y / PLANE_SEGMENTS_Y - 0.5);
      }
    }

    const row = PLANE_SEGMENTS_X + 1;

    for (let y = 0; y < PLANE_SEGMENTS_Y; y++) {
      for (let x = 0; x < PLANE_SEGMENTS_X; x++) {
        const i = y * row + x;

        indices.push(i, i + 1, i + row, i + 1, i + row + 1, i + row);
      }
    }

    this.buffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW,
    );
    this.indexCount = indices.length;

    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "aPos");

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    for (const name of [
      "uResolution",
      "uCenter",
      "uSize",
      "uBend",
      "uRotateY",
      "uRotateZ",
      "uFocal",
      "uTexture",
      "uUvScale",
      "uUvOffset",
      "uRadius",
      "uOpacity",
    ]) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    gl.uniform1f(this.uniforms.uFocal, focalLength);
    gl.uniform1i(this.uniforms.uTexture, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  }

  get context() {
    return this.gl;
  }

  // Canvas backing store = CSS size × capped device pixel ratio
  setSize(cssWidth: number, cssHeight: number, pixelRatio: number) {
    const canvas = this.gl.canvas as HTMLCanvasElement;

    this.cssWidth = Math.max(1, cssWidth);
    this.cssHeight = Math.max(1, cssHeight);
    canvas.width = Math.round(this.cssWidth * pixelRatio);
    canvas.height = Math.round(this.cssHeight * pixelRatio);
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // Uploads (or re-uploads) an image/video frame into texture slot `index`
  upload(index: number, source: HTMLImageElement | HTMLVideoElement) {
    const gl = this.gl;
    const width =
      source instanceof HTMLVideoElement
        ? source.videoWidth
        : source.naturalWidth;
    const height =
      source instanceof HTMLVideoElement
        ? source.videoHeight
        : source.naturalHeight;

    if (!width || !height) {
      return false;
    }

    let slot = this.slots[index];

    if (!slot) {
      const texture = gl.createTexture();

      if (!texture) {
        return false;
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      slot = { texture, width, height, ready: false };
      this.slots[index] = slot;
    }

    gl.bindTexture(gl.TEXTURE_2D, slot.texture);

    try {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        source,
      );
    } catch {
      return false;
    }

    slot.width = width;
    slot.height = height;
    slot.ready = true;

    return true;
  }

  render(planes: (PlaneState | null)[]) {
    const gl = this.gl;
    const u = this.uniforms;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u.uResolution, this.cssWidth, this.cssHeight);

    planes.forEach((plane, index) => {
      const slot = this.slots[index];

      if (!plane || !slot?.ready || plane.opacity < 0.005) {
        return;
      }

      // object-fit: cover
      const planeAspect = plane.width / plane.height;
      const textureAspect = slot.width / slot.height;
      let scaleX = 1;
      let scaleY = 1;

      if (textureAspect > planeAspect) {
        scaleX = planeAspect / textureAspect;
      } else {
        scaleY = textureAspect / planeAspect;
      }

      gl.bindTexture(gl.TEXTURE_2D, slot.texture);
      gl.uniform2f(u.uCenter, plane.centerX, plane.centerY);
      gl.uniform2f(u.uSize, plane.width, plane.height);
      gl.uniform1f(u.uBend, plane.bend);
      gl.uniform1f(u.uRotateY, plane.rotateY);
      gl.uniform1f(u.uRotateZ, plane.rotateZ);
      gl.uniform1f(u.uRadius, plane.radius);
      gl.uniform1f(u.uOpacity, plane.opacity);
      gl.uniform2f(u.uUvScale, scaleX, scaleY);
      gl.uniform2f(u.uUvOffset, (1 - scaleX) / 2, (1 - scaleY) / 2);
      gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
    });
  }

  dispose() {
    const gl = this.gl;

    this.slots.forEach((slot) => slot && gl.deleteTexture(slot.texture));
    this.slots = [];
    gl.deleteBuffer(this.buffer);
    gl.deleteBuffer(this.indexBuffer);
    gl.deleteProgram(this.program);
  }
}
