import { useState } from "react";
import Router from "next/router";

import { useRequest } from "../../hooks/useRequest";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    method: "post",
    url: "/api/users/signin",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  async function onSubmit(event) {
    event.preventDefault();
    doRequest();
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors}

      <button className="btn btn-primary">Sign in</button>
    </form>
  );
};

export default SignUp;
