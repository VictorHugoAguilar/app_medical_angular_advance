import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = []

  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private servicioBusqueda: BusquedasService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params
      .subscribe(({ termino }) => {
        this.search(termino)
      });
  }

  search(termino: string) {
    this.servicioBusqueda.search(termino)
      .subscribe((resp: any) => {
        // console.debug('result of search -> ', resp);
        if (resp.usuarios.length === 0 &&
          resp.hospitales.length === 0 &&
          resp.medicos.length === 0
        ) {
          this.limpiar();
        }else{
          this.usuarios = resp.usuarios;
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
        }
      })
  }

  limpiar() {
    this.hospitales = [];
    this.medicos = [];
    this.usuarios = [];
  }

}
