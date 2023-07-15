import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { FacturaComponent } from './components/factura/factura.component';

const routes: Routes = [
  {
    path: 'home',
    component: BodyComponent
  },
  {
    path: "",
    redirectTo: '/home',
    pathMatch: "full"
  },
  {
    path: 'facturar',
    component: FacturaComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
