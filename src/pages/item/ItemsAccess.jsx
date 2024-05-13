/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, message } from 'antd';
import { Collapse, Form, Flex, Row, Col, Space } from 'antd';
import { Input, Button, Table, Typography } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { MdGroupAdd } from "react-icons/md";
import { accessColumn } from "./items.model";

// import dayjs from 'dayjs';
import Itemservice from '../../service/Items.Service'; 

const ctmService = {...Itemservice};
const mngConfig = {title:"", textOk:null, textCancel:null, action:"create", code:null};
const ItemsAccess = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm(); 
    const [accessData, setAccessData] = useState([]);
    const [activeSearch, setActiveSearch] = useState([]);

    const handleSearch = () => {
        form.validateFields().then( v => {
            const data = {...v}; 
            ctmService.getAllitem(data).then( res => {
                const {data} = res;

                setAccessData(data);
            }).catch( err => {
                console.log(err);
                message.error("Request error!");
            });

        });

    }

    const handleClear = () => {
        form.resetFields();
        
        handleSearch()
    }


    const hangleAdd = () => {
        navigate("manage/create", { state: { config: {...mngConfig, title:"สร้าง Delivery Note", action:"create"} }, replace:true })
    }

    const handleEdit = (data) => {
        // setManageConfig({...manageConfig, title:"แก้ไข Sample Request", action:"edit", code:data?.srcode});
        navigate("manage/edit", { state: { config: {...mngConfig, title:"แก้ไข Delivery Note", action:"edit", code:data?.cuscode} }, replace:true } );
    }; 
      
    const handleView = (data) => {
        const newWindow = window.open('', '_blank');
        newWindow.location.href = `/dln-print/${data.dncode}`;
    };    

    const handleDelete = (data) => { 
        // startLoading();
        // ctmService.deleted(data?.dncode).then( _ => {
        //     const tmp = accessData.filter( d => d.dncode !== data?.dncode );

        //     setAccessData([...tmp]); 
        // })
        // .catch(err => {
        //     console.log(err);
        //     message.error("Request error!");
        // });
    };      
            
    useEffect( () => { 
        // ctmService.getAllitem().then( res => {
        //     const {data} = res;

        //     setAccessData(data);
        // }).catch( err => {
        //     console.log(err);
        //     message.error("Request error!");
        // });
    }, []);

    const FormSearch = (
        <Collapse 
            size="small"
            onChange={(e) => { setActiveSearch(e) }}
            activeKey={activeSearch}
            items={[
                { 
                    key: '1', 
                    label: <><SearchOutlined /><span> Search</span></>, 
                    children: (
                        <> 
                            <Form form={form} layout="vertical" autoComplete="off">
                                <Row gutter={[8,8]}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label='item Code.' name='cuscode'>
                                            <Input placeholder='Enter item Code.' />
                                        </Form.Item>                            
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label='item Name.' name='cusname'>
                                            <Input placeholder='Enter Sitem Name.' />
                                        </Form.Item>                            
                                    </Col> 
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label='Countires.' name='country'>
                                            <Input placeholder='Enter Countires.' />
                                        </Form.Item>                            
                                    </Col>
                                </Row> 
                                <Row gutter={[8,8]}>
                                    <Col xs={24} sm={8} md={12} lg={12} xl={12}>
                                        {/* Ignore */}
                                    </Col>
                                    <Col xs={24} sm={8} md={12} lg={12} xl={12}>
                                        <Flex justify='flex-end' gap={8}>
                                            <Button type="primary" size='small' className='bn-action' icon={<SearchOutlined />} onClick={()=>handleSearch()} >
                                                Search
                                            </Button>
                                            <Button type="primary" size='small' className='bn-action' danger icon={<ClearOutlined />} onClick={()=>handleClear()}>
                                                Clear
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Row>
                            </Form> 
                        </>
                    ),
                    showArrow: false, 
                }
            ]}
            // bordered={false}
        />         
    );
    const column = accessColumn( {handleEdit, handleDelete, handleView });

    const TitleTable = (
        <Flex className='width-100' align='center'>
            <Col span={12} className='p-0'>
                <Flex gap={4} justify='start' align='center'>
                  <Typography.Title className='m-0 !text-zinc-800' level={3}>List of Items</Typography.Title>
                </Flex>
            </Col>
            <Col span={12} style={{paddingInline:0}}>
                <Flex gap={4} justify='end'>
                      <Button  
                      size='small' 
                      className='bn-action bn-center bn-primary-outline justify-center'  
                      icon={<MdGroupAdd style={{fontSize:'.9rem'}} />} 
                      onClick={() => { hangleAdd() } } >
                          Create Items
                      </Button>
                </Flex>
            </Col>  
        </Flex>
    );    
    return (
    <div className='item-access'>
        <Space direction="vertical" size="middle" style={{ display: 'flex', position: 'relative' }} >
            {FormSearch}
            <Card>
                <Row gutter={[8,8]} className='m-0'>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Table title={()=>TitleTable} size='small' rowKey="cuscode" columns={column} dataSource={accessData} />
                    </Col>
                </Row>         
            </Card>
        </Space>
    </div>
    );
}

export default ItemsAccess;