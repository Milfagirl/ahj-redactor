export default class Data {
  constructor(array) {
    this.dataBase = array;
    this.dataEvent = [];  
  };

  set getDataBase(value) {
    this.dataBase = value;
  }
  get getDataBase() {
    return this.dataBase;
  }

  set getDataEvent(value) {
    this.dataEvent = value;
  }
  get getDataEvent() {
    return this.dataEvent;
  }

  change(value, method) {
    if (method === 'add') {
      const database = this.getDataBase;
      database.push(value);
      this.getDataBase = database;
      console.log(this.getDataBase);
    };
    if (method === 'edit') {
      const data = this.getDataBase;
      data.forEach((element) => {
        if (element.id === value.id) {
          element.name = value.name;
          element.price = value.price;
        }
        this.getDataBase = data;
      });
    };
    if (method === 'delete') {
      const data = this.getDataBase;
      let index = 0;
      data.forEach((element) => {
        if (element.id === value.id) {
          index = data.indexOf(element);
        }
       });
      data.splice(index, 1);
      this.getDataBase = data;
    }
}
}



