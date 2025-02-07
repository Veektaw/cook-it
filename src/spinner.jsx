export default function Spinner() {
  return (
    <>
      <div className="loading-overlay">
        <div className="lds-ring">
          {" "}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
