import { Observable } from 'rxjs';
import { Pessoa } from './pessoa';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  //Url - http://www.google.com
  //post, put, delete, get
  private readonly Api = "http://localhost:3000/pessoas";
  constructor(private http: HttpClient) { }

  /*get: recuperar os dados das pessoas a serem exibidos na tela */
  recuperarPessoas(){
    return this.http.get<Pessoa[]>(this.Api);
  }
  /*post: para adicionar novas pesoas */
  adicionarPessoa(pessoa: Pessoa) : Observable<any>{
    return this.http.post(this.Api,pessoa);
  }
  /*put: para editar os dados das pessoas no formulario */
  editarPessoa(pessoa: Pessoa): Observable<any>{
    return this.http.put(this.Api + '/' + pessoa.id,pessoa);
  }
  /*delete: para deletar os dados das pesoas */
  deletarPessoa(id:number): Observable<any>{
    return this.http.delete(this.Api + '/' + id);
  }
}
