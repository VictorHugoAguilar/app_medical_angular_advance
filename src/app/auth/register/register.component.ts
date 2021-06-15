import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordIdent('password', 'password2')
  } as AbstractControlOptions);

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.usuarioService.createUser(this.registerForm.value).subscribe(
      resp => {
        console.warn('Usuario creado', resp);
        Swal.fire(
          'Creado',
          'Usuario creado correctamente!',
          'success'
        );
      },
      (err) => {
        console.error(err.error);
        Swal.fire(
          'Error',
          err.error.msg,
          'error'
        );
      }
    );
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  acceptedTems() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordInvalid(): boolean {
    const password_a = this.registerForm.get('password')?.value;
    const password_b = this.registerForm.get('password2')?.value;
    if ((password_a !== password_b) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordIdent(password_a: string, password_b: string) {
    return (formGrpup: FormGroup) => {
      const password_1 = formGrpup.get(password_a);
      const password_2 = formGrpup.get(password_b);
      if (password_1 != null && password_2 != null) {
        if (password_1.value === password_2.value) {
          password_1.setErrors(null);
        } else {
          password_1.setErrors({ noEsIgual: true });
        }
      }
    }
  }

}
