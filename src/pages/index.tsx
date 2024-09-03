import Layout from "@/components/Layout";
import Table from "@/components/Table";
import Cliente from "@/core/Cliente";
import { Inter } from "next/font/google";

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

  return (
    <main
      className={`flex h-screen justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 ${inter.className}`}
    >
      <Layout titulo="Cadastro Simples">
        <Table
          clientes={clientes}
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
        ></Table>
      </Layout>
    </main>
  );
}
