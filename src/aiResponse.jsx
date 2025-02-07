import ReactMarkdown from "react-markdown";

export default function AiResponse(props) {
  return (
    <section className="suggested-recipe-container">
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
