import cookImage from "./assets/icon.png";

export default function Header() {
  return (
    <header>
      <img src={cookImage} alt="Cook It Logo" />
      <h1>Cook it</h1>
    </header>
  );
}
