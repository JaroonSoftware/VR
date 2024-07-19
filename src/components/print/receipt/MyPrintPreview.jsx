/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
// import ReactDOMServer from "react-dom/server";
import { useReactToPrint } from "react-to-print";

import "./index.css";
import logo from "../../../assets/images/logo_nsf.png";
import thaiBahtText from "thai-baht-text";
import ReceiptService from "../../../service/Receipt.service";
import {
  Button,
  Flex,
  Table,
  Typography,
  message,
  Checkbox,
  Row,
  Col,
} from "antd";
import { column } from "./model";

import dayjs from "dayjs";
import { comma } from "../../../utils/util";
import { PiPrinterFill } from "react-icons/pi";

const receiptservice = ReceiptService();

function ReceiptPrintPreview() {
  const { code } = useParams();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => handleBeforePrint(),
    onAfterPrint: () => handleAfterPrint(),
    removeAfterPrint: true,
  });

  const [hData, setSpData] = useState({});
  const [details, setDetails] = useState([]);
  const topic = [
    "ต้นฉบับใบเสร็จรับเงิน",
    "สำเนาใบเสร็จรับเงิน",
    "ต้นฉบับใบกำกับภาษี",
    "สำเนาใบกำกับภาษี",
    "ต้นฉบับใบส่งสินค้า",
    "สำเนาใบส่งสินค้า",
    "ใบตรวจสอบสินค้า",
  ];
  const suptopic = [
    "ต้นฉบับ - วางบิล",
    "สำเนา - บัญชี",
    "ต้นฉบับ - ลูกค้า",
    "สำเนา - ลูกค้า",
    "ต้นฉบับ - วางบิล",
    "ต้นฉบับ - วางบิล",
    "ตรวจสอบสินค้า",
  ];

  const supcolor = [
    "#FFF",
    "#FFFF00",
    "#00B050",
    "#DA9694",
    "#0070C0",
    "#8064A2",
    "#F79646",
  ];

  const topiccolor = [
    "#000",
    "#000",
    "#000",
    "#000",
    "#000",
    "#FFF",
    "#FFF",
  ];  

  const columnDesc = column;

  const handleAfterPrint = () => {
    // setNewPageContent([]);
  };
  const handleBeforePrint = (e) => {
    console.log("before printing...");
  };

  useEffect(() => {
    const init = () => {
      receiptservice
        .getprint(code)
        .then(async (res) => {
          const {
            data: { header, detail },
          } = res.data;

          setSpData(header);
          for (let i = detail.length; i < 11; i++) {
            // let data = {code:0}
            detail.push({ code: 0 });
            // console.log(detail)
          }
          setDetails(detail);
        })
        .catch((err) => {
          console.log(err);
          message.error("Error getting infomation Estimation.");
        });
    };

    init();
    return () => {};
  }, []);

  const HeaderForm = ({ index }) => {
    return (
      <div className="print-head" style={{ height: 90 }}>
        <div className="print-title flex gap-5">
          <div className="grow">
            <img
              src={logo}
              alt=""
              style={{ paddingInline: 10, height: "100%" }}
            />
          </div>
          <div
            className="flex grow-0 justify-end items-center"
            style={{ width: 278 }}
          >
            <Flex className="mb-0 ">
              <Typography.Title
                level={3}
                align="end"
                className="m-0 min-w-28 text-end"
              >
                {topic[index]}
              </Typography.Title>
            </Flex>
          </div>
        </div>
      </div>
    );
  };

  const ContentHead = ({i}) => {
    return (
      <div className="content-head in-sample flex flex-col">
        <div className="print-title flex pb-2">
          <div className="flex ps-3 grow-0" style={{ width: 600 }}>
            <Flex className="mb-1.5" vertical>
              <Typography.Text className="tx-title min-w-48 weight600" strong>
                บริษัท วีระ ไดรคัทติ้ง จำกัด
              </Typography.Text>
              <Typography.Text className="tx-info" strong>
                VEERA DRYCUTTING CO., LTD
              </Typography.Text>
              <Typography.Text className="tx-info">
                102 หมู่ 1 ถนนโพธิ์พระยาท่าเรือ ตำบลบางนา
              </Typography.Text>
              <Typography.Text className="tx-info">
                อำเภอมหาราช จังหวัดพระนครศรีอยุธยา 13150
              </Typography.Text>
              <Typography.Text className="tx-info">
                โทร. 081-948-3963 E-mail :gtopgta@gmail.com
              </Typography.Text>
              <Typography.Text className="tx-info">
                เลขประจำตัวผู้เสียภาษี 0145546001142 (สำนักงานใหญ่)
              </Typography.Text>
            </Flex>
          </div>
          <div className="flex ps-3 grow">
            <Flex className="mb-1.5" vertical>
              {/* <Typography.Text className='tx-title min-w-48' strong>Info</Typography.Text> */}
              <Flex justify="space-between">
                <Typography.Text className="tx-info" strong>
                  เลขที่
                </Typography.Text>
                <Typography.Text className="tx-info">
                  &nbsp; {hData?.recode}
                </Typography.Text>
              </Flex>
              <Flex justify="space-between">
                <Typography.Text className="tx-info" strong>
                  วันที่
                </Typography.Text>
                <Typography.Text className="tx-info">
                  {dayjs(hData?.redate).format("DD/MM/YYYY")}
                </Typography.Text>
              </Flex>
              <br />
              <Flex justify="space-between">
                <Typography.Text
                  className="tx-info w-full bg-amber-400"
                  align="center"
                  style={{
                    backgroundColor: `${supcolor[i]}`,
                    color: `${topiccolor[i]}`,                    
                    // className={`bank bank-${v.key} shadow huge`}
                  }}
                >
                  {suptopic[i]}
                </Typography.Text>
              </Flex>
              <Flex justify="space-between">
                <Typography.Text className="tx-info">
                  เอกสารออกเป็นชุด
                </Typography.Text>
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
    );
  };

  const ContentHead2 = () => {
    return (
      <div className="content-head in-sample flex flex-col">
        <div className="print-title flex pb-2">
          <div
            className="flex ps-3 grow-0"
            style={{
              height: 90,
              border: "1px solid var(---color--1)",
              padding: "8px",
            }}
          >
            <Flex className="mb-1.5" vertical>
              <Typography.Text className="tx-info">
                ชื่อลูกค้า : {hData?.prename} {hData?.cusname}
              </Typography.Text>
              <Typography.Text className="tx-info">
                เลขประจำตัวผู้เสียภาษี : {hData?.taxnumber}
              </Typography.Text>
              <Typography.Text className="tx-info">
                ที่อยู่ : {hData?.taxnumber}
                {hData?.idno} {hData?.road} {hData?.subdistrict}{" "}
                {hData?.district} {hData?.zipcode}
              </Typography.Text>
              <Typography.Text className="tx-info">
                สาขา :{" "}
                {hData?.business_branch === "สำนักงานใหญ่"
                  ? hData?.business_branch
                  : hData?.branch_details}
              </Typography.Text>
            </Flex>
          </div>
        </div>
      </div>
    );
  };

  const ContentBankCheck = () => {
    return (
      <>
        <Row>
          <Col xs={14} sm={14} md={14} lg={14}>
            {hData.payment_type !== "เงินสด" ? (
              <Checkbox defaultChecked />
            ) : (
              <Checkbox />
            )}
            &nbsp;เช็คธนาคาร &nbsp;&nbsp;
            {hData.payment_type !== "เงินสด" ? (
              hData.thai_name
            ) : (
              <Typography.Text>.....................</Typography.Text>
            )}{" "}
          </Col>
          <Col xs={10} sm={10} md={10} lg={10}>
            สาขา &nbsp;&nbsp;&nbsp;
            {hData.payment_type !== "เงินสด" ? (
              hData.branch
            ) : (
              <Typography.Text>.....................</Typography.Text>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={14} sm={14} md={14} lg={14}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เลขที่{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {hData.payment_type !== "เงินสด" ? (
              hData.check_no
            ) : (
              <Typography.Text>.......................</Typography.Text>
            )}
          </Col>
          <Col xs={10} sm={10} md={10} lg={10}>
            ลงวันที่{" "}
            {hData.payment_type !== "เงินสด" ? (
              dayjs(hData?.check_date).format("DD/MM/YYYY")
            ) : (
              <Typography.Text>.....................</Typography.Text>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={14} sm={14} md={14} lg={14}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;จำนวนเงิน &nbsp;&nbsp;&nbsp;
            {hData.payment_type !== "เงินสด" ? (
              comma(Number(hData?.check_amount || 0), 2, 2)
            ) : (
              <Typography.Text>.....................</Typography.Text>
            )}
            &nbsp; บาท
          </Col>
        </Row>
      </>
    );
  };

  const ContentRemark = () => {
    return (
      <>
        <Typography.Text style={{ fontSize: "11px" }}>
          สินค้าดังกล่าวแม้จะส่งมอบแก่ผู้ซื้อแล้ว ยังเป็นทรัพย์สินของบริษัทฯ
          จนกว่าผู้ซื้อจะชำระเงินเสร็จเรียบร้อยแล้ว
        </Typography.Text>
        <br></br>
        <Typography.Text style={{ fontSize: "11px" }}>
          หากไม่ชำระเงินภายในกำหนด ท่านจะต้องชำระค่าเสียหายแก่บริษัทฯ
          เพิ่มร้อยละ 1.5 ต่อเดือน นับแต่วันผิดนัด
        </Typography.Text>
      </>
    );
  };

  const ContentMoney = () => {
    return (
      <>
        <Table.Summary.Row className="r-sum">
          <Table.Summary.Cell
            colSpan={4}
            className="text-summary text-start !align-top"
          >
            <Typography.Text italic className="text-end">
              โปรดสั่งจ่ายเช็คขีดคร่อมในนาม&nbsp;
            </Typography.Text>
            <Typography.Text strong className="text-end">
              "บริษัท วีระ ไดรคัทติ้ง จำกัด"
            </Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell
            // colSpan={2}
            className="text-summary text-start !align-top"
          >
            <Typography.Text className="text-sm text-end">
              ภาษีมูลค่าเพิ่ม {comma(Number(hData?.vat || 0))}%
            </Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell className="text-summary text-end !align-top">
            <Typography.Text className="text-sm text-end">
              {comma(Number((hData?.vat * hData?.total_price) / 100 || 0))}
            </Typography.Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>

        <Table.Summary.Row className="r-sum">
          <Table.Summary.Cell
            colSpan={4}
            rowSpan={2}
            className="text-summary text-start !align-top"
          >
            {/* {i < 2 ? <ContentBankCheck /> : <ContentRemark />} */}
            <ContentBankCheck />
          </Table.Summary.Cell>
          <Table.Summary.Cell className="text-summary text-start !align-top">
            <Typography.Text className="text-sm text-end">
              รวมเงินทั้งสิ้น
            </Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell className="text-summary text-end !align-top">
            <Typography.Text className="text-sm text-end">
              {comma(Number(hData?.grand_total_price || 0), 2, 2)}
            </Typography.Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row className="r-sum rl">
          <Table.Summary.Cell
            colSpan={2}
            rowSpan={2}
            className="text-summary text-center !align-top"
          >
            <Typography.Text className="text-sm text-end">
              <br></br>
              ในนาม
              <br></br>
              บริษัท วีระ ไดรคัทติ้ง จำกัด
            </Typography.Text>
            <Flex className="w-full" justify="center" gap={32}>
              <Flex vertical className="w-3/4" style={{ gap: 10 }}>
                <Typography.Text className="tx-info" justify="center" strong>
                  <br />
                  <br />
                  <br />
                  .........................................
                </Typography.Text>
                <Flex justify="center" gap={2}>
                  <Typography.Text
                    className="tx-info"
                    strong
                    style={{ minWidth: 36 }}
                  >
                    ผู้มีอำนาจลงนาม
                  </Typography.Text>
                  <Typography.Text className="tx-info" strong>
                    {"\u00A0"}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row className="r-sum rl">
          <Table.Summary.Cell
            colSpan={4}
            className="text-summary text-start !align-top"
            style={{
              margin: "0px",
              padding: "0px",
              border: "1px solid var(---color--1)",
            }}
          >
            {hData.payment_type === "เงินสด" ? (
              <Checkbox defaultChecked />
            ) : (
              <Checkbox />
            )}
            <Typography.Text className="text-sm text-end">
              &nbsp; เงินสด
            </Typography.Text>
            <br></br>
            <Flex className="w-full" justify="center" gap={32}>
              <Flex vertical className="w-1/2" style={{ gap: 10 }}>
                <Flex justify="center" gap={2}>
                  <Typography.Text className="tx-info" strong>
                    <br />
                    <br />
                    <br />
                    ..............................................
                  </Typography.Text>
                </Flex>
                <Flex justify="center" gap={2}>
                  <Typography.Text
                    className="tx-info"
                    strong
                    style={{ minWidth: 36 }}
                  >
                    ผู้รับเงิน{" "}
                  </Typography.Text>
                  <Typography.Text className="tx-info" strong>
                    {"\u00A0"}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  const ContentSignature = () => {
    return (
      <>
        <Table.Summary.Row className="r-sum">
          <Table.Summary.Cell
            colSpan={4}
            rowSpan={2}
            className="text-summary text-start !align-top"
          >
            <ContentRemark />
          </Table.Summary.Cell>
          <Table.Summary.Cell
            // colSpan={2}
            className="text-summary text-start !align-top"
          >
            <Typography.Text className="text-sm text-end">
              ภาษีมูลค่าเพิ่ม {comma(Number(hData?.vat || 0))}%
            </Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell className="text-summary text-end !align-top">
            <Typography.Text className="text-sm text-end">
              {comma(Number((hData?.vat * hData?.total_price) / 100 || 0))}
            </Typography.Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row className="r-sum">
          <Table.Summary.Cell className="text-summary text-start !align-top">
            <Typography.Text className="text-sm text-end">
              รวมเงินทั้งสิ้น
            </Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell className="text-summary text-end !align-top">
            <Typography.Text className="text-sm text-end">
              {comma(Number(hData?.grand_total_price || 0), 2, 2)}
            </Typography.Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row className="r-sum m-0 p-0" style={{ border: "0px" }}>
          <Table.Summary.Cell
            colSpan={6}
            className="text-summary text-start !align-top m-0 p-0"
          >
            <Flex
              className="w-full h-full"
              justify="center"
              gap={0}
              align="center"
            >
              <Flex
                vertical
                align="center"
                className="w-full h-full"
                style={{ border: "1px solid var(---color--1)" }}
              >
                <Typography.Text className="tx-info mb-3" align="center" strong>
                  ได้รับสินค้าไว้ถูกต้อง
                  <br />
                  ตามรายการข้างต้น
                  <br />
                </Typography.Text>
                <Flex
                  className="w-full"
                  justify="center"
                  align="center"
                  style={{ gap: 10 }}
                >
                  <Flex vertical className="w-3/4" style={{ gap: 10 }}>
                    <Flex justify="center" gap={2}>
                      <Typography.Text
                        className="tx-info"
                        strong
                        style={{ minWidth: 36 }}
                      >
                        <br />
                        <br />
                        .................................
                      </Typography.Text>
                    </Flex>
                    <Flex justify="center" gap={2}>
                      <Typography.Text className="tx-info" strong>
                        ผู้รับสินค้า{" "}
                      </Typography.Text>
                      <Typography.Text className="tx-info" strong>
                        {"\u00A0"}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                vertical
                align="center"
                className="w-full h-full"
                style={{ border: "1px solid var(---color--1)" }}
              >
                <Typography.Text className="tx-info mb-3" strong>
                  สำหรับเจ้าหน้าที่
                  <br />
                  <br />
                </Typography.Text>
                <Flex
                  className="w-full"
                  justify="center"
                  align="center"
                  style={{ gap: 10 }}
                >
                  <Flex vertical className="w-3/4" style={{ gap: 10 }}>
                    <Flex justify="center" gap={2}>
                      <Typography.Text
                        className="tx-info"
                        strong
                        style={{ minWidth: 36 }}
                      >
                        <br />
                        <br />
                        .................................
                      </Typography.Text>
                    </Flex>
                    <Flex justify="center" gap={2}>
                      <Typography.Text className="tx-info" strong>
                        ผู้ส่งสินค้า{" "}
                      </Typography.Text>
                      <Typography.Text className="tx-info" strong>
                        {"\u00A0"}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                vertical
                align="center"
                className="w-full h-full"
                style={{ border: "1px solid var(---color--1)" }}
              >
                <Typography.Text className="tx-info mb-3" align="center" strong>
                  สำหรับเจ้าหน้าที่
                  <br />
                  <br />
                </Typography.Text>
                <Flex
                  className="w-full"
                  justify="center"
                  align="center"
                  style={{ gap: 10 }}
                >
                  <Flex vertical className="w-3/4" style={{ gap: 10 }}>
                    <Flex justify="center" gap={2}>
                      <Typography.Text
                        className="tx-info"
                        justify="center"
                        strong
                      >
                        <br />
                        <br />
                        .................................
                      </Typography.Text>
                    </Flex>
                    <Flex justify="center" gap={2}>
                      <Typography.Text className="tx-info" strong>
                        ผู้ตรวจนับสินค้า{" "}
                      </Typography.Text>
                      <Typography.Text className="tx-info" strong>
                        {"\u00A0"}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                vertical
                align="center"
                className="w-full h-full"
                style={{ border: "1px solid var(---color--1)" }}
              >
                <Typography.Text className="tx-info mb-3" align="center" strong>
                  ในนาม <br />
                  บริษัท วีระ ไดรคัทติ้ง จำกัด
                </Typography.Text>
                <Flex
                  className="w-full"
                  justify="center"
                  align="center"
                  style={{ gap: 10 }}
                >
                  <Flex vertical className="w-3/4" style={{ gap: 10 }}>
                    <Flex justify="center" gap={2}>
                      <Typography.Text
                        className="tx-info"
                        justify="center"
                        strong
                      >
                        <br />
                        <br />
                        .................................
                      </Typography.Text>
                    </Flex>
                    <Flex justify="center" gap={2}>
                      <Typography.Text className="tx-info" strong>
                        ผู้มีอำนาจลงนาม{" "}
                      </Typography.Text>
                      <Typography.Text className="tx-info" strong>
                        {"\u00A0"}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  const QuotationSummary = ({ i }) => {
    return (
      <>
        {/* <Table.Summary.Row style={{ height: 24 }}>
          <Table.Summary.Cell
            index={0}
            colSpan={4}
            className="!align-top"
          ></Table.Summary.Cell>
        </Table.Summary.Row> */}

        <Table.Summary.Row className="r-sum">
          <Table.Summary.Cell
            colSpan={4}
            className="text-summary text-center !align-top"
          >
            <Typography.Text className="text-end">
              ( {thaiBahtText(Number(hData?.grand_total_price || 0))} )
            </Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell
            // colSpan={2}
            className="text-summary text-start !align-top"
          >
            <Typography.Text className="text-sm text-end">
              รวมราคาสินค้า
            </Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell className="text-summary text-end !align-top">
            <Typography.Text className="text-sm text-end">
              {comma(Number(hData?.total_price || 0), 2, 2)}
            </Typography.Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        {i < 2 ? <ContentMoney /> : <ContentSignature />}
      </>
    );
  };

  const ContentBody = ({ i }) => {
    return (
      <div className="content-body in-sample flex flex-col">
        <Table
          size="small"
          dataSource={details}
          columns={columnDesc}
          pagination={false}
          rowKey="stcode"
          bordered={false}
          locale={{
            emptyText: <span>No data available, please add some data.</span>,
          }}
          onRow={(record, index) => {
            return { className: "r-sub" };
          }}
          // summary={QuotationSummary}
          summary={() => {
            return (
              <>
                <QuotationSummary i={i}></QuotationSummary>
              </>
            );
          }}
        />
      </div>
    );
  };

  const Pages = () => (
    <div ref={componentRef}>
      {topic.map((data, i) => {
        return (
          <div>
            <ContentData children={data} i={i}>
              <ContentHead i={i} />
              <ContentHead2 />
              <ContentBody i={i} />
            </ContentData>
          </div>
        );
      })}
    </div>
  );

  const ContentData = ({ children, i }) => {
    return (
      <div className="rec-pages flex flex-col">
        <HeaderForm index={i} />
        <div className="print-content grow">{children}</div>
      </div>
    );
  };

  return (
    <>
      <div className="page-show" id="rec">
        <div className="title-preview">
          <Button
            className="bn-center  bg-blue-400"
            onClick={() => {
              handlePrint(null, () => componentRef.current);
            }}
            icon={<PiPrinterFill style={{ fontSize: "1.1rem" }} />}
          >
            PRINT
          </Button>
        </div>
        <div className="layout-preview">
          <Pages />
        </div>
      </div>
    </>
  );
}

export default ReceiptPrintPreview;
