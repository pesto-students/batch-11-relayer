const createInputField = (type, id, label, placeholder, inputType = 'input') => ({
  type, inputType, id, label, placeholder,
});

const createButtonField = (text, onClick, inputType = 'button', color = 'primary') => ({
  text, onClick, inputType, color,
});

export { createInputField, createButtonField };
