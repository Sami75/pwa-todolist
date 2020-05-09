import { html } from "lit-html";
import { delete_todos } from "../api/todos";
import modal from "../components/modal";
import form from "./Form";

export default function Todo(todo) {
  const stateTodo = (state) => {
    let stateX = "";

    switch (state) {
      case "not_started":
        stateX = "Pas commencé";
        break;
      case "in_progress":
        stateX = "En cours";
        break;
      case "finished":
        stateX = "Terminé";
        break;
    }

    return stateX;
  };

  const openModal = () => {
    let doc = document.getElementById("modal");
    if (doc) {
      doc.style.zIndex = "2";
      doc.style.opacity = "1";
    }
  };

  const closeModal = () => {
    let doc = document.getElementById("modal");
    if (doc) {
      doc.style.zIndex = "-2";
      doc.style.opacity = "0";
    }
  };

  const formTemplate = (todo, edit) => html`${form(todo, edit)}`;

  console.log(todo);
  return html`
    <div>
      <div class="todo__title">
        <h1>Détails - ${todo.title}</h1>
        <div class="todo__actions">
          <i class="fas fa-pen edit" @click=${(e) => openModal()}></i>
          <i
            class="fas fa-trash delete"
            @click=${(e) => delete_todos(e, todo)}
          ></i>
        </div>
      </div>
      <div class="todo__details">
        <div class="todo__desc">${todo.description}</div>
        <div class="todo__state">${stateTodo(todo.state_todo)}</div>
      </div>
    </div>
    ${modal("modal", closeModal, "Ajouter une tâche", formTemplate(todo, true))}
  `;
}
