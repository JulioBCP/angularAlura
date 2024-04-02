import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  // Linhas comentadas sao para uso com LocalStorage

  // private contatos: Contato[] = [
  //   {"id": 1, "nome": "Ana", "telefone": "29 278869420", "email": "email1@email.com"},
  //   {"id": 2, "nome": "Antônio", "telefone": "38 128451235", "email": "email1@email.com"},
  //   {"id": 2, "nome": "Ágata", "telefone": "38 128451235", "email": "email1@email.com"},
  //   {"id": 3, "nome": "Bruno", "telefone": "95 695521583", "email": "email1@email.com"},
  //   {"id": 4, "nome": "Beatriz", "telefone": "25 854986459", "email": "email1@email.com"},
  //   {"id": 5, "nome": "Carlos", "telefone": "94 543197849", "email": "email1@email.com"},
  //   {"id": 6, "nome": "Cláudia", "telefone": "31 176437098", "email": "email1@email.com"},
  //   {"id": 7, "nome": "Daniel", "telefone": "56 613692441", "email": "email1@email.com"},
  //   {"id": 8, "nome": "Diana", "telefone": "16 670764734", "email": "email1@email.com"},
  //   {"id": 9, "nome": "Eduardo", "telefone": "71 962784210", "email": "email1@email.com"},
  //   {"id": 10, "nome": "Eliana", "telefone": "94 601212586", "email": "email1@email.com"},
  //   {"id": 11, "nome": "Fabio", "telefone": "21 613882845", "email": "email1@email.com"},
  // ]

  // constructor() {
  //   //Tentar obter os dados do localStorage
  //   const contatosLocalStorageString = localStorage.getItem('contatos');
  //   const contatosLocalStorage = contatosLocalStorageString ? JSON.parse(contatosLocalStorageString) : null;

  //   if (contatosLocalStorage !== null) {
  //     this.contatos = contatosLocalStorage || null;
  //   }

  //   //Salvar os contatos no localStorage
  //   localStorage.setItem('contatos', JSON.stringify(this.contatos));
  // }

  private readonly API = 'http://localhost:3000/contatos'

  constructor(private http: HttpClient) { }

  obterContatos(): Observable<Contato[]> {
    // return this.contatos;
    return this.http.get<Contato[]>(this.API);
  }

  salvarContato(contato: Contato) {
    // this.contatos.push(contato);
    // localStorage.setItem('contatos', JSON.stringify(this.contatos));
    return this.http.post<Contato>(this.API, contato);
  }

  buscarPorId(id: number): Observable<Contato> {
    const url = `${this.API}/${id}`
    return this.http.get<Contato>(url);
  }

  excluirContato(id: number): Observable<Contato>{
    const url = `${this.API}/${id}`
    return this.http.delete<Contato>(url);
  }

  editarContato(contato: Contato): Observable<Contato> {
    const url = `${this.API}/${contato.id}`
    return this.http.put<Contato>(url, contato);
  }

  editarOuSalvarContato(contato : Contato): Observable<Contato> {
    if(contato.id) {
      return this.editarContato(contato);
    } else {
      return this.salvarContato(contato);
    }
  }

}
