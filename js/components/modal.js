import { html } from "lit-html";

export default function modal(id, closeModal, title, template) {
  return html`
    <div id=${id} class="modal">
      <div class="modal-content">
        <span class="close" @click=${closeModal}>&times;</span>
        <h3>${title}</h3>
        ${template}
      </div>
    </div>
  `;
}
