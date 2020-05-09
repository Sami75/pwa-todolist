import { html } from "lit-html";

export default function select(name, required, label, options, value) {
  return html`
    <div class="form__group field">
      <select
        class="form__field select"
        name=${name}
        id=${name}
        required=${required}
      >
        ${options.map(
          (option) =>
            html`<option
              value=${option.value}
              selected=${option.value === value}
              >${option.name}</option
            >`
        )}
      </select>
      <label for=${name} class="form__label">${label}</label>
    </div>
  `;
}
