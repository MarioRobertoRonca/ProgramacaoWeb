import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { VendaService } from './../venda.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.scss']
})
export class VendaListComponent implements OnInit {

    public vendas: any = {} //Vetor vazio
  
  displayedColumns: string[] = ['num_venda','cliente', 'data_venda',
  'forma_pagamento', 'data_pagamento', 'editar', 'excluir']

  constructor( 
      private vendaSrv: VendaService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog
    ) {}

  async ngOnInit() {
    this.vendas = await this.vendaSrv.listar()
    console.log(this.vendas);
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este item?')) {
    if(result) {
      try{
        await this.vendaSrv.excluir(id)
        this.ngOnInit() //Atualizar os dados da tabela
        this.snackBar.open('Exclusão efetuado com sucesso', 'Entendi', {
          duration: 3000
        })
      }
      catch(erro){
        this.snackBar.open('Erro: não foi possivel excluir este item', 'Que pena!', {
          duration: 3000
        })
      }
    }
  }
}
