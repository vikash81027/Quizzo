interface btn {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  disabled?: boolean;
}

function Button({ name, onClick, className, disabled = false }: btn) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {name}
    </button>
  );
}

export default Button;
