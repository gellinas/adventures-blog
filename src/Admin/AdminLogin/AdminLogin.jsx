import { useState } from "react";
import { Form, Button } from "semantic-ui-react";

import "./AdminLogin.scss";

function AdminLogin(props) {
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  return (
    <div className="admin-login-page-container">
      <div className="login-form-container">
        <div className="form-title">Admin Login</div>
        <Form size="large">
          <Form.Field
            value={usernameField}
            onChange={(event) => setUsernameField(event.target.value)}
          >
            <label>Username</label>
            <input />
          </Form.Field>
          <Form.Field
            value={passwordField}
            onChange={(event) => setPasswordField(event.target.value)}
          >
            <label>Password</label>
            <input type="password" />
          </Form.Field>
        </Form>
        <Button secondary onClick={() => props.history.push("/admin")}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AdminLogin;
