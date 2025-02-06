import React from "react";

export default function Joke() {
  const [isShown, setIsShown] = React.useState(false);

  function submit() {
    setIsShown((preIsShown) => !preIsShown);
  }

  const punchline = isShown ? "Because it's chicken" : "";

  return (
    <main>
      <h1>Why did the chicken cross the road?</h1>
      <h3>Punchline: {punchline}</h3>
      <button onClick={submit}>{isShown ? "Hide" : "Show"} punchline</button>
    </main>
  );
}
