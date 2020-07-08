import { ItemVendaListComponent } from './item-venda/item-venda-list/item-venda-list.component';
import { ItemVendaFormComponent } from './item-venda/item-venda-form/item-venda-form.component';
import { VendaFormComponent } from './venda/venda-form/venda-form.component';
import { VendaListComponent } from './venda/venda-list/venda-list.component';
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
  },
  {
    path: 'venda', // Para listar a venda
    component: VendaListComponent
  },
  {
    path: 'venda/novo', // Abri o formulário 
    component: VendaFormComponent
  },
  {
    path: 'venda/:id', // Para abir o formulário para update 
    component: VendaFormComponent
  },
  {
    path: 'item-venda', // para listar item-venda
    component: ItemVendaListComponent
  },
  {
    path: 'item-venda/nova', //Para abrir formulário
    component: ItemVendaFormComponent
  },
  {
    path: 'item-venda/:id', //Para abrir formulário update
    component: ItemVendaFormComponent
  }
    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
