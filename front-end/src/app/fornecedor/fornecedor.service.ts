import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  /* 
   * INJEÇÃO DE DEDÊNCIAS:  em vez de criarmos
   * Manualmente as DEPENDÊNCIAS nessárias, o 
   * Próprio Angular as cria e INJETA o objeto
   * já instanciado com parâmetro do construtor
  */  
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get('http://localhost:3000/fornecedor').toPromise()
  }

  excluir(id: string){
    return this.http.request('DELETE', 'http://localhost:3000/fornecedor',
      {body: { _id: id}}).toPromise()
  }
}

