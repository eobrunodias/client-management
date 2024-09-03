import ColecaoCliente from "@/backend/db/ColecaoCliente";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const [cliente, setCliente] = useState(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  useEffect(obterTodos, []);

  function obterTodos() {
    repo.obterTodos().then((clientes) => {
      setClientes(clientes);
      setVisivel("tabela");
    });
  }

  async function novoCliente() {
    setCliente(Cliente.vazio());
    setVisivel("form");
  }

  async function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    setVisivel("form");
  }

  async function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`);
  }

  async function salvarCliente(cliente: Cliente) {
    repo.salvar(cliente);
    setVisivel("tabela");
  }

  return (
    <main
      className={`flex h-screen justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 ${inter.className}`}
    >
      <Layout titulo="Cadastro Simples">
        {visivel === "tabela" ? (
          <>
            <div className="flex justify-end">
              <Button cor="green" className="mb-4" onClick={novoCliente}>
                New client
              </Button>
            </div>
            <Table
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            />
          </>
        ) : (
          <Form
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel("tabela")}
          />
        )}
      </Layout>
    </main>
  );
}
