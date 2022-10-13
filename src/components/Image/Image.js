export default function Image({ id, alt }) {
  let src = "https://openweathermap.org/img/w/" + id + ".png";
  return <img src={src} alt={alt} />;
}
