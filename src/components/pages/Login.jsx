import React, { useRef, useState } from "react";

function Login({ onLogin, onSignin }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isCreateAccount, setIsCreateAccount] = useState(true);

  const toggleAccount = () => {
    setIsCreateAccount((prev) => !prev);
  };

  console.log(`isCreateAccount: ${isCreateAccount}`);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    isCreateAccount ? onSignin(email, password) : onLogin(email, password);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="password"
            required
          />
          <input
            type="submit"
            value={isCreateAccount ? "Create Account" : "Login"}
          />
        </form>
        <span onClick={toggleAccount}>
          {isCreateAccount ? "Login" : "Craete Account"}
        </span>
      </div>
    </>
  );
}
export default Login;
