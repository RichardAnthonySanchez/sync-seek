function createForm() {
  // Create form element
  const form = document.createElement("form");
  form.id = "form";

  // Create input element
  const input = document.createElement("input");
  input.type = "text";
  input.id = "input";
  input.placeholder = "Enter artist";

  // Create button element
  const button = document.createElement("button");
  button.id = "submit-form";
  button.type = "submit";
  button.textContent = "Submit";

  // Append input and button to the form
  form.appendChild(input);
  form.appendChild(button);

  // Append form to the body (or any other container element)
  document.body.appendChild(form);
}

export default createForm;
