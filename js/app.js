import page from "page";
import Home from "./views/Home";
import Todo from "./views/Todo";
import { render } from "lit-html";
import { get_todos, get_todo } from "./api/todos";
import { createDB, getTodo } from "./idb";

const app = document.querySelector("#app");

page("/", function () {
  (async () => {
    let todos = await get_todos();
    let HomeComp = new Home(todos);
    render(HomeComp.template, app);
  })();
});

page("/todos/:todo", async function (ctx) {
  let todo = navigator.onLine
    ? await get_todo(ctx.params.todo)
    : await getTodo(ctx.params.todo);
  render(new Todo(todo), app);
});
page();

createDB();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (error) {
      console.log("Service worker registration failed, error:", error);
    });
}
