import Layout from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 ${inter.className}`}
    >
      <Layout titulo="Cadastro Simples">
        <span>Conteudo</span>
      </Layout>
    </main>
  );
}
