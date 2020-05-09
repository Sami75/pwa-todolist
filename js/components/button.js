import { html } from "lit-html";

export default function button(name, type, form_id, content) {
  return html`
    <div class="form__group field">
      <button type=${type} id=${name}>${content}</button>
    </div>
  `;
}
