import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { formLogin } from '../interface/login-form.interface';
import { registerForm } from '../interface/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario | undefined;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: environment.CLIENT_ID,
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  };

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
      console.log('User signed out.');
    });
  }

  validateToken(): Observable<boolean> {
    console.log('entrando en el validate token')

    return this.http.get(`${base_url}/login`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { nombre, email, img = '', google, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', role, google, img, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }

  createUser(formData: registerForm) {
    console.debug('creando user', formData);
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  };

  loginUser(formData: formLogin) {
    console.debug('login user', formData);
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  };

  loginGoogle(token: any) {
    console.debug('login user', token);
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  };

  updatePerfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario?.role!
    }
    console.debug('updatePerfil', data);
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  };


}
