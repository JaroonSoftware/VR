import { Flex, Typography } from "antd";
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
    // render: (_, record, idx) => <span key={record?.stcode}>{idx + 1}</span>,
    render: (_, record, idx) => (
      <Typography.Text className="tx-info">{idx + 1}</Typography.Text>
    ),
  },
  {
    title: "รายการสินค้า",
    align: "left",
    key: "stname",
    dataIndex: "stname",    
    render: (_, record, ind) => (
      <>
        <Flex vertical>
          <Typography.Text className="tx-info">
            {ind + 1}. {record?.stname}
          </Typography.Text>
          <Flex vertical>
            {/* {record?.quotations_list.map( (item, ix)=>(
                        <Flex key={ix} gap={6}>
                            <Typography.Text className="pl-4 tx-sub text-nowrap">{ind + 1}.{ix+1} {item?.detail_name}:</Typography.Text>
                            <Typography.Text className="tx-sub">{item?.detail_value}</Typography.Text> 
                        </Flex>
                    ))} */}
          </Flex>
        </Flex>
      </>
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
    width: 100,
    render: (v) => (
      <Typography.Text className="tx-info">{comma(Number(v))}</Typography.Text>
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
    width: 100,
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
    render: (v) => (
      <Typography.Text className="tx-info">{comma(Number(v))}</Typography.Text>
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
      <Typography.Text className="tx-info">
        {comma(Number(record.price * record.qty), 2, 2)}
      </Typography.Text>
    ),
  },
];
