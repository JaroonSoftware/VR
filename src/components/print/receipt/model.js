import { Typography } from "antd";
import { comma } from "../../../utils/util";

export const column = [
  {
    title: (
      <>
        ลำดับ
        <br />
        Items No.
      </>
    ),
    key: "index",
    align: "center",
    width: "5%",
    onCell: () => ({
        style: {
          borderLeft: "1px solid var(---color--1)",
        },
      }),
    render: (_, record, idx) => (
      record.code !== 0 ? (
        <Typography.Text className="tx-info">{idx + 1}</Typography.Text>
      ) : (
        <Typography.Text>&nbsp;</Typography.Text>
      )      
    ),
  },
  {
    title: "รายการสินค้า",
    align: "left",
    key: "stname",
    dataIndex: "stname",    
    render: (_, record, ind) => (      
       record.code !== 0 ? (
        <Typography.Text className="tx-info">
            {ind + 1}. {record?.stname}
          </Typography.Text>
      ) : (
        <Typography.Text></Typography.Text>
      )            
    ),
  },
  {
    title: (
      <>
        จำนวน
        <br />
        Quantity
      </>
    ),
    align: "right",
    key: "qty",
    dataIndex: "qty",
    width: 60,
    render: (v, record) => (
      record.code !== 0 ? (
        <Typography.Text className="tx-info">{comma(Number(v))}</Typography.Text>
      ) : (
        <Typography.Text></Typography.Text>
      )      
      
    ),
  },
  {
    title: (
      <>
        หน่วย
        <br />
        Unit
      </>
    ),
    align: "right",
    width: 60,
    key: "unit",
    dataIndex: "unit",
  },
  {
    title: (
      <>
        ราคา/หน่วย
        <br />
        Unit Price
      </>
    ),
    align: "right",
    width: 120,
    key: "price",
    dataIndex: "price",
    render: (v, record) => (
      record.code !== 0 ? (
        <Typography.Text className="tx-info">{comma(Number(v))}</Typography.Text>
      ) : (
        <Typography.Text></Typography.Text>
      )      
      
    ),
  },  
  {
    title: (
      <>
        จำนวนเงิน
        <br />
        Amount
      </>
    ),
    align: "right",
    width: 100,
    key: "amount",
    dataIndex: "amount",
    onCell: () => ({
      style: {
        borderRight: "1px solid var(---color--1)",
      },
    }),
    render: (_, record) => (
      record.code !== 0 ? (
        <Typography.Text className="tx-info">
        {comma(Number(record.price * record.qty), 2, 2)}
      </Typography.Text>
      ) : (
        <Typography.Text></Typography.Text>
      )      
      
    ),
  },
];
