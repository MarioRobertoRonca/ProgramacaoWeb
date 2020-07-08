import { Component, OnInit, Input } from '@angular/core';
import { ConfirmDlgComponent } from './../../ui/confirm-dlg/confirm-dlg.component';
import { ItemVendaService } from './../item-venda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item-venda-list',
  templateUrl: './item-venda-list.component.html',
  styleUrls: ['./item-venda-list.component.scss']
})
export class ItemVendaListComponent implements OnInit {

  //Recebendo um parâmetro do componenete pai 
  @Input() venda : string = ''

  public itensVenda: any =[] //Vetor vazio
  
  displayedColumns: string[] = ['venda', 'produto','quantidade', 'desconto', 'acrescimo',
  'preco_unitario', 'preco_total', 'editar', 'excluir']

  constructor( 
      private ItemVendaSrv: ItemVendaService,
      private snackBar : MatSnackBar,
      private dialog: MatDialog
    ) {}

  async ngOnInit() {
    // Se for passado o parâmetro venda pelo componente pai
    if(this.venda != '') {
      this.itensVenda = await this.ItemVendaSrv.filtrarVenda(this.venda)
    }
    else {
      this.itensVenda = await this.ItemVendaSrv.listar()
    }
    console.log(this.itensVenda)
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
        await this.ItemVendaSrv.excluir(id)
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
