import './form.css'
export default function Form({onSubmit}) {
  return(
    <form onSubmit={onSubmit}>
        <h2>Enter a location:</h2>
        <input type="text" id="location" placeholder="Toronto,ON" />
        <label htmlFor="location" className="screen-reader-text">
          Enter location here
        </label>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
  )
}