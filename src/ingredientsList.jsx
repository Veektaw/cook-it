import React from "react";

const IngredientsList = React.forwardRef((props, ref) => {
  return (
    <section>
      {props.forIngredient.length > 0 && (
        <>
          <h2 className="available-topic"> Available ingredients: </h2>
          <p className="explanation">(at least four ingredients)</p>
        </>
      )}

      <ul className="ingredients-list" aria-live="polite">
        {props.ingredientElements}
      </ul>
      {props.forIngredient.length > 3 && (
        <div className="get-recipe-container">
          <div ref={ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe} className="get-recipe-button">
            Get recipe
          </button>
        </div>
      )}
    </section>
  );
});

export default IngredientsList;
