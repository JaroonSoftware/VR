import React, { useState, useEffect } from "react";

import {
  Card,
  message,
  Row,
  Col,
  Divider,
  Spin,
  Table,
  Typography,
} from "antd";

import { customersColumn } from "./form-customers.model.js";
import OptionService from "../../../service/Options.service.js";

const opservice = OptionService();

export default function FormCustomers({values1}) {
  const [customersData, setCustomersData] = useState([]);
  const [customersDataWrap, setCustomersDataWrap] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cusCode, setCusCode] = useState(null);
  const [cusName, setCusName] = useState(null);

  useEffect(() => {
    search();
    // console.log("modal-customers");
  }, []);

  /** handle logic component */
  const handleChoose = (value) => {
    // console.log(value.cuscode);    
    
    setCusCode(value.cuscode);
    setCusName(value.cusname);
    
    const ininteial_value = {
      cuscode: value.cuscode,
      cusname: value.cusname,
    };
    values1(ininteial_value);
    
  };

  /** setting initial component */
  const search = () => {
    setLoading(true);
    opservice
      .optionsCustomer()
      .then((res) => {
        let { data } = res.data;
        setCustomersData(data);
        setCustomersDataWrap(data);
      })
      .catch((err) => {
        console.warn(err);
        const data = err?.response?.data;
        message.error(data?.message || "error request");
        // setLoading(false);
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 400)
      );
  };

  const column = customersColumn({ handleChoose });
  return (
    <>
      <Spin spinning={loading}>
        <Card>
          <Row className="m-0" gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Divider orientation="left" className="!mb-3 !mt-1">
                {" "}
                ข้อมูลลูกค้า{" "}
              </Divider>
            </Col>
            <Card style={{ minHeight: "60vh" }}>
              <Card>
                <Row className="m-0" gutter={[12, 12]}>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Typography.Title level={3} className="m-0">
                      รหัสลูกค้า :{cusCode}
                    </Typography.Title>
                  </Col>
                  <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Typography.Title level={3} className="m-0">
                      ชื่อลูกค้า : {cusName}
                    </Typography.Title>
                  </Col>
                </Row>
                {/* <div >
                  <i
                    class="fas fa-file-invoice-dollar"
                  ></i>
                </div>
                <div>
                  <div class="list-box">
                    <h5 id="list-title" class="m-0 ">
                      หมายเลขใบขาย <span id="spansocode"></span>
                    </h5>
                    <p id="list-total" class="m-0" style="font-size:11px;">
                      &nbsp;
                    </p>
                    <p id="list-price" class="m-0" style="font-size:11px;">
                      &nbsp;
                    </p>
                    <p id="list-sdate" class="m-0" style="font-size:11px;">
                      &nbsp;
                    </p>
                  </div>
                </div> */}
              </Card>
              <Divider></Divider>
              <Table
                bordered
                dataSource={customersDataWrap}
                columns={column}
                rowKey="cuscode"
                pagination={{
                  total: customersDataWrap.length,
                  showTotal: (_, range) =>
                    `${range[0]}-${range[1]} of ${customersData.length} items`,
                  defaultPageSize: 25,
                  pageSizeOptions: [25, 35, 50, 100],
                }}
                scroll={{ x: "max-content", y: 400 }}
                size="small"
              />
            </Card>
          </Row>
        </Card>
      </Spin>
    </>
  );
}
