import {
  BellOutlined,
  InboxOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  RocketOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAppDispatch } from '@apps/hooks'
import { logout } from '@apps/slices/authSlice'
import logoSystem from '@images/5.jpeg'
import avatar from '@images/avatar-17.jpeg'
import { getMenuItem } from '@utils/helperFuntions'
import {
  readMenuOpenKeys,
  saveAccessToken,
  saveMenuOpenKeys,
} from '@utils/localStorage'
import { Layout, Menu, MenuProps, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider, Content } = Layout

interface AppLayout {
  children: JSX.Element
}

const items: MenuProps['items'] = [
  getMenuItem('Trang chủ', '/', <RocketOutlined />, [
    getMenuItem('Trang con', 'home_page_1'),
    getMenuItem('Option 5', 'home_page_2'),
  ]),
  getMenuItem('Quản lý người dùng', '/user', <RocketOutlined />, [
    getMenuItem('Tạo người dùng', '/user/create'),
    getMenuItem('Danh sách người dùng', '/user/list'),
  ]),
  getMenuItem('Quản lý tàu', '/train', <RocketOutlined />, [
    getMenuItem('Tạo mới tàu', '/train/create'),
    getMenuItem('Danh sách tàu', '/train/list'),
  ]),
  getMenuItem('Quản lý nhà ga', '/station', <RocketOutlined />, [
    getMenuItem('Tạo mới nhà ga', '/station/create'),
    getMenuItem('Danh sách nhà ga', '/station/list'),
  ]),
  getMenuItem('Quản lý lịch trình tàu', '/ship-schedule', <RocketOutlined />, [
    getMenuItem('Danh sách lịch trình tàu', '/ship-schedule/list'),
    getMenuItem('Tạo mới lịch trình tàu', '/ship-schedule/create'),
  ]),
]

export default function AppLayout({ children }: AppLayout) {
  const appDispatch = useAppDispatch()
  const getLocation = useLocation()
  const [current, setCurrent] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    setCurrent(getLocation.pathname)
  }, [getLocation])

  const [openKeys, setOpenKeys] = useState<string[]>(readMenuOpenKeys())
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.keyPath.length > 1) {
      setOpenKeys(e.keyPath.slice(-1))
      saveMenuOpenKeys(e.keyPath.slice(-1))
      console.log(e);
      navigate(e.key)
    } else {
      setOpenKeys([])
      saveMenuOpenKeys('')
    }
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys)
    saveMenuOpenKeys(keys)
  }

  const handleLogout = () => {
    appDispatch(logout())
    saveAccessToken('')
  }

  return (
    <Layout id="app-layout">
      <div className="header">
        <div className="wrap-content">
          <div className="box-left" onClick={() => navigate('/')}>
            <img src={logoSystem} alt="" className="logo" />
            <h2 className="name-system">Stephenson</h2>
          </div>
          <div className="box-center">
            <div className="menu-icon">
              <MenuFoldOutlined className="icon-in-header" />
            </div>
            <div className="doc-screen__title">Trang chủ</div>
          </div>
          <div className="box-right">
            <div className="notify">
              <BellOutlined className="icon-in-header" />
            </div>
            <div className="inbox">
              <InboxOutlined className="icon-in-header" />
            </div>
            <div className="profile">
              <Popover
                placement="leftBottom"
                content={
                  <div>
                    <p>
                      <UserOutlined />
                      <span style={{ marginLeft: '10px' }}>Tài khoản</span>
                    </p>
                    <p style={{ marginBottom: '0' }} onClick={handleLogout}>
                      <LoginOutlined />
                      <span style={{ marginLeft: '10px' }}>Đăng xuất</span>
                    </p>
                  </div>
                }
                trigger="click"
                style={{}}
              >
                <img src={avatar} alt="" />
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <Sider trigger={null} width={350}>
        <Menu
          onClick={onClick}
          selectedKeys={current ? [current] : []}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          <div className="app-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
