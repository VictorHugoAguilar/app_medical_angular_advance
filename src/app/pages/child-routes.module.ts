import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' } },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
  { path: 'promesas',  canActivate: [ AdminGuard ],component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },

  // Mantenimientos
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Usuario de aplicación' } },

  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Usuario de aplicación' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Usuario de aplicación' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Usuario de aplicación' } }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
