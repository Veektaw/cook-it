import React from "react";

export default function Main() {
  const [forIngredient, setNewForIngredient] = React.useState([]);

  const ingredientElements = forIngredient.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function submit() {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const newIngredient = formData.get("ingredient");
    setNewForIngredient((prevIngredient) => [...prevIngredient, newIngredient]);
    console.log(newIngredient);
    formEl.reset();
  }

  return (
    <main>
      <form className="add-ingredient-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="eg. Onion"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      <ul className="ingredients-list">{ingredientElements}</ul>
    </main>
  );
}
