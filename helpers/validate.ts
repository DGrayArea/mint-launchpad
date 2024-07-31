export const validateAddresses = (input: string) => {
  const addresses = input.split("\n").map((addr) => addr.trim());
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  const invalidAddresses: string[] = [];

  const validAddresses = addresses.filter((address) => {
    const isValid = addressRegex.test(address);
    if (!isValid && address) {
      invalidAddresses.push(address);
    }
    return isValid;
  });

  if (invalidAddresses.length > 0) {
    return [];
  } else {
    return validAddresses;
  }
};

export const validateNumbers = (amts: string) => {
  // Split the input into lines and trim whitespace
  const numbers = amts.split("\n").map((num) => num.trim());

  // Regular expression to match valid numbers, including scientific notation
  const numberRegex = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/;

  // Filter out valid numbers and convert them to actual number type
  const validNumbers = numbers
    .filter((number) => numberRegex.test(number)) // Validate with regex
    .map((number) => parseFloat(number)); // Convert to number

  // Return the array of valid numbers

  return validNumbers;
};
