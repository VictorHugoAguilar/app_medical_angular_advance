import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({ providedIn: 'root' })
export class HospitalService {

  constructor(private http: HttpClient) { }

  cargarHospitales(desde: number = 0) {
    const url = `${base_url}/hospitales`;
    return this.http.get<any>(url)
      .pipe(
        map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
      )
  }

  crearHospital(nombre: string) {
    const url = `${base_url}/hospitales/`;
    return this.http.post<any>(url, { nombre })
      .pipe(
        map((resp: { ok: boolean, hospital: Hospital }) => resp.hospital)
      )
  }

  modificarHospital(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put<any>(url, { nombre })
      .pipe(
        map((resp: { ok: boolean, hospital: Hospital }) => resp.hospital)
      )
  }

  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete<any>(url)
      .pipe(
        map((resp: { ok: boolean, hospital: Hospital }) => resp.hospital)
      )
  }

}