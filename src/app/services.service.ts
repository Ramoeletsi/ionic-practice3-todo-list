import { Injectable } from '@angular/core';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  formData:Todo = new Todo();
  public list: Todo[] = [];

  constructor() { 
    this.reseForm();
  }

  reseForm(){
    this.formData = new Todo();
    this.formData.taskId = this.getRandomInt(0, 999999);
    this.formData.category = 'personal';
  }
   changeStatus(id: number){
      for(let index = 0; index <this.list.length; index++){
        if(this.list[index].taskId == id){
          this.list[index].status = (this.list[index].status == 0? 1: 0)
        }
      }
   }
   //create
   createTodo(){
    this.list.push(this.formData);
   }
   
  //  reads
  getTodo(id: number){
    let todo: any;
    this.list.forEach(item =>{
      if(item.taskId == id)
      todo = item;
    });
    return todo;
  }
  //  updatas
  updateTodo() {
    for (let index = 0; index < this.list.length; index++){
      if(this.list[index].taskId == this.formData.taskId){
        this.list[index] = this.formData;
      }
    }
  }
// delete
  deleteTodo(id: number) {
    for (let index = 0; index < this.list.length; index++){
      if(this.list[index].taskId == id){
        this.list.splice(index, 1);
      }
    }
  }

  getCount(category: string) {
    let task: any = [];
    for(let i =0; i<this.list.length; i++){
      if(this.list[i].category == category){
        task.push(this.list[i])
      }      
    }
    return new Set(task).size;
  }

  getCategotyProgressCount(catagory: string){
    if(this.getCount(catagory)>0){
      return this.getCount(catagory)/ this.list.length;
    }
    else{
      return 0
    }
  }

  getRandomInt(min: any, max: any){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) +min;
  }

}
