import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({ providedIn: 'root' })
export class FileUploadService {

  constructor() { }

  async updateImage(
    file: File,
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);
      const resp = await fetch(url, {
        method: 'PUT',
        // the headers are introduced by the interceptor but at the moment I don't remove it from here 
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await resp.json();

      if (data.ok) {
        return data.nombreFichero;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }


}
