import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private busquedasServices: BusquedasService,
    private modalImagenService: ModalImagenService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(
        img => {
          console.log(img);
          this.cargarUsuarios()
        }
      )
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }, error => {
        console.error(error);
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedasServices.buscar('usuarios', termino)
      .subscribe(resp => this.usuarios = resp)
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.usuario?.uid) {
      Swal.fire('Error', 'No se puede borar a si mismo ', 'error');
      return;
    }

    Swal.fire({
      title: 'Borrar usuario',
      text: "Esta seguro que quiere eliminarlo, no puede revertirlo",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            Swal.fire(
              'Usuario Borrado!',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            )
            this.cargarUsuarios();
          });
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => console.log(resp));
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

}
