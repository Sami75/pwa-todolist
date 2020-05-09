import { openDB, deleteDB, wrap, unwrap } from "idb";

export async function createDB() {
  //check for support
  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const db = await openDB("Todos", 1, {
    upgrade(db) {
      const store = db.createObjectStore("todos", {
        keyPath: "id",
      });
      store.createIndex("title", "title");
      store.createIndex("description", "description");
      store.createIndex("state_todo", "state_todo");
      store.createIndex("date", "date");
      store.createIndex("state_data", "state_data");
    },
  });

  return db;

}

export async function createTodo(todo) {
  const db = await createDB();
  const tx = db.transaction("todos", "readwrite");
  await tx.store.put(todo);

  return await getTodos();
}

export async function deleteTodo(id) {
  const db = await createDB();
  const tx = await db.transaction(["todos"], "readwrite");
  const store = await tx.objectStore("todos");
  await store.delete(id);

  await tx.done;
}

export async function getTodos() {
  const db = await createDB();

  return await db.getAllFromIndex("todos", "date");
}

export async function getTodo(id) {
  const db = await createDB();
  return await db.get("todos", Number(id));
}
