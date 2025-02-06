import React from "react";
import Form from "./form";
import IngredientsList from "./ingredientsList";

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
      <Form submit={submit} />
      <IngredientsList
        forIngredient={forIngredient}
        ingredientElements={ingredientElements}
      />
    </main>
  );
}
