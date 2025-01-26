import React from "react"
import "../styles/RegisterStyles.css"
import { Form, Input, Button, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
  const navigate = useNavigate()

  const onfinishHandler = (values) => {
    console.log(values)
    axios
      .post("/api/v1/user/login", values)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          localStorage.setItem("token", res.data.token)
          message.success(res.data.message)
          navigate("/")
        } else {
          message.error(res.data.message)
        }
      })
      .catch((error) => {
        message.error("Login error :" + error)
      })
  }

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
          initialValues={{
            ["email"]: "test10@gmail.com",
            ["password"]: "test10",
          }}
        >
          <h3 className="text-center">Login</h3>
          <Form.Item label="Email" name="email">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="text" required />
          </Form.Item>
          <Link to="/register" className="m-2 text-decoration-none">
            Don't have an account?
          </Link>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Login
