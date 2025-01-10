import {createRow} from './createElements.js';
import {getStorage, setStorage, removeStorage, updateStorage} from './serviceStorage.js';

export const authorization = () => {
  return prompt('Назовите свое имя', String());
};

const addTask = (list, task, number) => {
  list.append(createRow(task, number));
};

const removeTask = (list, elem ) => {
  elem.remove();
  const cell = list.querySelectorAll('tr');
  cell.forEach( (val, i) => {
    val.children[0].textContent = i + 1
  })
};

export const formControl = (form, list, data) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const newTask = Object.fromEntries(formData);
    newTask.id = Math.random().toString().substring(2, 10);
    newTask.status = 'work';
    
    setStorage(data, newTask);
    addTask(list, newTask, getStorage(data).length);
    form.reset();
  });

  form.addEventListener('reset', () => {
    form.reset();
  });
};

export const actionButtons = (list, data) => {
  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn-success')) {
      const tr = target.closest('tr');
      tr.className = 'table-success';
      tr.children[1].className = 'text-decoration-line-through';
      tr.children[2].textContent = 'Выполнена';
      const id = tr.getAttribute('id');
      updateStorage(id, data);
    };
    if (target.closest('.btn-danger')){
      if (confirm('Вы уверены?')) {
        const tr = target.closest('tr');
        const id = tr.getAttribute('id');
        removeTask(list, tr);
        removeStorage(id, data);
      };
    };
  });
};
