export const formInputsGenerator = inputs => {
  const inputsArray = inputs.map(input => input.id);
  return inputsArray.reduce((acc, value) => {
    return { ...acc, [value]: '' };
  }, {});
};
