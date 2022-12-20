import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  titulo: string;
  completado: boolean;
  data: Date;
};

const list = <HTMLUListElement>document.querySelector("#list");
const form = document.getElementById("task-form") as HTMLFormElement | null;
const input = <HTMLInputElement>document.querySelector("#new-task");
const tasks: Array<Task> = carregar();

tasks.forEach(adicionar);

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const task: Task = {
    id: uuidV4(),
    titulo: input.value,
    completado: false,
    data: new Date(),
  };

  adicionar(task);
  tasks.push(task);
  salvar();
});

function adicionar(task: Task): void {
  const tarefa = document.createElement("li");
  const label = document.createElement("label");
  const check = document.createElement("input");
  check.addEventListener("change", (e) => {
    task.completado = check.checked;
    salvar();
  });
  check.type = "checkbox";
  check.checked = task.completado;
  label.append(check, task.titulo);
  tarefa.append(label);
  list.append(tarefa);
}

function salvar() {
  localStorage.setItem("Tarefas", JSON.stringify(tasks));
}

function carregar(): Task[] {
  const json = localStorage.getItem("Tarefas");
  if (json) {
    return <Array<Task>>JSON.parse(json);
  } else {
    return [];
  }
}
