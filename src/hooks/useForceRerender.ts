import { useState } from "react";

const useForceRerender = (): [number, () => void] => {
  const [value, setValue] = useState(0);
  const rerender = () => setValue(value => value + 1);
  return [value, rerender];
};

export default useForceRerender;
