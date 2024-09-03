import Button from "@/components/Button";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import Cliente from "@/core/Cliente";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const clientes = [
    new Cliente("Ana", 34, "1"),
    new Cliente("Bia", 45, "2"),
    new Cliente("Carlos", 23, "3"),
    new Cliente("Pedro", 54, "4"),
  ];

  function clienteSelecionado(cliente: Cliente) {
    console.log(cliente.nome);
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`);
  }

  function salvarCliente(cliente: Cliente) {
    console.log(cliente);
  }

  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  return (
    <main
      className={`flex h-screen justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 ${inter.className}`}
    >
      <Layout titulo="Cadastro Simples">
        {visivel === "tabela" ? (
          <>
            <div className="flex justify-end">
              <Button
                cor="green"
                className="mb-4"
                onClick={() => setVisivel("form")}
              >
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
            cliente={clientes[3]}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel("tabela")}
          />
        )}
      </Layout>
    </main>
  );
}
