import { ReactNode } from "react";

interface TituloProps {
  children: ReactNode;
}

export default function Titulo(props: TituloProps) {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="py-2 px-5 text-2xl">{props.children}</h1>
      <hr className="border-2 border-purple-500" />
    </div>
  );
}
