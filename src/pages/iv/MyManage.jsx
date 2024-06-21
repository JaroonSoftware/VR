/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Typography,
  message,
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Space,
} from "antd";

import OptionService from "../../service/Options.service";
import InvoiceService from "../../service/Invoice.service";
import {
  SearchOutlined,
  SolutionOutlined,
  FileSearchOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import FormQuotation from "../../components/form/quotation/FormQuotation";
import FormCustomers from "../../components/form/customers/FormCustomers";

import {
  quotationForm,
  checkStepForm,
  columnsParametersEditable,
  componentsEditable,
} from "./model";
import { StepPanel } from "../../components/step/StepPanel";
import { ModalItems } from "../../components/modal/items/modal-items";
import dayjs from "dayjs";
import { delay, comma } from "../../utils/util";
import { useLocation, useNavigate } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";
import { LuPackageSearch } from "react-icons/lu";
const opservice = OptionService();
const ivservice = InvoiceService();

const gotoFrom = "/iv";

function InvoiceManage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { config } = location.state || { config: null };
  const [form] = Form.useForm();

  /** Modal handle */
  const [openProduct, setOpenProduct] = useState(false);

  /** Quotation state */
  const [invoiceCode, setInvoiceCode] = useState(null);

  /** Detail Data State */
  const [listDetail, setListDetail] = useState([]);
  const [checkStep, setCheckStep] = useState(checkStepForm);

  const [formDetail, setFormDetail] = useState(quotationForm);

  const [unitOption, setUnitOption] = React.useState([]);

  const cardStyle = {
    backgroundColor: "#f0f0f0",
    height: "calc(100% - (25.4px + 1rem))",
  };

  useEffect(() => {
    const initial = async () => {
      if (config?.action !== "create") {
        const res = await ivservice
          .get(config?.code)
          .catch((error) => message.error("get Invoice data fail."));
        const {
          data: { header, detail },
        } = res.data;
        const { qtcode, qtdate } = header;
        
        setFormDetail(header);
        setListDetail(detail);
        setInvoiceCode(qtcode);
        form.setFieldsValue({ ...header, qtdate: dayjs(qtdate) });

        // setTimeout( () => {  handleCalculatePrice(head?.valid_price_until, head?.dated_price_until) }, 200);
        // handleChoosedCustomer(head);
      } else {
        const { data: code } = (
          await ivservice.code().catch((e) => {
            message.error("get Invoice code fail.");
          })
        ).data;
        setInvoiceCode(code);
        form.setFieldValue("vat", 7);
        const ininteial_value = {
          ...formDetail,
          ivcode: code,
          ivdate: dayjs(new Date()),
        };
        setFormDetail(ininteial_value);
        form.setFieldsValue(ininteial_value);
      }
      const [unitOprionRes] = await Promise.all([
        opservice.optionsUnit({ p: "unit-option" }),
      ]);
      // console.log(unitOprionRes.data.data)
      setUnitOption(unitOprionRes.data.data);
    };

    initial();
    return () => {};
  }, []);

  useEffect(() => {
    if (listDetail) handleSummaryPrice();
  }, [listDetail]);

  const handleSummaryPrice = () => {
    const newData = [...listDetail];

    const total_price = newData.reduce(
      (a, v) =>
        (a +=
          Number(v.qty || 0) *
          Number(v?.price || 0) *
          (1 - Number(v?.discount || 0) / 100)),
      0
    );
    const vat = form.getFieldValue("vat");
    const grand_total_price =
      total_price + (total_price * form.getFieldValue("vat")) / 100;

    setFormDetail(() => ({
      ...formDetail,
      total_price,
      vat,
      grand_total_price,
    }));
    // console.log(formDetail)
  };

  const handleCalculatePrice = (day, date) => {
    const newDateAfterAdding = dayjs(date || new Date()).add(
      Number(day),
      "day"
    );
    const nDateFormet = newDateAfterAdding.format("YYYY-MM-DD");

    setFormDetail((state) => ({ ...state, dated_price_until: nDateFormet }));
    form.setFieldValue("dated_price_until", nDateFormet);
  };

  const handleQuotDate = (e) => {
    const { valid_price_until } = form.getFieldsValue();
    if (!!valid_price_until && !!e) {
      handleCalculatePrice(valid_price_until || 0, e || new Date());
    }
  };

  /** Function modal handle */

  const handleItemsChoosed = (value) => {
    // console.log(value);
    setListDetail(value);
    handleSummaryPrice();
  };

  const handleNextStep = (vales) => {
    // console.log(val);
    const ininteial_value = {
      ...checkStep,
      ...vales,
    };
    setCheckStep(ininteial_value);
    // console.log(checkStep);
    
  };

  const handleConfirm = () => {
    form
      .validateFields()
      .then((v) => {
        if (listDetail.length < 1) throw new Error("กรุณาเพิ่ม รายการขาย");

        const header = {
          ...formDetail,
          remark: form.getFieldValue("remark"),
        };
        const detail = listDetail;

        const parm = { header, detail };
        // console.log(parm)
        const actions =
          config?.action !== "create" ? ivservice.update : ivservice.create;
        actions(parm)
          .then((r) => {
            handleClose().then((r) => {
              message.success("Request Quotation success.");
            });
          })
          .catch((err) => {
            message.error("Request Quotation fail.");
            console.warn(err);
          });
      })
      .catch((err) => {
        Modal.error({
          title: "This is an error message",
          content: "Please enter require data",
        });
      });
  };

  const handleClose = async () => {
    navigate(gotoFrom, { replace: true });
    await delay(300);
    console.clear();
  };

  const handleDelete = (code) => {
    const itemDetail = [...listDetail];
    const newData = itemDetail.filter((item) => item?.stcode !== code);
    setListDetail([...newData]);
  };

  const handleRemove = (record) => {
    const itemDetail = [...listDetail];
    return itemDetail.length >= 1 ? (
      <Button
        className="bt-icon"
        size="small"
        danger
        icon={
          <RiDeleteBin5Line style={{ fontSize: "1rem", marginTop: "3px" }} />
        }
        onClick={() => handleDelete(record?.stcode)}
        disabled={!record?.stcode}
      />
    ) : null;
  };

  const handleEditCell = (row) => {
    const newData = (r) => {
      const itemDetail = [...listDetail];
      const newData = [...itemDetail];

      const ind = newData.findIndex((item) => r?.stcode === item?.stcode);
      if (ind < 0) return itemDetail;
      const item = newData[ind];
      newData.splice(ind, 1, {
        ...item,
        ...row,
      });

      handleSummaryPrice();
      return newData;
    };
    setListDetail([...newData(row)]);
  };

  /** setting column table */
  const prodcolumns = columnsParametersEditable(handleEditCell, unitOption, {
    handleRemove,
  });

  const SectionCustomer = (
    <>
      <Space size="small" direction="vertical" className="flex gap-2">
        <Row gutter={[8, 8]} className="m-0">
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="cuscode"
              htmlFor="cuscode-1"
              label="รหัสลูกค้า"
              className="!mb-1"
              rules={[{ required: true, message: "Missing Loading type" }]}
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  readOnly
                  placeholder="เลือก ลูกค้า"
                  id="cuscode-1"
                  value={formDetail.cuscode}
                  className="!bg-white"
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ minWidth: 40 }}
                ></Button>
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              name="qtcode"
              htmlFor="qtcode-1"
              label="เลขที่ใบเสนอราคา"
              className="!mb-1"
              rules={[{ required: true, message: "Missing Loading type" }]}
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  readOnly
                  placeholder="เลือก ใบเสนอราคา"
                  id="qtcode-1"
                  value={formDetail.qtcode}
                  className="!bg-white"
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ minWidth: 40 }}
                ></Button>
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="cusname" label="ชื่อลุกค้า" className="!mb-1">
              <Input placeholder="Customer Name." readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="address" label="ที่อยู่" className="!mb-1">
              <Input placeholder="Customer Address." readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="contact" label="ติดต่อ" className="!mb-1">
              <Input placeholder="Customer Contact." readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="tel" label="เบอร์โทรศัพท์" className="!mb-1">
              <Input placeholder="Customer Tel." readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </>
  );

  const TitleTable = (
    <Flex className="width-100" align="center">
      <Col span={12} className="p-0">
        <Flex gap={4} justify="start" align="center">
          <Typography.Title className="m-0 !text-zinc-800" level={3}>
            รายการสินค้า
          </Typography.Title>
        </Flex>
      </Col>
      <Col span={12} style={{ paddingInline: 0 }}>
        <Flex justify="end">
          <Button
            icon={<LuPackageSearch style={{ fontSize: "1.2rem" }} />}
            className="bn-center justify-center bn-primary-outline"
            onClick={() => {
              setOpenProduct(true);
            }}
          >
            Choose Product
          </Button>
        </Flex>
      </Col>
    </Flex>
  );

  const SectionProduct = (
    <>
      <Flex className="width-100" vertical gap={4}>
        <Table
          title={() => TitleTable}
          components={componentsEditable}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={listDetail}
          columns={prodcolumns}
          pagination={false}
          rowKey="stcode"
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: <span>No data available, please add ivme data.</span>,
          }}
          summary={(record) => {
            return (
              <>
                {listDetail.length > 0 && (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={0}
                        colSpan={5}
                      ></Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={4}
                        align="end"
                        className="!pe-4"
                      >
                        Total
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        className="!pe-4 text-end border-right-0"
                        style={{ borderRigth: "0px ivlid" }}
                      >
                        <Typography.Text type="danger">
                          {comma(Number(formDetail?.total_price || 0))}
                        </Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>Baht</Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={0}
                        colSpan={4}
                      ></Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={4}
                        align="end"
                        className="!pe-4"
                      >
                        Vat
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        className="!pe-4 text-end border-right-0"
                        style={{ borderRigth: "0px ivlid" }}
                      >
                        <Form.Item name="vat" className="!m-0">
                          <InputNumber
                            className="width-100 input-30 text-end"
                            addonAfter="%"
                            controls={false}
                            min={0}
                            onFocus={(e) => {
                              e.target.select();
                            }}
                            onChange={() => {
                              handleSummaryPrice();
                            }}
                          />
                        </Form.Item>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        className="!pe-4 text-end border-right-0"
                        style={{ borderRigth: "0px ivlid" }}
                      >
                        <Typography.Text type="danger">
                          {comma(
                            Number(
                              (formDetail.total_price * formDetail?.vat) / 100
                            )
                          )}
                        </Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>Baht</Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={0}
                        colSpan={5}
                      ></Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={4}
                        align="end"
                        className="!pe-4"
                      >
                        Grand Total
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        className="!pe-4 text-end border-right-0"
                        style={{ borderRigth: "0px ivlid" }}
                      >
                        <Typography.Text type="danger">
                          {comma(Number(formDetail?.grand_total_price || 0))}
                        </Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>Baht</Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                )}
              </>
            );
          }}
        />
      </Flex>
    </>
  );

  const SectionOther = (
    <>
      <Space size="small" direction="vertical" className="flex gap-2">
        <Row gutter={[8, 8]} className="m-0">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item className="" name="remark" label="Remark">
              <Input.TextArea placeholder="Enter Remark" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </>
  );

  const FormStepCustomer = () => {
    return (
      <>
        <br></br>
        <FormCustomers  
        values1={(v) => {
          // console.log(v)
        handleNextStep(v);
      }}
      />
      </>
    );
  };

  const FormStepQuotation = () => {
    return (
      <>
        <br></br>
        <FormQuotation />
      </>
    );
  };

  const FormStepInvoice = () => {
    return (
      <>
        <br></br>
        <Card
          title={
            <>
              <Row className="m-0 py-3 sm:py-0" gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Typography.Title level={3} className="m-0">
                    รหัสใบวางบิล : {invoiceCode}
                  </Typography.Title>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Flex
                    gap={10}
                    align="center"
                    className="justify-start sm:justify-end"
                  >
                    <Typography.Title level={3} className="m-0">
                      วันที่ใบวางบิล :{" "}
                    </Typography.Title>
                    <Form.Item name="qtdate" className="!m-0">
                      <DatePicker
                        className="input-40"
                        allowClear={false}
                        onChange={handleQuotDate}
                      />
                    </Form.Item>
                  </Flex>
                </Col>
              </Row>
            </>
          }
        >
          <Row className="m-0" gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Divider orientation="left" className="!mb-3 !mt-1">
                {" "}
                ข้อมูลลูกค้า{" "}
              </Divider>
              <Card style={cardStyle}>{SectionCustomer}</Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Divider orientation="left" className="!my-0">
                รายการสินค้าใบวางบิล
              </Divider>
              <Card style={{ backgroundColor: "#f0f0f0" }}>
                {SectionProduct}
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Divider orientation="left" className="!mb-3 !mt-1">
                {" "}
                ข้อมูลเพิ่มเติม{" "}
              </Divider>
              <Card style={cardStyle}>{SectionOther}</Card>
            </Col>
          </Row>
        </Card>
      </>
    );
  };

  const steps = [
    {
      step: 1,
      title: "เลือกลูกค้า",
      icon: <SolutionOutlined />,
      content: <FormStepCustomer />,
    },
    {
      step: 2,
      icon: <FileSearchOutlined />,
      title: "เลือกใบเสนอราคา",
      content: <FormStepQuotation />,
    },
    {
      step: 3,
      icon: <FileAddOutlined />,
      title: "สร้างใบวางบิล/ใบกำกับภาษี",
      content: <FormStepInvoice />,
    },
  ];
  const setTest = () => {
    alert(checkStep);
    console.log(checkStep)
  };

  return (
    <div className="quotation-manage">
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={() => setTest()}
        style={{ minWidth: 40 }}
      >Test</Button>
      <div id="quotation-manage" className="px-0 sm:px-0 md:px-8 lg:px-8">
        <Space direction="vertical" className="flex gap-4">
          <br></br>
          <Form
            form={form}
            layout="vertical"
            className="width-100"
            autoComplete="off"
            onFinish={() => {
              handleConfirm();
            }}
          >
            <StepPanel
              steps={steps}
              backtarget={gotoFrom}
              dataStep={checkStep}
            />
          </Form>
        </Space>
      </div>

      {openProduct && (
        <ModalItems
          show={openProduct}
          close={() => setOpenProduct(false)}
          values={(v) => {
            handleItemsChoosed(v);
          }}
          selected={listDetail}
        ></ModalItems>
      )}
    </div>
  );
}

export default InvoiceManage;
