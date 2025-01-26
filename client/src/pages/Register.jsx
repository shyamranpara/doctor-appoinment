import React from "react"
import "../styles/RegisterStyles.css"
import { Form, Input, Button, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
  const navigate = useNavigate()
  const onfinishHandler = async (values) => {
    console.log(values)
    try {
      const res = await axios.post("/api/v1/user/register", values)
      console.log(res)
      if (res.data.success) {
        message.success(res.data.message)
        navigate("/login")
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      message.error("register error :", error)
    }
  }

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="text" required />
          </Form.Item>
          <Link to="/login" className="m-2 text-decoration-none">
            Already have an account?
          </Link>
          <Button htmlType="submit" className="btn btn-primary" type="primary">
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Register
