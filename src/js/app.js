/* eslint-disable import/no-cycle */
/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { modalAdd, redraw } from './modals.js';
import Data from './data.js';

const buttonAdd = document.querySelector('.add');
const title = document.querySelector('.title');
export const data = new Data([]);
const inputname = document.querySelector('.input_name');
const inputprice = document.querySelector('.input_price');
const buttonSave = document.querySelector('.button_save');
const buttonReset = document.querySelector('.button_reset');
const formAdd = document.querySelector('.modal_add');

buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  modalAdd(title);
  data.getDataEvent = ['add'];
  // const form = document.getElementsByClassName('modal_add');
});

buttonSave.addEventListener('click', (event) => {
  event.preventDefault();
  const elements = formAdd.querySelectorAll('input');
  const notvalidity = [...elements].find((el) => {
    let err;
    if (el.value === '') {
      err = el;
    }
    if (el.value === Number(inputprice.value) && Number(inputprice.value) <= 0) {
      err = el;
    }
    if (!el.validity.valid) {
      err = el;
    }
    return err;
  });
  if (notvalidity) {
    const error = document.createElement('span');
    error.classList.add('validity');
    error.textContent = 'Данные заполнены неверно';
    notvalidity.insertAdjacentElement('afterEnd', error);
    error.style.marginLeft = '10px';
    error.style.marginTop = `${(notvalidity.offsetHeight - error.offsetHeight) / 2}px`;
    notvalidity.onfocus = function () {
      error.remove();
    };
  } else {
    if (data.getDataEvent[0] === 'add') {
      const dataid = data.getDataBase.length;
      const value = {
        id: dataid,
        name: inputname.value,
        price: inputprice.value,
      };
      data.change(value, 'add');
      console.log(data.getDataBase);
    }
    if (data.getDataEvent[0] === 'edit') {
      const value = {
        id: data.getDataEvent[1],
        name: inputname.value,
        price: inputprice.value,
      };
      data.change(value, 'edit');
      console.log(data.getDataBase);
    }
    redraw();
    formAdd.style.display = 'none';
    inputname.value = '';
    inputprice.value = '';
  }
});

buttonReset.addEventListener('click', (e) => {
  e.preventDefault();
  formAdd.style.display = 'none';
});

document.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.id === 'edit') {
    const tr = e.target.closest('tr');
    modalAdd(title);
    data.getDataBase.forEach((el) => {
      if (el.id === Number(tr.dataset.id)) {
        inputname.value = el.name;
        inputprice.value = el.price;
        data.getDataEvent = ['edit', el.id];
      }
    });
  }
  if (e.target.id === 'delete') {
    const answer = confirm('Удаление записи?');
    if (answer) {
      const tr = e.target.closest('tr');
      data.getDataBase.forEach((el) => {
        if (el.id === Number(tr.dataset.id)) {
          data.change(el, 'delete');
        }
      });
      redraw();
    }
  }
});
