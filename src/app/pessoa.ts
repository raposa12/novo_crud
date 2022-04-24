export class Pessoa{
 
 /*Criando propiedades pessoa a serem usadas*/
  public id!: number;
  public nome:string;
  public idade: number;
  public email:string;

  constructor(id:number, nome: string, idade: number, email: string) {
    this.idade = idade;
    this.nome = nome;
    this.email = email;
    this.id = id;
  }
}