import {appContainer} from './elements.js';

const createHeader = () => {
  appContainer.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 
    'justify-content-center', 'flex-column')
  const header = document.createElement('h3');
  header.textContent = 'Todo App';
  appContainer.append(header);
  return appContainer;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0');

  const input =  document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'task');
  input.classList.add('form-control');
  input.setAttribute('placeholder', 'ввести задачу');
  input.setAttribute('required', '');

  label.append(input);
  form.append(label);
  form.insertAdjacentHTML('beforeend', `
    <button type="submit" class="btn btn-primary me-3">
        Сохранить
      </button>
    <button type="reset" class="btn btn-warning">
        Очистить
      </button>
    `);

  return form;
};

const createTable = () => {
  const div = document.createElement('div');
  div.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  table.insertAdjacentHTML('beforeend', `
    <thead>
      <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
    </thead>
  `);

  const tbody = document.createElement('tbody')

  table.append(tbody);
  div.append(table);
  div.tbody = tbody;

  return div;
};

export const createRow = (obj, i) => {
  
  const row = document.createElement('tr');
  obj.status === 'done' ? row.classList.add('table-success') 
  : row.classList.add('table-light');
  row.setAttribute('id', obj.id);

  const getCell = (text) => {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell
  };

  const id = getCell(i);

  const task = getCell(obj.task);
  obj.status === 'done' ? task.classList.add('text-decoration-line-through') 
  : task.classList.add('task');

  const taskStatus = obj.status === 'done' ? 'Выполнена' : 'В процессе';
  const status = getCell(taskStatus);

  const buttons = document.createElement('td');
  buttons.insertAdjacentHTML('beforeend', `
    <button class="btn btn-danger">
        Удалить
    </button>
    <button class="btn btn-success">
        Завершить
    </button>
  `);

  row.append(id, task, status, buttons);
  
  return row
};

export default {
  createHeader,
  createForm,
  createTable,
};