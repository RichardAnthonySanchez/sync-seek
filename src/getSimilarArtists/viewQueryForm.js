function createForm() {
  const form = document.createElement("form");
  form.id = "form";

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.id = "input1";
  input1.placeholder = "Enter first artist";

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.id = "input2";
  input2.placeholder = "Enter second artist";

  const button = document.createElement("button");
  button.id = "submit-form";
  button.type = "submit";
  button.textContent = "Submit";

  form.appendChild(input1);
  form.appendChild(input2);
  form.appendChild(button);

  document.body.appendChild(form);
}

export default createForm;
