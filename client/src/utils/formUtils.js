const createInputField = (...attributes) => {
  const [type, id, label, placeholder] = attributes;
  const inputAttributes = {
    type,
    id,
    placeholder,
    required: 'required',
  };
  if (type === 'password') {
    inputAttributes.minLength = 8;
  }
  return {
    inputType: 'input',
    label: { label, id },
    input: inputAttributes,
  };
};

const createButtonField = (className = '', color = 'primary') => ({
  inputType: 'button',
  button: { color, className },
});

export { createInputField, createButtonField };
