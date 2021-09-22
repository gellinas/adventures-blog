import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { loginAdmin, refreshLogin} from '../../api';
import Cookies from 'js-cookie';

import "./AdminLogin.scss";

function AdminLogin(props) {
  const [usernameField, setUsernameField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const logonAdmin = async () => {
    const response = await loginAdmin({ email: usernameField, password: passwordField });
    // await refreshLogin({});
    if (response.access_token) {
      props.setAdminToken(response.access_token);
      props.history.push("/admin", { 'accessToken': response.access_token});
    } else {
      props.history.push('/')
    }
  }

  return (
    <div className="admin-login-page-container">
      <div className="login-form-container">
        <div className="form-title">Admin Login</div>
        <Form size="large">
          <Form.Field
            value={usernameField}
            onChange={(event) => setUsernameField(event.target.value)}
          >
            <label>Email</label>
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
        <Button secondary onClick={() => logonAdmin()}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AdminLogin;
