import createElements from './createElements.js';
import {createRow} from './createElements.js';

const {
  createHeader,
  createForm,
  createTable,
} = createElements;

export const renderContainer = () => {
  const table = createTable();
  const header = createHeader();
  const form = createForm();
  header.append(form, table);
  return {
    form,
    list: table.tbody,
  }
}; 

export const renderTask = (list, arr) => {
  arr.forEach((element, i) => {
    return list.append(createRow(element, i + 1));
  });
};