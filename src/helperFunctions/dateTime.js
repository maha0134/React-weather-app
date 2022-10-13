//helper date time function
export default function dateTime(unixTime, offset) {
  unixTime = (unixTime + offset) * 1000;
  let date = new Date(unixTime);
  let time =
    date.getUTCHours().toString().padStart(2, "0") +
    ":" +
    date.getUTCMinutes().toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  date = date.toUTCString().split(year)[0].trimEnd();
  return {
    date,
    time,
  };
}
