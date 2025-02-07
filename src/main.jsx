import React from "react";
import Form from "./form";
import IngredientsList from "./ingredientsList";
import { getRecipeFromMistral } from "./ai";
import AiResponse from "./aiResponse";
import Spinner from "./spinner";

export default function Main() {
  const [forIngredient, setNewForIngredient] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [markdownLoading, setMarkdownLoading] = React.useState(false);

  const ingredientElements = forIngredient.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  async function getRecipe() {
    setIsLoading(true);
    setMarkdownLoading(true);
    try {
      const recipeGiven = await getRecipeFromMistral(forIngredient);
      setRecipe(recipeGiven);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setIsLoading(false);
      setMarkdownLoading(false);
    }
  }

  function submit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const newIngredient = formData.get("ingredient").trim();
    if (newIngredient === "") return;
    setNewForIngredient((prevIngredient) => [...prevIngredient, newIngredient]);
    formEl.reset();
  }

  return (
    <main>
      <Form submit={submit} />
      <IngredientsList
        forIngredient={forIngredient}
        ingredientElements={ingredientElements}
        getRecipe={getRecipe}
      />
      {isLoading && <Spinner />}

      {recipe && !markdownLoading && <AiResponse recipe={recipe} />}

      {recipe && markdownLoading && <p>Rendering Recipe...</p>}
    </main>
  );
}
