document.addEventListener("DOMContentLoaded", () => {
  function addTask(text) {
    const task = document.createElement("li");
    const label = document.createElement("span");
    const buttons = document.createElement("div");
    const done = document.createElement("button");
    const remove = document.createElement("button");

    done.textContent = "A faire";
    done.classList.add("action-check");

    remove.textContent = "remove me";
    remove.classList.add("action-delete");

    label.textContent = text;
    task.classList.add("todo-item");

    buttons.classList.add("todo-action");

    buttons.appendChild(done);
    buttons.appendChild(remove);
    task_list.appendChild(task);
    task.appendChild(label);
    task.appendChild(buttons);

    remove.addEventListener("click", (event) => {
      task.remove();
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

    const id = "id" + Math.random().toString(16).slice(2);

    localStorage.setItem(JSON.stringify(id), JSON.stringify(label.textContent));
  }

  const add_button = document.querySelector("#add-todo");
  const task_list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      addTask(input.value);
    }
  });

  add_button.addEventListener("click", (event) => {
    addTask(input.value);
  });

  for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i));
  }
});
