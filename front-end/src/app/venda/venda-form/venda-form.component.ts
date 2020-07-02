import { ClienteService } from './../../cliente/cliente.service';
import { VendaService } from './../venda.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.scss']
})
export class VendaFormComponent implements OnInit {

  title: string = 'Novo venda'

  venda: any = {} //Objeto vazio

  //Entidade relacionada
  clientes: any =[] //vetor vazio 

  constructor(
    private vendaSrv : VendaService,
    private ClienteSrv: ClienteService, 
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }
  
  

  async ngOnInit() {
    //Capturando os parâmetro da rota
    let params = this.actRoute.snapshot.params
    //Exite um parâmetro chamando  : id ?
    if(params['id']) {
      //É caso de atualização. É necessário consultar o back-end
      //para recuperar o registo e colocálo para edição
      try{
        this.venda = await this.vendaSrv.obterUM(params['id'])
        this.title = 'Atualizando venda'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration:5000})
      }
    }

    //Entidade relacionadas
    try{
      this.clientes = await this.ClienteSrv.listar()
    }
    catch(erro){
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
    }

  }

  voltar(x){

  }
  async salvar( form: NgForm){
    //Só vai salvar se o form for valido 
    if(form.valid){
      try{
        let msg = 'Venda atualizada com sucesso.'
        //Se existir o campo _id, é caso de atualização
        if(this.venda._id) {
          await this.vendaSrv.atualizar(this.venda)
        }
        //Se não existir o _id é caso de atualização
        else{
          await this.vendaSrv.novo(this.venda)
          msg = 'Venda criada com sucesso. '
        }
        //Dá o feedBack para o usúario 
        this.snackBar.open( 'Nova Venda criado com sucesso' , 'Entendi', {duration: 50000})
        //Voltar à listagem 
        this.router.navigate(['/venda'])
      }
      catch(erro){
        this.snackBar.open(erro.message, 'Que pena!',{duration: 5000})
      }
    }
  }
}