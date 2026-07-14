import { useEffect } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";

function Register() {

  useEffect(() => {
    document.title = "BookVerse | Register";
  }, []);

  return (
    <>
      <RegisterForm />
    </>
  );
}

export default Register;