import { Flex, Typography } from "antd";
import "../../../assets/styles/banks.css"
const Link = Typography.Link;
export const bankListColumn = ({handleChoose}) => [
  {
    title: "No.",
    key: "id",
    dataIndex: "id",
    align: "left", 
    vertical: "middle",
    width:60,
    render: (v, record) => <Link className="text-select" onClick={()=>handleChoose(record)}>{v}</Link>
  },
  {
    title: "Bank",
    key: "bank",
    dataIndex: "bank",
    align: "left",  
    render: (_,record) => (<>
      <Flex align='center' gap={8}>
      <Link className="text-select" onClick={()=>handleChoose(record)}>
          <i className={`bank bank-${record.bank} shadow huge`} style={{height:24, width:24, marginTop: 4}}></i>
          <Flex align='start' gap={1} vertical>
              <Typography.Text ellipsis style={{ fontSize: 13 }}>{record.bank_name_th}</Typography.Text> 
              <Typography.Text ellipsis style={{ fontSize: 9, color:'#8c8386' }}>{record.bank_name}</Typography.Text> 
          </Flex>
          </Link>
      </Flex>
    </>)
  },
  {
    title: "Account Number",
    key: "account_number",
    dataIndex: "account_number",
    align: "left", 
    width:140,
  },
  {
    title: "Account Name",
    key: "account_name",
    dataIndex: "account_name",
    align: "left", 
    width:'28%',
  },
];