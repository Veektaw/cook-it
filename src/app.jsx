import { createRoot } from "react-dom/client";
import Header from "./header";
import Main from "./main";
import Test from "./test";
import FormTest from "./form";
import Joke from "./joke";

const root = createRoot(document.getElementById("app"));
root.render(
  <>
    {/* <Joke /> */}
    {/* <FormTest /> */}
    <Header />
    <Main />
  </>
);
