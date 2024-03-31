import { useState } from "react";
import { UseForm } from "../entities/vite-env";

export const useForm = <T,>(initialForm: T): UseForm<T> => {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  return {
    formState,
    onInputChange,
    onResetForm,
  };
};
