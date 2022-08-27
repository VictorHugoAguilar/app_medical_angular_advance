import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;

  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico | undefined;
  public hospitalSeleccionado: Hospital | undefined;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const { id } = params;
      this.cargarMedico(id);
    })

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h.uid === hospitalId);
      })
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService.cargarMedico(id)
      .pipe(
        delay(100)
      )
      .subscribe((medico: any) => {
        if(!medico)
        {
          return;
        }
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
    })
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      })
  }

  saveMedical() {
    if (this.medicoSeleccionado) {
      // Update medical
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado.uid
      }
      this.medicoService.modificarMedico(data)
        .subscribe((medico: any) => {
          Swal.fire('Actualizado', `${medico.nombre} creado correctamente `, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${medico.uid}`)
        });

    } else {
      const { nombre } = this.medicoForm.value;
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((medico: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente `, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${medico.uid}`)
        });
    }



  }

  abrirModalH(hospital: Hospital) {
    if (!hospital) return;
    this.modalImagenService.abrirModal('hospitales', hospital.uid!, hospital.img);
  }
}
