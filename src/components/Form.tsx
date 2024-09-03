import { useState } from "react";
import Input from "./Input";
import Cliente from "@/core/Cliente";
import Button from "./Button";

interface FormProps {
  cliente: Cliente;
  clienteMudou?: (cliente: Cliente) => void;
  cancelado?: () => void;
}

export default function Form(props: FormProps) {
  const id = props.cliente?.id ?? null;
  const [nome, setNome] = useState(props.cliente?.nome ?? "");
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0);

  return (
    <div>
      {id ? (
        <Input somenteLeitura texto="Código" valor={id} className="mb-5" />
      ) : (
        false
      )}
      <Input
        texto="Nome"
        valor={nome}
        valorMudou={setNome}
        className={`mb-5`}
      />
      <Input
        texto="Idade"
        tipo="number"
        valor={idade}
        valorMudou={setIdade}
        className={`mb-5`}
      />
      <div className="flex justify-end mt-3">
        <Button
          className="mr-2"
          cor="blue"
          onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}
        >
          {id ? "Alterar" : "Salvar"}
        </Button>
        <Button onClick={props.cancelado}>Cancelar</Button>
      </div>
    </div>
  );
}
