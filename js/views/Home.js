import form from "./Form";
import card from "../components/card";
import modal from "../components/modal";
import { html, render } from "lit-html";
import { get_todos } from "../api/todos";

export default function Home(data) {
  const openModal = () => {
    let doc = document.getElementById("modal");
    console.log(doc);
    if (doc) {
      doc.style.zIndex = "2";
      doc.style.opacity = "1";
    }
    console.log(doc.style.zIndex);
  };

  const closeModal = () => {
    let doc = document.getElementById("modal");
    console.log(doc);
    if (doc) {
      doc.style.zIndex = "-2";
      doc.style.opacity = "0";
    }
  };

  const formTemplate = () => html`${form()}`;

  const template = (data) => html`
    <div class="task-content">
      ${data.map((todo) => card(todo))}
    </div>
    <div class="add_task">
      <i class="fas fa-plus-circle" @click=${openModal}></i>
    </div>
    ${modal("modal", closeModal, "Ajouter une tâche", formTemplate())}
  `;

  this.template = template(data);
}
