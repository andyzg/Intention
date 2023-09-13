import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "Data/db";
import { onAuthUpdate } from "store/reducer/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChange((event, session) => {
      dispatch(onAuthUpdate({ session }));
    })
  }, []);
}

export default useAuth;
