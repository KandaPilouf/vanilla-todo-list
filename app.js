document.addEventListener("DOMContentLoaded", () => {
  const KEY = "to-do";
  const todos = JSON.parse(localStorage.getItem(KEY)) || [];
  const save = () => localStorage.setItem(KEY, JSON.stringify(todos));

  function addTask(text, id, saved = false) {
    const task = document.createElement("li");
    const label = document.createElement("span");
    const buttons = document.createElement("div");
    const done = document.createElement("button");
    const remove = document.createElement("button");

    const item = { id: id || "id" + Math.random().toString(16).slice(2) };

    done.textContent = "A faire";
    done.classList.add("action-check");

    remove.textContent = "remove me";
    remove.classList.add("action-delete");

    label.textContent = text;
    task.classList.add("todo-item");

    task.draggable = true;
    task.dataset.id = item.id;

    buttons.classList.add("todo-action");

    buttons.appendChild(done);
    buttons.appendChild(remove);
    task_list.appendChild(task);
    task.appendChild(label);
    task.appendChild(buttons);

    remove.addEventListener("click", (event) => {
      task.remove();
      todos.splice(todos.findIndex((t) => t.id === item.id), 1);
      save();
    });

    done.addEventListener("click", (event) => {
      done.classList.toggle("done");

      if (done.classList.contains("done")) {
        done.textContent = "Terminée";
        label.style.textDecoration = "line-through";
      } else {
        done.textContent = "A faire";
        label.style.textDecoration = null;
      }
    });

    if (!saved) {
      todos.push({ id: item.id, text });
      save();
    }
  }

  const add_button = document.querySelector("#add-todo");
  const task_list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  let dragged;

  task_list.addEventListener("dragstart", (event) => {
    dragged = event.target.closest("li");
    dragged.classList.add("dragging");
  });

  task_list.addEventListener("dragover", (event) => {
    event.preventDefault();
    const after = [...task_list.querySelectorAll("li:not(.dragging)")].find(
      (li) => event.clientY < li.getBoundingClientRect().top + li.offsetHeight / 2
    );
    task_list.insertBefore(dragged, after || null);
  });

  task_list.addEventListener("dragend", () => {
    dragged.classList.remove("dragging");
    const order = [...task_list.children].map((li) => li.dataset.id);
    todos.sort((a,b) => order.indexOf(a.id) - order.indexOf(b.id));
    save();
  });

  input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      addTask(input.value);
    }
  });

  add_button.addEventListener("click", (event) => {
    addTask(input.value);
  });

  todos.forEach((t) => {
    addTask(t.text, t.id, true);
  });
});
