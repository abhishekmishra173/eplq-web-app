import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export const Button: FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  children,
  ...props
}) => {
  const baseStyle =
    "px-6 py-2 rounded-md font-semibold transition-all duration-200 disabled:opacity-50";
  const styles = {
    primary: "bg-brand-900 text-white hover:bg-brand-600 shadow-md",
    outline: "border-2 border-brand-900 text-brand-900 hover:bg-brand-50",
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
