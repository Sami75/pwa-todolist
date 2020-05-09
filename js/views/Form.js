import { html } from "lit-html";
import { save_todo } from "../api/todos";
import input from "../components/input";
import textarea from "../components/textarea";
import select from "../components/select";
import button from "../components/button";

export default function Form(data, edit) {
  return html`
    <form id="todo_form" data-todo-id=${data ? data.id : ""} @submit=${(e) => save_todo(e, edit)}>
      ${input("text", "Ma tâche", "todo", true, "Ma tâche", data ? data.title : "")}
      ${textarea(
        "text",
        "Description",
        "description",
        true,
        "Description",
        data ? data.description : ""
      )}
      ${select(
        "state",
        true,
        "Etat",
        [
          { name: "Pas commencé", value: "not_started" },
          { name: "En cours", value: "in_progress" },
          { name: "Terminé", value: "finished" },
        ],
        data ? data.state_todo : ""
      )}
      ${button("todo-submit", "submit", "todo_form", "Valider")}
    </form>
  `;
}
