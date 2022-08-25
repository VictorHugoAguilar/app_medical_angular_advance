import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup | undefined;
  public usuario: Usuario;
  public imageUpload: File | undefined;
  public imgTemp: any | null;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario!;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    const data = this.perfilForm?.value;
    this.usuarioService
      .updatePerfil(data)
      .subscribe(
        (resp) => {
          const { nombre, email } = data;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          console.debug(resp)
          Swal.fire('Guardado', 'Los cambios han sido guardados correctamente', 'success');
        }, (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      );
  }

  changeImage(event: any) {
    console.log(event)
    const file = event.target!.files[0];

    if (file) {
      this.imageUpload = file;
    } else {
      this.imageUpload = undefined;
      this.imgTemp = undefined;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    if (this.imageUpload && this.usuario.uid) {
      this.fileUploadService.
        updateImage(this.imageUpload, 'usuarios', this.usuario.uid)
        .then(img => {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        }).catch(err => {
          Swal.fire('Error', 'No se ha podido actualizar la imagen del perfil', 'error');
        });
    }
  }



}
