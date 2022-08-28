import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interface/usuarios-promesas';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  public usuarios: Usuarios[] = [];

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

    this.getUsuarios().then( (usuarios:Usuarios[]) => {
      console.log( usuarios )
      this.usuarios = usuarios;
    });

  }

  getUsuarios() {
    const promesa = new Promise<Usuarios[]>( (resolve ) => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(body => resolve(body))
    });
    return promesa;
  }

}
