import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Typography,
  Spin,
  Row,
  Col,
  Dropdown,
  Space,
  ConfigProvider,
  // theme,
} from "antd";
import { Authenticate } from "../../service/Authenticate.service";
const authService = Authenticate();
const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onLogout = () => {
    setLoading(true);
    setTimeout(() => {
      authService.removeToken();
      setLoading(false);
      navigate("/", { replace: true });
    }, 600);
  };
  const rightStyle = { position: "absolute", top: 0, right: 0 };
  const items = [
    {
      label: (
        <>
          <Typography.Link onClick={() => onLogout()}>
            <span>Log out</span>
          </Typography.Link>
        </>
      ),
      key: "0",
    },
  ];
  const [current, setCurrent] = useState("menu1");
  useEffect(() => {
    const users = authService.getUserInfo();
    setUserInfo(users);

    return () => {};
  }, []);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Layout>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#F7F9F9",
            colorText: "#F4D03F",
            colorBgContainer: "#212F3D",
          },
        }}
      >
        <div>
          <Spin spinning={loading}>
            <Row gutter={[24, 24]} style={{ height: 45 }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  style={{ paddingLeft: 20 }}
                >
                  <Menu.Item>
                    <MailOutlined /> สินค้า
                  </Menu.Item>
                  <Menu.Item>
                    <MailOutlined /> รถเข็น
                  </Menu.Item>
                  <Menu.Item style={rightStyle}>
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <Typography.Link onClick={(e) => e.preventDefault()}>
                        <Space className="gap-2">
                          <UserOutlined />

                          <span
                            style={{
                              letterSpacing: 0.7,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              paddingRight: 10,
                            }}
                          >
                            {userInfo?.firstname} {userInfo?.lastname}
                          </span>
                        </Space>
                      </Typography.Link>
                    </Dropdown>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Spin>
        </div>
      </ConfigProvider>
    </Layout>
  );
};
export default App;
