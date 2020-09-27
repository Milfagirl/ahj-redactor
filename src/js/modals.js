/* eslint-disable no-mixed-operators */
/* eslint-disable import/no-cycle */
import { data } from './app.js';

const table = document.querySelector('table');

function modalAdd(element) {
  const form = document.querySelector('.modal_add');
  form.style.width = `${(element.offsetWidth) * 60 / 100}px`;
  form.style.display = 'block';
  form.style.left = `${(element.offsetWidth - form.offsetWidth) / 2}px`;
  form.style.top = '0px';
}

function listAdd(element, value) {
  const td = `<tr data-id = ${value.id}>
                <td>${value.name}</td>
                <td>${value.price}</td>
                <td><button id = "edit" class = "edit">&#128393</button><button id = "delete" class="delete">&#10006</button></td>
            </tr>`;

  element.insertAdjacentHTML('beforeEnd', td);
}

function redraw() {
  const tr = document.querySelectorAll('tr');
  for (let i = 1; i < tr.length; i++) {
    tr.item(i).remove();
  }
  data.getDataBase.forEach((el) => {
    listAdd(table, el);
  });
}

export { modalAdd, listAdd, redraw };
