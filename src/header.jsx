import cookImage from "./assets/cook.png";

export default function Header() {
  return (
    <header>
      <img src={cookImage} alt="Cook It Logo" />
      <h1>Cook It</h1>
    </header>
  );
}
