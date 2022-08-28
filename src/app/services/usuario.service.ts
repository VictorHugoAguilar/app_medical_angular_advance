import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interface/cargar-usuarios.interface';
import { formLogin } from '../interface/login-form.interface';
import { registerForm } from '../interface/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

const base_url = environment.base_url;

@Injectable({ providedIn: 'root' })
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

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario?.role || 'USER_ROLE';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
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
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      // console.debug('User signed out.');
    });
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login`, {
      // the headers are introduced by the interceptor but at the moment I don't remove it from here 
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { nombre, email, img = '', google, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', role, google, img, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError((error: any) => {
        console.error(error);
        return of(false);
      })
    );
  }

  createUser(formData: registerForm) {
    console.debug('creando user', formData);
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  };

  loginUser(formData: formLogin) {
    console.debug('login user', formData);
    console.debug('base_url', `${base_url}/login`)
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  };

  loginGoogle(token: any) {
    // console.debug('login user', token);
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  };

  updatePerfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario?.role!
    }
    // console.debug('updatePerfil', data);
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      // the headers are introduced by the interceptor but at the moment I don't remove it from here 
      headers: {
        'x-token': this.token
      }
    });
  };

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}&perPage=5`;
    // the headers are introduced by the interceptor but at the moment I don't remove it from here 
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        delay(200),
        map(resp => {
          const usuarios = resp.usuarios.map(user =>
            new Usuario(user.nombre, user.email, '',
              user.role, user.google, user.img, user.uid))
          return {
            total: resp.total,
            usuarios
          };
        })
      );
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios/${usuario.uid}`;
    // the headers are introduced by the interceptor but at the moment I don't remove it from here 
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    // the headers are introduced by the interceptor but at the moment I don't remove it from here 
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  };

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

}
