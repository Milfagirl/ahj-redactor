import { modalAdd, redraw } from './modals.js';
import Data from './data.js'

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
});

buttonSave.addEventListener('click', (event) => {
  event.preventDefault();
  
  if (data.getDataEvent[0] === 'add') {
    const dataid = data.getDataBase.length;
    const value = {
      id: dataid,
      name: inputname.value,
      price: inputprice.value,
  };
    data.change(value, 'add');
    console.log(data.getDataBase);
  };
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
});

buttonReset.addEventListener('click', (e) => {
  e.preventDefault();
  formAdd.style.display = 'none';
})

document.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.id === 'edit') {
    const tr = e.target.closest('tr');
    modalAdd(title);
    data.getDataBase.forEach((el) => {
      console.log(el.id);
      console.log(tr.dataset.id);
      if (el.id === Number(tr.dataset.id)) {
        inputname.value = el.name;
        inputprice.value = el.price;
        data.getDataEvent = ['edit', el.id];
      };
    });

  };
  if (e.target.id === 'delete'){
    const tr = e.target.closest('tr');
    data.getDataBase.forEach((el) => {
      console.log(el.id);
      console.log(tr.dataset.id);
      if (el.id === Number(tr.dataset.id)) {
        data.change(el, 'delete');
      };
      console.log(data.getDataBase);
    });
    redraw();

  };




})
