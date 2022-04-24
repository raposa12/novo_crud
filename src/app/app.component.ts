import { PessoaService } from './pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from './pessoa';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud';
  /*lista dinamica de pessoa*/
  pessoaLista: Array<Pessoa> = [];
  novaPessoa!: Pessoa;
  editar = false;

  /*variaves dos dados a serem chamados a baixo */
  nome = "";
  idade = 0;
  id = 0;
  email = "";


  /*utlizando as propiedades de servicos: PessoaService*/
  /*para não exibir o formulario de adicionar pessoa*/
  mostrarFormulario = false;

  constructor(private pessoaService: PessoaService){}

  /*recuperar a lista dos dados das pesoas do servidor para exibir na tela(Editar, Remover)*/
  ngOnInit(): void {
    this.recuperarPessoas();
  }

  /*fazendo a requisiçao do servidor*/
  /*caso tiver algo errado ele diz */
  /*conversando com o servidor*/
  recuperarPessoas(){
    this.pessoaService.recuperarPessoas()
    .subscribe(
      response => this.pessoaLista = response,
      error => console.log(error)
    )
  }
  /*metodo para mostar formulario apos o click no adicionar pessoa*/
  adicionarPessoa(){
    this.mostrarFormulario = true;
  }

  /*para excluir os dadosm ou informaçoes das pessoas */
  deletarPessoa(id: number){
    this.pessoaService.deletarPessoa(id)
    .subscribe(
      res => {
        this.pessoaLista = this.pessoaLista.filter(pes => pes.id !== id);
      },
      err => alert("Erro ao deletar")
    )
  }

  /*quando clicar no botao de editar ele vai exibiar o campo com os dados das pessoas a serem editados */
  editarFormualrio(pessoa: Pessoa){
    this.id = pessoa.id;
    this.nome = pessoa.nome;
    this.idade = pessoa.idade;
    this.email = pessoa.email;
    this.mostrarFormulario = true;
    this.editar = true;
  }
  /*para salvar as imformaçoes dos dados novos adicionados */
  salvar(){
    this.novaPessoa = new Pessoa(this.id,this.nome,this.idade,this.email);

    if(!this.editar){/*começando para a ediçao de pessoa */
    /*adicionar essa pessoa no formulario e depos oucultar */
    this.pessoaService.adicionarPessoa(this.novaPessoa)
              .subscribe(
                res => {
                  this.pessoaLista.push(this.novaPessoa);
                  this.mostrarFormulario = false;
                },
                 err => alert("Erro ao Salvar")
              );
  } else {
    /*Editar: alterar os dados das pessoas e atualizar */
    this.pessoaService.editarPessoa(this.novaPessoa)
    .subscribe(
      res => {
        this.mostrarFormulario = false;
        let indexPessoa = this.pessoaLista.findIndex(x => x.id == this.novaPessoa.id);
        this.pessoaLista[indexPessoa] = this.novaPessoa;
      },
      err => ("Erro ao Salvar")
    )
  }
 }
}
