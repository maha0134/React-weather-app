import Form from "../Form/Form";
function Section({ position }) {
  if (position === null) {
    return <Form />;
  } else {
    return <></>;
  }
}

export default Section;
