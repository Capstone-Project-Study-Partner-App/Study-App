import React from "react";
import { logInUser } from "../fetching";
import { useNavigate } from "react-router-dom";

export const LOGIN_ROUTE = "/";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [pending, setPending] = React.useState(false);
  const disabled = pending;

  return (
    <div className="home-container">
      <div className="home-image">
        <img
          src="https://i.pinimg.com/1200x/35/a0/d9/35a0d99126faaca0d33305bd1a86ee20.jpg"
          alt="Placeholder Image"
          style={{ width: "500px" }}
        />
      </div>

      <div className="login-form">
        <h1>Login</h1>
        <form
          className="login-form"
          onSubmit={async (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            setPending(true);
            const { success } = await logInUser({ email, password });
            if (success) {
              navigate("/users");
            }
            setPending(false);
          }}
        >
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            disabled={disabled}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            disabled={disabled}
          />
          {/* <br />
            <input type="checkbox" />
            <label>Remember Me</label>
            <br />
            <a href="#">Forgot Password?</a> */}
          <br />
          <button type="submit" disabled={disabled}>
            Login
          </button>
          <br />
        </form>
        <a href="#">Sign up Here</a>
      </div>
    </div>
  );
}
