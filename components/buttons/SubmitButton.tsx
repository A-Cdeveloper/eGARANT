import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import MiniSpinner from "../MiniSpinner";

const SubmitButton = ({
  children,
  className,
  size,
  variant,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"
    | "primary_full"
    | "secondary_full"
    | "danger_full";
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={size}
      variant={variant}
      className={className}
      disabled={pending || disabled}
      onClick={onClick}
    >
      <>
        {pending ? (
          <div className="flex gap-1">
            <MiniSpinner /> Slanje...
          </div>
        ) : (
          children
        )}
      </>
    </Button>
  );
};

export default SubmitButton;
