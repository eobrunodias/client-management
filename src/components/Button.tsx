interface ButtonProps {
  cor?: "green" | "blue" | "gray";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const cor = props.cor ?? "gray";

  return (
    <button
      className={`
      bg-gradient-to-r from-${cor}-400 to-${cor}-700
      text-white px-4 py-2 rounded-md
      ${props.className}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
