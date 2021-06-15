import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false]
  } as AbstractControlOptions);


  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  login() {
    this.usuarioService.loginUser(this.loginForm.value)
      .subscribe(resp => {
        console.debug(resp);
        const remember = this.loginForm.get('remember')?.value || false;
        const email = this.loginForm.get('email')?.value || "";
        if (remember) {
          localStorage.setItem('email', email);
        }else{
          localStorage.removeItem('email');
        }
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
  }

}
