export const validateProperty = ({ name, value }) => {
  if (name === "userName") {
    if (value.trim() === "") return "Username is required.";
    if (value.length <= 3) return "Username should be more than 3 letters.";
    if (value.length >= 20) return "Username should be less than 20 letters.";
  }
};
