import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;

  public medicos!: Medico[];
  public medicosTemp!: Medico[];

  public imgSubs!: Subscription;


  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService, private busquedasServices: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(
        img => {
          this.cargarMedicos()
        }
      )
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(hospitales => {
        this.cargando = false;
        this.medicos = hospitales;
        this.medicosTemp = hospitales;
      })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico.uid!, medico.img!);
  }

  searchMedical(termino: string) {
    if (termino.length === 0) {
      this.medicos = this.medicosTemp;
      return;
    }
    this.busquedasServices.buscar('medicos', termino)
      .subscribe(resp => this.medicos = resp)
  }

  deleteMedical(medico: Medico) {
    if (!medico.uid) return;

    this.medicoService.borrarHospital(medico.uid!)
      .subscribe(resp => {
        Swal.fire('Borrado', medico.nombre, 'success');
        this.cargarMedicos()
      });
  }



}
