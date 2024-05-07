import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';
import { Collapse, Form, Flex, Row, Col, Space } from 'antd';
import { Input, Button, Table, message, DatePicker, Typography } from 'antd';
import { SearchOutlined, ClearOutlined, FileAddOutlined } from '@ant-design/icons'; 
import { accessColumn } from "./quotation.model";

import dayjs from 'dayjs';
import QuotationService from '../../service/Quotation.service';

import { delay } from '../../utils/util';

const quotService = QuotationService(); 
const mngConfig = {title:"", textOk:null, textCancel:null, action:"create", code:null};

const RangePicker = DatePicker.RangePicker;
const QuotationAccess = () => {
    const navigate = useNavigate();
    
    const [form] = Form.useForm();

    const [accessData, setAccessData] = useState([]);
    const [activeSearch, setActiveSearch] = useState([]);

    const [mounted, setMounted] = useState(false);
 
    
    const CollapseItemSearch = (
        <>  
        <Row gutter={[8,8]}> 
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label='รหัสใบเสนอราคา' name='quotcode'>
                    <Input placeholder='ใส่รหัสใบเสนอราคา' />
                </Form.Item>                            
            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label='วันที่ใบเสนอราคา' name='quotdate'>
                    <RangePicker placeholder={['จากวันที่', 'ถึงวันที่']} style={{width:'100%', height:40}}  />
                </Form.Item>                            
            </Col> 
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label='ร้องขอโดย' name='created_by'>
                    <Input placeholder='ใส่ ชื่อ-นามสกุล ผู้ร้องขอ' />
                </Form.Item>
            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label='รหัสลูกค้า' name='cuscode'>
                    <Input placeholder='ใส่รหัสลูกค้า' />
                </Form.Item>                            
            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                <Form.Item label='ชื่อลูกค้า' name='cusname'>
                    <Input placeholder='ใส่ชื่อลูกค้า' />
                </Form.Item>                            
            </Col>
        </Row>
        <Row gutter={[8,8]}>
          <Col xs={24} sm={8} md={12} lg={12} xl={12}>
              {/* Ignore */}
          </Col>
          <Col xs={24} sm={8} md={12} lg={12} xl={12}>
              <Flex justify='flex-end' gap={8}>
                  <Button type="primary" size='small' className='bn-action' icon={<SearchOutlined />} onClick={() => handleSearch()}>
                     ค้นหา
                  </Button>
                  <Button type="primary" size='small' className='bn-action' danger icon={<ClearOutlined />} onClick={() => handleClear()}>
                      ล้าง
                  </Button>
              </Flex>
          </Col>
        </Row> 
        </>
    )

    const FormSearch = (
        <Collapse 
        size="small"                    
        onChange={(e) => { setActiveSearch(e) }}
        activeKey={activeSearch} 
        items={[
        { 
            key: '1', 
            label: <><SearchOutlined /><span> ค้นหา</span></>,  
            children: <>{CollapseItemSearch}</>,
            showArrow: false, 
        } 
        ]}
        // bordered={false}
        />         
    );

    const handleSearch = () => {
        form.validateFields().then( v => {
            const data = {...v}; 
            if( !!data?.quotdate ) {
                const arr = data?.quotdate.map( m => dayjs(m).format("YYYY-MM-DD") )
                const [quotdate_form, quotdate_to] = arr; 
                //data.created_date = arr
                Object.assign(data, {quotdate_form, quotdate_to});
            }

            getData(data);
        }).catch( err => {
            console.warn(err);
        })
    }

    const handleClear = () => {
        form.resetFields();
        
        handleSearch()
    }
    // console.log(form);
    const hangleAdd = () => {  
        navigate("manage/create", { state: { config: {...mngConfig, title:"Create Quotation", action:"create"} } }); 
    }

    const handleEdit = (data) => {
        // setManageConfig({...manageConfig, title:"แก้ไข Sample Request", action:"edit", code:data?.srcode});
        navigate("manage/edit", { state: { config: {...mngConfig, title:"Edit Quotation", action:"edit", code:data?.quotcode} }, replace:true } );
    }; 

    const handleDelete = (data) => { 
        // startLoading();
        quotService.deleted(data?.quotcode).then( _ => {
            const tmp = accessData.filter( d => d.quotcode !== data?.quotcode );

            setAccessData([...tmp]); 
        })
        .catch(err => {
            console.log(err);
            message.error("Request error!");
        });
    }; 

    const handlePrint = (recode) => {
        const newWindow = window.open('', '_blank');
        newWindow.location.href = `/quo-print/${recode.quotcode}`;
      };
    

    const column = accessColumn( {handleEdit, handleDelete, handlePrint });

    const getData = (data) => {
        quotService.search(data).then( res => {
            const {data} = res.data;

            setAccessData(data);
        }).catch( err => {
            console.log(err);
            message.error("Request error!");
        });
    }

    const init = async () => {
        
    }
            
    useEffect( () => {
        init();

        getData({});  


        setMounted( true );
        return  async () => { 
            await delay(400);
            setMounted( false );
            //console.clear();
        }
    }, []);
    const TitleTable = (
        <Flex className='width-100' align='center'>
            <Col span={12} className='p-0'>
                <Flex gap={4} justify='start' align='center'>
                  <Typography.Title className='m-0 !text-zinc-800' level={3}>รายการใบเสนอราคา</Typography.Title>
                </Flex>
            </Col>
            <Col span={12} style={{paddingInline:0}}>
                <Flex gap={4} justify='end'>
                      <Button  
                      size='small' 
                      className='bn-action bn-center bn-primary-outline justify-center'  
                      icon={<FileAddOutlined  style={{fontSize:'.9rem'}} />} 
                      onClick={() => { hangleAdd() } } >
                          เพิ่มใบเสนอราคา
                      </Button>
                </Flex>
            </Col>  
        </Flex>
    );    
    return mounted && (
    <div className='quotation-access' id="area">
        <Space direction="vertical" size="middle" style={{ display: 'flex', position: 'relative' }} >
            <Form form={form} layout="vertical" autoComplete="off">
                {FormSearch}
            </Form> 
            <Card>
                <Row gutter={[8,8]} className='m-0'>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Table 
                        title={()=>TitleTable} 
                        size='small' 
                        rowKey="quotcode" 
                        columns={column} 
                        dataSource={accessData} 
                        scroll={{ x: 'max-content' }} 
                        />
                    </Col>
                </Row>         
            </Card>
        </Space>
    </div>
    );
}

export default QuotationAccess;