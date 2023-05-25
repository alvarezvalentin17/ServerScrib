import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Alert } from "./Alert";
import "./login.css";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="body ">
        <div className="login">
          {error && <Alert message={error} />}
          <h1>SysAdmin</h1>
          <form method="post" onSubmit={handleSubmit}>
            <input
              className="inputLogin"
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Correo electronico"
              required="required"
            />
            <input
              type="password"
              className="inputLogin"
              autoComplete="off"
              name="password"
              id="password"
              onChange={handleChange}
              required="required"
              placeholder="********"
            />
            <button
              type="submit"
              className="btnLogin  btnLogin-primary btnLogin-block btnLogin-large"
            >
              Iniciar Sesion
            </button>
            {/* <div className="mt-5">
          <a
            className="text-light mt-5 "
            href="#!"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </a>
        </div> */}
          </form>
        </div>
      </div>
    </>
  );
}
