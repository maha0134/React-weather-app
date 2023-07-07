import "./aside.css";
export default function Aside({ locationArray, onClick }) {
  return (
    <aside>
      <h3>Recent Searches:</h3>
      <ul className="unstyled-list">
        {locationArray.length > 0 &&
          locationArray.map((item, index) => {
            while (index < 3) {
              return (
                <li key={`item${item}`} onClick={onClick} className="btn">
                  {item}
                </li>
              );
            }
          })}
      </ul>
    </aside>
  );
}
