import Form from "../Form/Form";
function Section({ position }) {
  if (position === null) {
    return (
      <>
        <Form position={position} />;
      </>
    );
  } else {
    const coords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    return (
      <>
        <Form position={coords} />
      </>
    );
  }
}

export default Section;
