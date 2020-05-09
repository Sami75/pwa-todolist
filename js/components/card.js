import { html } from "lit-html";
import { delete_todos } from "../api/todos";

export default function card(todo) {
  if (todo.state_data !== "deleted")
    return html`
      <a href=${`/todos/${todo.id}`}>
        <div class="card">
          <div class="title">${todo.title}</div>
          <div class="delete">
            <i class="fas fa-trash" @click=${(e) => delete_todos(e, todo)}></i>
          </div>
        </div>
      </a>
    `;
}

