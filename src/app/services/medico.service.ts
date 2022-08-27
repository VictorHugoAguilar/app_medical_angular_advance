import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos(desde: number = 0) {
    const url = `${base_url}/medicos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos)
      )
  }

  cargarMedicoPorId(id: string) {
    const url = `${base_url}/medicos${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico)
      )
  }

  crearMedico(medico: { nombre: string, hospital: string }) {
    const url = `${base_url}/medicos/`;
    return this.http.post<any>(url, medico, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico)
      )
  }

  cargarMedico(idMedico: string) {
    const url = `${base_url}/medicos/${idMedico}`;

    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico)
      )
  }

  modificarMedico(data: { _id: string, nombre: string, hospital: string }) {
    console.debug('modifcar medico', data)
    const url = `${base_url}/medicos/${data._id}`;
    return this.http.put<any>(url, {
      nombre: data.nombre,
      hospital: data.hospital
    }, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico)
      )
  }

  borrarHospital(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico)
      )
  }


}
