import React, { useState, useEffect } from "react";
import Form from "./form";
import IngredientsList from "./ingredientsList";
import { getRecipeFromMistral } from "./ai";
import AiResponse from "./aiResponse";
import Spinner from "./spinner";

export default function Main() {
  const [forIngredient, setNewForIngredient] = useState(() => {
    const storedIngredients = localStorage.getItem("ingredients");
    return storedIngredients ? JSON.parse(storedIngredients) : [];
  });

  const [recipe, setRecipe] = useState(() => {
    const storedRecipe = localStorage.getItem("recipe");
    return storedRecipe || "";
  });

  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [markdownLoading, setMarkdownLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(forIngredient));
  }, [forIngredient]);

  useEffect(() => {
    localStorage.setItem("recipe", recipe);
  }, [recipe]);

  const ingredientElements = forIngredient.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  async function getRecipe() {
    setIsLoading(true);
    setMarkdownLoading(true);
    setAiError(null);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setAiError("Request timed out. Please try again.");
      setMarkdownLoading(false);
    }, 25000);

    try {
      const recipeGiven = await Promise.race([
        getRecipeFromMistral(forIngredient),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("AI request timed out.")), 25000)
        ),
      ]);

      clearTimeout(timeoutId);
      setRecipe(recipeGiven);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Error fetching recipe:", error);
      setAiError("Error fetching recipe. Please try again.");
    } finally {
      setIsLoading(false);
      setMarkdownLoading(false);
    }
  }

  function clearIngredientsAndRecipe() {
    setNewForIngredient([]);
    setRecipe("");
    localStorage.removeItem("ingredients");
    localStorage.removeItem("recipe");
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
      <Form submit={submit} clear={clearIngredientsAndRecipe} />
      <IngredientsList
        forIngredient={forIngredient}
        ingredientElements={ingredientElements}
        getRecipe={getRecipe}
      />
      {isLoading && <Spinner />}

      {recipe && !markdownLoading && <AiResponse recipe={recipe} />}

      {aiError && <p className="error-message">{aiError}</p>}

      {recipe && markdownLoading && <p>Rendering Recipe...</p>}
    </main>
  );
}
