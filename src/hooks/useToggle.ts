import { useState } from "react";

export default function useToggle(initialValue = false): [boolean, () => void] {
  const [toggle, setToggle] = useState<boolean>(initialValue);
  function onToggle() {
    setToggle(!toggle);
  }
  return [toggle, onToggle];
}
