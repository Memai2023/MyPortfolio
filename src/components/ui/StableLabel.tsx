type StableLabelProps = {
  text: string;
  // The same label in every language; the widest one sets the footprint
  variants: readonly string[];
};

// Renders `text` in a box as wide as the widest variant, so switching
// language never changes the label's width or moves its neighbours.
function StableLabel({ text, variants }: StableLabelProps) {
  return (
    <span className="stable-label">
      <span className="stable-label__text">{text}</span>
      {variants
        .filter((variant) => variant !== text)
        .map((variant) => (
          <span className="stable-label__sizer" aria-hidden="true" key={variant}>
            {variant}
          </span>
        ))}
    </span>
  );
}

export default StableLabel;
