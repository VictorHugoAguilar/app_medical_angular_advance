import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var gapi: any;

import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false]
  } as AbstractControlOptions);


  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }


  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.usuarioService.loginUser(this.loginForm.value)
      .subscribe(resp => {
        console.debug(resp);
        const remember = this.loginForm.get('remember')?.value || false;
        const email = this.loginForm.get('email')?.value || "";
        if (remember) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
        // Mover al dashboard
        this.router.navigateByUrl('/');
      },
        (error) => {
          const erroresMail = error.error?.errores?.email?.msg || "";
          const erroresPass = error.error?.errores?.password?.msg || "";
          const erroresUser = error.error?.msg || "";
          Swal.fire(
            'Error',
            `${erroresMail} ${erroresPass} ${erroresUser}`,
            'error'
          );
        });
    // this.router.navigateByUrl('/');
  };

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  };

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        var id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(resp => {
          // Mover al dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  };

}
