/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Collapse, Form, Input, Button, Flex, message, Select } from "antd";
import { Row, Col, Space, Badge } from "antd";

import { CaretRightOutlined, SaveFilled } from "@ant-design/icons";

import { ButtonBack } from "../../components/button";
import { ModalResetPassword } from "../../components/modal/users/modal-reset";

import { useLocation, useNavigate } from "react-router";
// import OptionService from '../../service/Options.service';
import UserService from "../../service/User.service";

const userService = UserService();
// const opservice = OptionService();
const from = "/users";
const UsersManage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openResetModal, setOpenResetModal] = useState(false);
  const [formDetail, setFormDetail] = useState({});
  const { config } = location.state || { config: null };
  const [form] = Form.useForm();
  // const [packageTypeOption, setPackageTypeOption] = useState([]);

  useEffect(() => {
    // setLoading(true);
    if (config?.action !== "create") {
      getsupData(config.code);
    }

    return () => {
      form.resetFields();
    };
  }, []);

  const handleConfirm = () => {
    form.validateFields().then((v) => {
      const parm = { ...formDetail, ...v };
      const actions =
        config?.action !== "create"
          ? userService.update(parm)
          : userService.create(parm);
      actions
        .then(async (r) => {
          message.success("Request success.");
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.warn(err);
          const data = err?.response?.data;
          message.error(data?.message || "error request");
        });
    });
  };

  const getsupData = (v) => {
    userService
      .get(v)
      .then(async (res) => {
        const { data } = res.data;

        const init = {
          ...data,
        };

        setFormDetail(init);
        form.setFieldsValue({ ...init });
      })
      .catch((err) => {
        console.log(err);
        message.error("Error getting infomation Product.");
      });
  };

  const handleResetSubmit = (v) => {
    // setSpData( state => ({...state, ...v}) );
    // estservice.spcost( v?.spcode || "").then( r => {
    //   const { data: {spcost} } = r.data;
    //   setSpCostData(spcost);
    //   handleEstimateSampleCost(spcost);
    // }).catch( err => {
    //   setChoosed(false);
    //   message.error("Getting sample fail.")
    //   console.warn(err);
    // });
  };

  const panelStyle = {
    marginBottom: 24,
    borderRadius: 8,
    border: "1px solid #d9d9d9",
    //   backgroundColor: '#fff',
  };

  const Detail = () => (
    <>
      <Row gutter={[8, 8]} className="px-2 sm:px-4 md:px-4 lg:px-4">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "กรุณาใส่ชื่อผู้ใช้!" }]}
            label="Username"
          >
            <Input
              disabled={config.action === "edit"}
              size="small"
              placeholder="Username"
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={
            config.action === "create"
              ? { display: "inline" }
              : { display: "none" }
          }
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: config.action === "create",
                message: "กรุณาใส่รหัสผ่าน!",
              },
            ]}
            label="Password"
          >
            <Input.Password
              disabled={config.action === "edit"}
              size="small"
              placeholder="Password"
              style={{ height: 40 }}
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          style={
            config.action === "edit"
              ? { display: "inline" }
              : { display: "none" }
          }
        >
          <Form.Item
            rules={[{ required: true, message: "กรุณาใส่รหัสผ่าน!" }]}
            label="Password"
          >
            <Input.Password
              disabled={config.action === "edit"}
              size="small"
              defaultValue="12345678"
              style={{ height: 40 }}
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={4}
          lg={4}
          xl={4}
          style={
            config.action === "edit"
              ? { display: "inline" }
              : { display: "none" }
          }
        >
          <Form.Item label="รีเซ็ต Password">
            <Button
              style={{ width: 100 }}
              onClick={() => {
                setOpenResetModal(true);
              }}
            >
              Reset
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="firstname"
            rules={[{ required: true, message: "กรุณาใส่ชื่อจริง!" }]}
            label="ชื่อจริง"
          >
            <Input placeholder="ชื่อจริง" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "กรุณาใส่ชื่อนามสกุล!" }]}
            label="นามสกุล"
          >
            <Input placeholder="นามสกุล" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="type"
            rules={[{ required: true, message: "กรุณาระบุประเภท!" }]}
            label="ตำแหน่ง"
          >
            <Select
              style={{ height: 40 }}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "พนักงานขาย", label: "พนักงานขาย" },
                { value: "ธุรการ", label: "ธุรการ" },
                { value: "จัดซื้อ", label: "จัดซื้อ" },
                { value: "ช่าง", label: "ช่าง" },
                { value: "กรรมการ", label: "กรรมการ" },
                { value: "ผู้จัดการสาขา", label: "ผู้จัดการสาขา" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item name="tel" label="เบอร์โทรศัพท์">
            <Input placeholder="เบอร์โทรศัพท์" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item name="email" label="อีเมล">
            <Input placeholder="อีเมล" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}
          style={
            config.action === "edit"
              ? { display: "inline" }
              : { display: "none" }
          }
        >
          <Form.Item label="สถานการใช้งาน" name="active_status">
            <Select
              size="large"
              options={[
                {
                  value: "Y",
                  label: <Badge status="success" text="เปิดการใช้งาน" />,
                },
                {
                  value: "N",
                  label: <Badge status="error" text="ปิดการใช้งาน" />,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col style={{ display: "none" }}>
          {/* <Col> */}
          <Form.Item name="code" label="รหัส">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const getItems = (style) => {
    return [
      {
        key: "1",
        label: "Detail",
        children: <>{<Detail />}</>,
        style: style,
      },
    ];
  };

  const SectionTop = (
    <Row
      gutter={[{ xs: 32, sm: 32, md: 32, lg: 12, xl: 12 }, 8]}
      className="m-0"
    >
      <Col span={12} className="p-0">
        <Flex gap={4} justify="start">
          <ButtonBack target={from} />
        </Flex>
      </Col>
    </Row>
  );

  const SectionBottom = (
    <Row
      gutter={[{ xs: 32, sm: 32, md: 32, lg: 12, xl: 12 }, 8]}
      className="m-0"
    >
      <Col span={12} className="p-0">
        <Flex gap={4} justify="start">
          <ButtonBack target={from} />
        </Flex>
      </Col>
      <Col span={12} style={{ paddingInline: 0 }}>
        <Flex gap={4} justify="end">
          <Button
            icon={<SaveFilled style={{ fontSize: "1rem" }} />}
            type="primary"
            style={{ width: "9.5rem" }}
            onClick={() => {
              handleConfirm();
            }}
          >
            Save
          </Button>
        </Flex>
      </Col>
    </Row>
  );

  return (
    <div className="customer-manage xs:px-0 sm:px-0 md:px-8 lg:px-8">
      <Space direction="vertical" className="flex gap-2">
        {SectionTop}
        <Form form={form} layout="vertical">
          <Collapse
            defaultActiveKey={["1", "2", "3", "4"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ backgroundColor: "#ffffff00" }}
            items={getItems(panelStyle)}
          />
        </Form>
        {SectionBottom}
      </Space>
      {openResetModal && (
        <ModalResetPassword
          show={openResetModal}
          close={() => setOpenResetModal(false)}
          values={handleResetSubmit}
        />
      )}
    </div>
  );
};

export default UsersManage;
