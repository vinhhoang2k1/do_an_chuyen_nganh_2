import React from 'react'
import { useTranslation } from 'react-i18next'
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

import { setCredentials } from '@apps/slices/authSlice'
import { saveAccessToken } from '@utils/localStorage'
import { useAppDispatch } from '@apps/hooks'
import { useLoginMutation } from '@apps/services/loginApi'
import logo from '@images/5.jpeg'

import './style.scss'

interface PayloadInterface {
  email: string
  password: string
}

export default function LoginPage() {
  const { t: trans } = useTranslation()
  const appDispatch = useAppDispatch()
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate()

  const onFinish = async (values: PayloadInterface) => {
    try {
      const response = await loginMutation({ email: values.email, password: values.password });
      console.log('response:', response)

      if ('error' in response) {
        // handle error here
        console.error(response.error);
        return;
      }
      
      const token: string = response.data.accessToken;

      appDispatch(
        setCredentials({
          user: {
            email: values.email,
            password: values.password
          },
          access_token: token,
        }),
      )

      saveAccessToken(token)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <article id="login-page">
      <Row justify="center" className="w-100 mb-90">
        <Col span={8}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className="logo">
              <img src={logo} alt="" />
              <h2>Login your account</h2>
            </div>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: trans('emailErrorMessage') },
                { type: 'email', message: trans('emailErrorMessage') },
              ]}

            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={trans('email')}
              />

            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: trans('passwordErrorMessage') },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={trans('password')}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item className="text-center" noStyle>
              <Button className='login-btn' type="primary" htmlType="submit" block>
                <b>{trans('btnLogin')}</b>
              </Button>
            </Form.Item>

            <p>Chưa có tài khoản?</p>
            <a onClick={() => { navigate('/register') }}>Đăng ký</a>
          </Form>
        </Col>
      </Row>
    </article>
  )
}
