import Home from "../views/Home";
import { render } from "lit-html";
import { createTodo, getTodos, getTodo, deleteTodo } from "../idb";

window.addEventListener("online", syncLocalTodo());

async function syncLocalTodo() {
  let todos = await getTodos();
  let result = false;

  todos.forEach(async (todo) => {
    switch (todo.state_data) {
      case "created":
        result = await store(todo);

        if (result === "success") {
          todo.state_data = "sync";
          await createTodo(todo);
        }

        break;

      case "deleted":
        result = await remove(todo.id);
        if (result === "success") {
          await deleteTodo(todo.id);
        }
        break;

      case "updated":
        result = await update(todo);

        if (result === "success") {
          todo.state_data = "sync";
          await createTodo(todo);
        }
        break;

      case "sync":
        console.log("data already sync");
        break;
    }
  });
}

export async function save_todo(e, edit) {
  e.preventDefault();
  let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  const form = document.getElementById("todo_form");

  let todo = {
    id: edit ? Number(form.getAttribute("data-todo-id")) : id,
    title: form.todo.value,
    description: form.description.value,
    state_todo: form.state.value,
    state_data: navigator.onLine ? "sync" : edit ? "updated" : "created",
    date: Date.now(),
  };

  await syncLocalTodo();
  await createTodo(todo);

  if (navigator.onLine) {
    edit ? update(todo) : store(todo);
    await refresh();
  } else {
    await refresh();
  }

  form.reset();
}

export async function get_todos() {
  return fetch("http://localhost:3001/todos?_sort=date&asc", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function get_todo(id) {
  return fetch("http://localhost:3001/todos/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function delete_todos(e, todo) {
  e.preventDefault();

  if (window.confirm("Etes-sur de vouloir supprimer cette tâche ?")) {
    if (navigator.onLine) {
      await syncLocalTodo();
      await deleteTodo(todo.id);
      await remove(todo.id);
    } else {
      await createTodo({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        state_todo: todo.state_todo,
        state_data: "deleted",
        date: todo.date,
      });
      await refresh();
    }
  }
}

async function store(todo) {
  return fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(async (response) => {
    await refresh();
    return "success";
  });
}

async function update(todo) {
  return fetch("http://localhost:3001/todos/" + todo.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then(async (response) => {
    await refresh();
    return "success";
  });
}

async function remove(id) {
  return fetch("http://localhost:3001/todos/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      await refresh();
      return "success";
    })
    .catch((error) => console.log(error));
}

async function refresh() {
  (async () => {
    let todos = navigator.onLine ? await get_todos() : await getTodos();
    let HomeComp = new Home(todos);
    render(HomeComp.template, app);
  })();
}
