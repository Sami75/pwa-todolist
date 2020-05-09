import { html, nothing } from "lit-html";

export default function textarea(
  type,
  placeholder,
  name,
  required,
  label,
  value
) {
  return html`
    <div class="form__group field">
      <textarea
        type=${type}
        class="form__field"
        placeholder=${placeholder}
        name=${name}
        id=${name}
        required=${required}
      >
${value ? value : nothing}</textarea
      >
      <label for=${name} class="form__label">${label}</label>
    </div>
  `;
}
