import {createRow} from './createElements.js';
import {
  getStorage, 
  setStorage, 
  removeStorage, 
  updateStorage} from './serviceStorage.js';

export const authorization = () => {
  return prompt('Назовите свое имя', String());
};

const removeTask = (list, elem ) => {
  elem.remove();
  const cell = list.querySelectorAll('tr');
  cell.forEach( (val, i) => {
    val.children[0].textContent = i + 1
  })
};

export const formControl = (form, list, data) => {
  const input = form.querySelector('.form-control');
  const button = form.querySelector('.btn-primary');
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true); 
    }
  });
  
  const clearForm = () => {
    form.reset();
    button.setAttribute('disabled', true);
  };

  const addTask = (e) => {
    e.preventDefault();
    const target = e.target.closest('form');
    const formData = new FormData(target);
    const newTask = Object.fromEntries(formData);
    newTask.id = Math.random().toString().substring(2, 10);
    newTask.status = 'work';
    
    setStorage(data, newTask);
    list.append(createRow(newTask, getStorage(data).length));
    clearForm();
  };

  button.addEventListener('click', e => {
    addTask(e);
  });

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      addTask(e);
    };
  });

  form.addEventListener('reset', () => {
    clearForm();
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
    if (target.closest('.btn-danger')) {
      if (confirm('Вы уверены?')) {
        const tr = target.closest('tr');
        const id = tr.getAttribute('id');
        removeTask(list, tr);
        removeStorage(id, data);
      };
    };
  });
};
