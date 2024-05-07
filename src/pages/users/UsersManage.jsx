/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Collapse, Form, Input, Button, Flex, message, Radio } from "antd";
import { Row, Col, Space } from "antd";

import { CaretRightOutlined, SaveFilled } from  "@ant-design/icons";

import { ButtonBack } from '../../components/button'; 

import { useLocation, useNavigate } from 'react-router';
// import OptionService from '../../service/Options.service';
import UserService from '../../service/User.service'; 

const userService = UserService();
// const opservice = OptionService();
const from = "/users"
const CustomersManage = () => {
    const navigate = useNavigate(); 
    const location = useLocation(); 

    const [formDetail, setFormDetail] = useState({});
    const { config } = location.state || {config:null};
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
              navigate(from, {replace:true});
            })
            .catch((err) => {
              console.warn(err);
              const data = err?.response?.data;
              message.error(data?.message || "error request");
            });
        });
      };

      const getsupData = (v) => {
        userService.get(v)
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
          })
      };

    const panelStyle = {
      marginBottom: 24,
      borderRadius: 8,
      border: '1px solid #d9d9d9',
    //   backgroundColor: '#fff', 
    };

    const Detail = () => (
        <Row gutter={[8,8]} className='px-2 sm:px-4 md:px-4 lg:px-4'>
            <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                <Form.Item label='Username' name='username' rules={[ { required: true, message: "Please enter data!", } ]}>
                    <Input placeholder='Enter Username' className='!bg-zinc-300' readOnly />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20} >
                <Form.Item label='Password' name='password' rules={[ { required: true, message: "Please enter data!", } ]}>
                    <Input placeholder='Enter Password' />
                </Form.Item> 
            </Col> 
            <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10} >
                <Form.Item label='ชื่อจริง' name='firstname' rules={[ { required: true, message: "Please enter data!", } ]}>
                    <Input placeholder='Enter Firstname.' />
                </Form.Item> 
            </Col> 
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10} >
                <Form.Item label='นามสกุล' name='lastname' >
                    <Input placeholder='Enter Lastname.' />
                </Form.Item> 
            </Col>   
            <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4} >
                <Form.Item label='สถานะ' name='status'>
                    <Radio.Group  buttonStyle="solid" >
                        <Radio.Button value="Y">Enable</Radio.Button>
                        <Radio.Button value="N">Disable</Radio.Button> 
                    </Radio.Group>
                </Form.Item> 
            </Col> 
            <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10} >
                <Form.Item label='เบอร์โทรศัพท์' name='tel'>
                    <Input placeholder='Enter Tel.' />
                </Form.Item> 
            </Col> 
        </Row>
    );


    const getItems = ( style )=>{
        return [
            {
              key: '1',
              label: 'Detail',
              children: <>{<Detail />}</>,
              style: style,
            },
        ]
    };

    const SectionTop = (
        <Row gutter={[{xs:32, sm:32, md:32, lg:12, xl:12}, 8]} className='m-0'>
            <Col span={12} className='p-0'>
                <Flex gap={4} justify='start'>
                    <ButtonBack target={from} /> 
                </Flex>
            </Col> 
        </Row>         
    );

    const SectionBottom = (
        <Row gutter={[{xs:32, sm:32, md:32, lg:12, xl:12}, 8]} className='m-0'>
            <Col span={12} className='p-0'>
                <Flex gap={4} justify='start'>
                    <ButtonBack target={from} />
                </Flex>
            </Col>
            <Col span={12} style={{paddingInline:0}}>
                <Flex gap={4} justify='end'>
                    <Button 
                    icon={<SaveFilled style={{fontSize:'1rem'}} />} 
                    type='primary' style={{ width:'9.5rem' }} 
                    onClick={()=>{ handleConfirm() }} 
                    >Save</Button>
                </Flex>
            </Col>
        </Row>         
    );


    return (
        <div className='customer-manage xs:px-0 sm:px-0 md:px-8 lg:px-8'>
            <Space direction='vertical' className='flex gap-2' >
                {SectionTop}
                <Form form={form} layout="vertical" >
                    <Collapse 
                        defaultActiveKey={['1','2', '3', '4']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{ backgroundColor:'#ffffff00'}}
                        items={getItems(panelStyle)}
                    />
                </Form>
                {SectionBottom}           
            </Space>
        </div>
    );
}

export default CustomersManage;
