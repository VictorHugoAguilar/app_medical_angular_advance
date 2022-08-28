import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({ providedIn: 'root' })
export class BusquedasService {

  constructor(private http: HttpClient) { }

  search(termino: string) {
    const url = `${base_url}/busqueda/${termino}`;
    return this.http.get<any[]>(url);
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string) {
    const url = `${base_url}/busqueda/${tipo}/${termino}`;
    return this.http.get<any[]>(url)
      .pipe(
        map((res: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(res.resultado);
            case 'hospitales':
              return this.transformarHospitales(res.resultado);
            case 'medicos':
              return this.transformarMedicos(res.resultado);
            default:
              return [];
          }
        })
      );
  }

  private transformarUsuarios(resultados: any[]): any[] {
    return resultados.map(user => {
      return new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid);
    })
  }

  private transformarHospitales(resultados: any[]): any[] {
    return resultados.map(user => {
      return new Hospital(user.nombre, user.uid, user.img, user.usuario);
    })
  }

  private transformarMedicos(resultados: any[]): any[] {
    return resultados.map(user => {
      return new Medico(user.nombre, user.uid, user.img, user.usuario, user.hospital);
    })
  }

}
