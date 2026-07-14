import { useEffect } from "react";
import LoginForm from "../components/Login/Login";

function Login() {

  useEffect(() => {
    document.title = "BookVerse | Login";
  }, []);

  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;