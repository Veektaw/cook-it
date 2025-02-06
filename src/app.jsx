import { createRoot } from "react-dom/client";
import Header from "./header";
import Main from "./main";
import Test from "./components/test";
import FormTest from "./components/form";
import Joke from "./components/joke";

const root = createRoot(document.getElementById("app"));
root.render(
  <>
    {/* <Joke /> */}
    {/* <FormTest /> */}
    <Header />
    <Main />
  </>
);
