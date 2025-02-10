import React from "react";
import Form from "./form";
import IngredientsList from "./ingredientsList";
import { getRecipeFromMistral } from "./ai";
import AiResponse from "./aiResponse";
import Spinner from "./spinner";

export default function Main() {
  const [forIngredient, setNewForIngredient] = React.useState(() => {
    const storedIngredients = localStorage.getItem("ingredients");
    return storedIngredients ? JSON.parse(storedIngredients) : [];
  });

  const [recipe, setRecipe] = React.useState(() => {
    const storedRecipe = localStorage.getItem("recipe");
    return storedRecipe || "";
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [aiError, setAiError] = React.useState(null);
  const [markdownLoading, setMarkdownLoading] = React.useState(false);

  const recipeSection = React.useRef(null);
  console.log(recipeSection);

  React.useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(forIngredient));
  }, [forIngredient]);

  React.useEffect(() => {
    localStorage.setItem("recipe", recipe);
  }, [recipe]);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current) {
      const yCoord =
        recipeSection.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: yCoord,
        behavior: "smooth",
      });
    }
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
        ref={recipeSection}
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
