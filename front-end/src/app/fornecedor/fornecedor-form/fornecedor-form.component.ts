import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent implements OnInit {

  title: string = 'Novo fornecedor'

  fornecedor: any = {} //Objeto vazio
  
  constructor(
    private fornecedorSrv : FornecedorService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  
  

  async ngOnInit() {
    //Capturando os parâmetro da rota
    let params = this.actRoute.snapshot.params
    //Exite um parâmetro chamando  : id ?
    if(params['id']) {
      //É caso de atualização. É necessário consultar o back-end
      //para recuperar o registo e colocálo para edição
      try{
        this.fornecedor = await this.fornecedorSrv.obterUM(params['id'])
        this.title = 'Atualizando fornecedor'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration:5000})
      }
    }
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/fornecedor']); // Retorna à listagem
    }

  }
  async salvar( form: NgForm){
    //Só vai salvar se o form for valido 
    if(form.valid){
      try{
        let msg = 'Fornecedor atualizado com sucesso.'
        //Se existir o campo _id, é caso de atualização
        if(this.fornecedor._id) {
          await this.fornecedorSrv.atualizar(this.fornecedor)
        }
        //Se não existir o _id é caso de atualização
        else{
          await this.fornecedorSrv.novo(this.fornecedor)
          msg = 'Fornecedor criado com sucesso. '
        }
        //Dá o feedBack para o usúario 
        this.snackBar.open( 'Fornecedor criado com sucesso' , 'Entendi', {duration: 50000})
        //Voltar à listagem 
        this.router.navigate(['/fornecedor'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!',{duration: 5000})
      }
    }
  }
}