import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useQuery = (key: string): string => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [value] = useState<string>(params.get(key) || "");
  return value;
};
