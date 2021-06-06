import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    /*
    const promesas = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hola desde la promesa');
      } else {
        reject('algo a ocurrido')
      }
    });

    promesas
      .then((res) => {
        console.log(res);
      })
      .catch(
        (err) => {
          console.log(err);
        }
      );

    console.log('Fin del init');
    */

    this.getUsuarios().then( usuarios => console.log(usuarios));

  }

  getUsuarios() {
    const promesa = new Promise( resolve => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(body => resolve(body))
    });
    return promesa;
  }

}
