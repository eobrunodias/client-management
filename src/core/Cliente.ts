export default class Cliente {
  private _id: string;
  private _nome: string;
  private _idade: number;

  constructor(nome: string, idade: number, id: string | null = null) {
    this._nome = nome;
    this._idade = idade;
    this._id = id as string;
  }

  static vazio() {
    return new Cliente("", 0);
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get idade() {
    return this._idade;
  }
}
