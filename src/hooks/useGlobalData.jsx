import { useContext } from "react";
import { GlobalContext } from "../context/context";

const useGlobalData = () => {
  return useContext(GlobalContext);
};

export default useGlobalData;
