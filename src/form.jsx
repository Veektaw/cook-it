export default function Form(props) {
  return (
    <form className="add-ingredient-form" onSubmit={props.submit}>
      <input
        type="text"
        placeholder="eg. Onion"
        aria-label="Add ingredient"
        name="ingredient"
      />
      <button>Add ingredient</button>
    </form>
  );
}
