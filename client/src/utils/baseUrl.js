const BASE_URL = evalURL();

function evalURL() {
  if (
    window.location.href.includes("localhost") ||
    window.location.href.includes("192.168.0")
  )
    return "http://localhost:5000";
  else {
    return "https://api.farmgate-market.com";
  }
}
export default BASE_URL;
