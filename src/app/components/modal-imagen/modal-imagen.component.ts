import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File | undefined;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: any) {
    const file = event.target.files[0];

    this.imagenSubir = file;

    if (!file) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .updateImage(this.imagenSubir!, tipo!, id!)
      .then(img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }

}
