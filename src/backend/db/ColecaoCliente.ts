import app from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const clienteConverter: FirestoreDataConverter<Cliente> = {
  toFirestore(cliente: WithFieldValue<Cliente>): DocumentData {
    return {
      nome: cliente.nome,
      idade: cliente.idade,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Cliente {
    const data = snapshot.data();
    return new Cliente(data.nome, data.idade, snapshot.id);
  },
};

export default class ColecaoCliente implements ClienteRepositorio {
  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      const clienteDocRef = doc(this.colecao(), cliente.id);
      await setDoc(clienteDocRef, clienteConverter.toFirestore(cliente));
      return cliente;
    } else {
      const clienteDocRef = doc(collection(db, "clientes"));
      await setDoc(clienteDocRef, clienteConverter.toFirestore(cliente));
      const docSnapshot = await getDoc(clienteDocRef);

      if (docSnapshot.exists()) {
        return clienteConverter.fromFirestore(
          docSnapshot as QueryDocumentSnapshot
        );
      } else {
        return new Cliente("", 0, "");
      }
    }
  }

  async excluir(cliente: Cliente): Promise<void> {
    const clienteDocRef = doc(this.colecao(), cliente.id);
    await deleteDoc(clienteDocRef);
  }

  async obterTodos(): Promise<Cliente[]> {
    const querySnapshot = await getDocs(this.colecao());
    return querySnapshot.docs.map((doc) =>
      clienteConverter.fromFirestore(doc)
    ) as Cliente[];
  }

  private colecao() {
    return collection(db, "clientes").withConverter(clienteConverter);
  }
}
