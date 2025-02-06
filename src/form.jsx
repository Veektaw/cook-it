import React from "react";

export default function FormTest() {
  function handleSubmit(event) {
    event.preventDefault();
    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData);
    // console.log(data);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const email = formData.get("email");
    console.log(email);
    formEl.reset();
  }

  return (
    <section>
      <h1>Form Test</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Full name:
          <input
            id="name"
            type="text"
            placeholder="Jonathan Iyayi"
            name="name"
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            placeholder="veektaw@gmail.com"
            name="email"
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            placeholder="******"
            name="password"
          />
        </label>

        <button>Submit</button>
      </form>
    </section>
  );
}
