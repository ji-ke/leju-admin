import NP from "number-precision";

function money(val, n) {
  return (n || '') + NP.round(val / 100, 2)
}

export default {
  money
}
