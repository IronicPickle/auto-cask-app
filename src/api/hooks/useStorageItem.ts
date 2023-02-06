import { storageManager } from "@src/App";
import { useEffect, useState } from "react";

const useStorageItem = <V = void>(key: string) => {
  const [item, setItem] = useState<V | null>(null);

  useEffect(() => {
    const get = async () => {
      setItem(await storageManager.get<V>(key));
    };
    get();
  }, [key]);

  useEffect(() => {
    const id = storageManager.addEventListener<"change", V>("change", (changedKey, value) => {
      if (changedKey === key) setItem(value);
    });
    return () => storageManager.removeEventListener(id);
  }, [key]);

  const set = (value: V) => storageManager.set(key, value);
  const remove = () => storageManager.remove(key);

  return { item, set, remove };
};

export default useStorageItem;
