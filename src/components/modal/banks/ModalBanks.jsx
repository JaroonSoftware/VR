/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';

import { Modal, Card, Table, message, Form, Typography } from "antd";
import { Row, Col, Space, Spin } from "antd";
import { Input } from "antd";
import { BankTwoTone, SearchOutlined } from "@ant-design/icons";
import { useForm } from 'antd/es/form/Form';
 
import { bankListColumn } from "./modal-banks.model";

import ModalBanksManage from './ModalBanksManage';
// import OptionService from '../../../service/Options.service';
import BankService from '../../../service/Bank.service';
import "./modal-banks.css";
// const optionService = OptionService();
const bnkservice = BankService();
const mngConfig = {title:"", textOk:null, textCancel:null, action:"create", code:null};
export default function ModalBanks({show, close, values}) {
    const [form] = useForm();
    const inputRef = useRef(null);
    const [modalData, setModalData] = useState([]);
    const [modalDataWrap, setModalDataWrap] = useState([]);

    const [openModal,  setOpenModel] = useState(show);
    const [loading,  setLoading] = useState(true);

    const [openManage, setOpenManage] = useState(false)
    const [config, setConfig] = useState(mngConfig);
    // console.log( itemsTypeData )

    /** handle logic component */
    const handleClose = () =>{ 
        setTimeout( () => { close(false);  }, 140);
        
        //setTimeout( () => close(false), 200 );
    }

    // const handleConfirm = () => {
    //     // console.log(itemsList); 
    //     // values([...itemsList, ...selected]);
    //     // setItemsList([]);
    //     setOpenModel(false);
    // }

    const handleSearch = (value) => {  
        const input =  value?.toLowerCase();
        if(!!value){    
            const f = modalData.filter( d => {
                const text = ( 
                    d.account_number?.toLowerCase()?.includes(input) || 
                    d.bank_name?.toLowerCase()?.includes(input) || 
                    d.bank_name_th?.toLowerCase()?.includes(input) ||
                    d.account_name?.toLowerCase()?.includes(input)
                );
                return  text;
            });
            setModalDataWrap(f);
        }  else setModalDataWrap(modalData); 
    }

    const handleChoose = (value) => {
        values(value);
        setOpenModel(false);
    }


    /** setting initial component */ 
    const column = bankListColumn({handleChoose}); 
    const onload = () =>{
        setLoading(true);
        bnkservice.search({}, { ignoreLoading : true }).then(async (res) => {
            let { data } = res.data; 
            setModalData(data);
            setModalDataWrap(data);
            // console.log(selected) 
        })
        .catch((err) => { 
            message.error("Request error!");

            // setLoading(false);
        })
        .finally( () => setTimeout( () => { setLoading(false); }, 400));
    }  
    useEffect( () => {
      
        if( !!openModal ){
            onload(); 
            // console.log("modal-packages")        
        } 
    }, [openModal]);

    /** setting child component */
    const ButtonManageModal = (
        <Row gutter={[{xs:32, sm:32, md:32, lg:12, xl:12}, 8]} className='m-0'>
            <Col span={24}>
                <Typography.Link onClick={()=>{ 
                    setConfig({...mngConfig, title:"Create Bank", action:"create"})
                    setOpenManage(true); 
                }} className='ps-1'>
                    <span className='hover:underline underline-offset-1'>Create Bank master data.</span>
                </Typography.Link> 
            </Col>
        </Row>   
    )
    /** */

    return (
        <>
        <Modal
            open={openModal}
            title={<><BankTwoTone /><Typography.Text className='ms-1 mb-0'>Banks List</Typography.Text></>}
            afterClose={() => handleClose() }
            onCancel={() => setOpenModel(false) } 
            maskClosable={false}
            style={{ top: 20 }}
            width={800}
            className='modal-customers'
        >
            <Spin spinning={loading} >
                <Space direction="vertical" size="middle" style={{ display: 'flex', position: 'relative'}}  >
                    <Card style={{backgroundColor:'#f0f0f0' }}>
                        <Form form={form} layout="vertical" autoComplete="off" >
                            <Row gutter={[{xs:32, sm:32, md:32, lg:12, xl:12}, 8]} className='m-0'>
                                <Col span={24}>
                                    <Form.Item label="ค้นหา"  >
                                        <Input ref={inputRef} suffix={<SearchOutlined />} onChange={ (e) => { handleSearch(e.target.value) } } placeholder='ค้นหาชื่อ หรือ รหัส'/>
                                    </Form.Item>                        
                                </Col> 
                            </Row>
                            { ButtonManageModal }
                        </Form>
                    </Card>
                    <Card style={{minHeight:'60vh'}}>
                        <Table
                            // bordered={false}
                            dataSource={modalDataWrap}
                            columns={column}
                            rowKey="account_number"
                            pagination={{ 
                                total:modalDataWrap?.length || 0, 
                                showTotal:(_, range) => `${range[0]}-${range[1]} of ${modalDataWrap?.length || 0} items`,
                                defaultPageSize:25,
                                pageSizeOptions:[25,35,50,100]
                            }} 
                            size='small'
                        /> 
                    </Card>
                </Space>  
                { openManage && 
                    <ModalBanksManage 
                        config={config}
                        open={openManage} 
                        close={()=>setOpenManage(false)} 
                        complete={() => { onload(); setOpenManage(false); }} 
                    />
                }                  
            </Spin>
        </Modal>    
        </>
    )
}