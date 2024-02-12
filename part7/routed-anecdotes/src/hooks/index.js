import { useState } from "react";
export const useField = (name) => {
  const [value, setvalue] = useState("");
  const onChange = (event) => {
    setvalue(event.target.value);
  };
    const reset = () => {
        setvalue('')
  };
  return {
    name,
    value,
    onChange,
    reset,
  };
};
