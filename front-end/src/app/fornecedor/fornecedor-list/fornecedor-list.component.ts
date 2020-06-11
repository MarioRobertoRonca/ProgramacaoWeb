import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.scss']
})
export class FornecedorListComponent implements OnInit {

  public fornecedores: any =[] //Vetor vazio
  
  displayedColumns: string[] = ['razao_social', 'nome_fantasia', 'telefone', 'email', 'excluir']

  constructor( 
      private fornecedorSrv: FornecedorService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog
    ) {}

  async ngOnInit() {
    this.fornecedores = await this.fornecedorSrv.listar()
    console.log(this.fornecedores);
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
        await this.fornecedorSrv.excluir(id)
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
