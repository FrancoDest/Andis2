import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: '', redirectTo: '/order', pathMatch: 'full' },  // Redirigir a /order como ruta predeterminada
  { path: 'order', component: OrderComponent },  // Ruta para el componente de pedidos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }