import { useParams } from "react-router-dom";

function CaseStudy() {
  const { slug } = useParams();

  return (
    <article>
      <h1>Case Study</h1>
      <p>Project: {slug}</p>
    </article>
  );
}

export default CaseStudy;
