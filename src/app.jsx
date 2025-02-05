import { createRoot } from "react-dom/client";
import Header from "./header";
import Main from "./main";
import Test from "./test";

const root = createRoot(document.getElementById("app"));
root.render(
  <>
    <Header />
    <Main />
  </>
);
