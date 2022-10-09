import Main from "../Main/Main";
function Home({ position }) {
  if (position === null) {
    return <Main position={position} />;
  } else {
    const coords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    return <Main position={coords} />;
  }
}

export default Home;
