import React from "react";

export default function Test() {
  const [count, setCount] = React.useState(0);
  function addOne() {
    setCount((prevCount) => prevCount + 1);
  }

  function subtractOne() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <main>
      <h1>{count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={subtractOne}>-1</button>
    </main>
  );
}
