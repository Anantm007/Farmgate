const BASE_URL = evalURL();

function evalURL() {
  if (
    window.location.href.includes("localhost") ||
    window.location.href.includes("192.168.0")
  )
    return "http://localhost:5000";
  else {
    return "http://http://208.117.83.35:5000";
  }
}
export default BASE_URL;
