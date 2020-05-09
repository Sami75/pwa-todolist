import { html } from "lit-html";

export default function input(type, placeholder, name, required, label, value) {
  return html`
    <div class="form__group field">
      <input
        type=${type}
        class="form__field"
        placeholder=${placeholder}
        name=${name}
        id=${name}
        required=${required}
        value=${value}
      />
      <label for=${name} class="form__label">${label}</label>
    </div>
  `;
}
