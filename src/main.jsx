import React from "react";

export default function Main() {
  const [forIngredient, setNewForIngredient] = React.useState([]);

  const ingredientElements = forIngredient.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function submit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const newIngredient = formData.get("ingredient").trim();
    if (newIngredient === "") return;
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
      <section>
        {forIngredient.length > 0 && <h2> Ingredients on hand: </h2>}
        <ul className="ingredients-list" aria-live="polite">
          {ingredientElements}
        </ul>
        {forIngredient.length > 3 && (
          <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button className="get-recipe-button">Get recipe</button>
          </div>
        )}
      </section>
    </main>
  );
}
