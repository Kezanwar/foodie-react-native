import { useDispatch } from "react-redux";
import { AppDispatch } from "types/store";

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
