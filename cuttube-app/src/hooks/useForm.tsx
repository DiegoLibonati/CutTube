import { useState } from "react";

type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
};

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
    formState: formState,
    onInputChange: onInputChange,
    onResetForm: onResetForm,
  };
};
