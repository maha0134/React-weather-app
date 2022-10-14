import "./errorMessage.css";
function ErrorMessage({ location }) {
  return (
    <div className="error">
      <p>
        Seems like we could not find <span>{location}</span>.
      </p>
      <p>Please try again.</p>
    </div>
  );
}

export default ErrorMessage;
