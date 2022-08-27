import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { delay } from 'rxjs/operators';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales!: Hospital[];
  public hospitalesTemp!: Hospital[];

  public cargando: boolean = true;

  public imgSubs!: Subscription;


  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasServices: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(
        img => {
          console.log(img);
          this.cargarHospitales()
        }
      )

  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      })
  }

  guardarCambios(hospital: Hospital) {
    console.log(hospital)
    this.hospitalService.modificarHospital(hospital.uid!, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    console.log(hospital)
    this.hospitalService.borrarHospital(hospital.uid!)
      .subscribe(resp => {
        Swal.fire('Borrado', hospital.nombre, 'success');
        this.cargarHospitales()
      });
  }

  async crearHospital() {
    console.log('creando nuevo hospital');
    const { value } = await Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese nuevo hospital',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((hospital: any) => {
          this.hospitales.push(hospital);
        })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital.uid!, hospital.img!);
  }

  searchHospital(termino: string) {
    console.log(termino)
    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.busquedasServices.buscar('hospitales', termino)
      .subscribe(resp => this.hospitales = resp)
  }

}
