import { FornecedorFormComponent } from './fornecedor/fornecedor-form/fornecedor-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorListComponent } from './fornecedor/fornecedor-list/fornecedor-list.component';


const routes: Routes = [
  {
    path: 'fornecedor', // No angular, não se usa / no começo da rota
    component: FornecedorListComponent
  },
  {
    path: 'fornecedor/novo', // cadastrar novo fornecedor
    component: FornecedorFormComponent
  },
  {
    path: 'fornecedor/:id', //Editar um fornecedor já existente
    component: FornecedorFormComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
