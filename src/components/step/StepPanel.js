import React, { useState } from "react";
import { Button, Steps, Flex, Col, Row,message } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { ButtonBack } from "../../components/button";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const StepPanel = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  function next() {
    // if(props.cuscode)
    // console.log(props.checkStep.cuscode)
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
  }

  function Checknext() {
    console.log(props)
    if (activeStep === 0) {
      if (props.dataStep.cuscode !== null) 
        next();
      else
      message.error("กรุณา เลือกลูกค้าก่อน.");
      
    }
  }

  function prev() {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
  }

  const onChange = (value) => {
    // console.log('onChange:', value);
    setActiveStep(value);
  };

  return (
    <>
      <div className="steps-action">
        <Row
          gutter={[{ xs: 32, sm: 32, md: 32, lg: 12, xl: 12 }, 8]}
          className="m-0"
        >
          <Col span={12} className="p-0">
            <Flex gap={4} justify="start">
              <ButtonBack target={props.backtarget} />
            </Flex>
          </Col>
          <Col span={12} style={{ paddingInline: 0 }}>
            <Flex gap={4} justify="end">
              {activeStep > 0 && (
                <Button
                  style={{ width: 120 }}
                  icon={<ArrowLeftOutlined />}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
              {activeStep < props.steps.length - 1 && (
                <Button
                  type="primary"
                  style={{ width: 120 }}
                  icon={<ArrowRightOutlined />}
                  onClick={() => Checknext()}
                >
                  Next
                </Button>
              )}
              {activeStep === props.steps.length - 1 && (
                // <Button type="primary" htmlType="submit" >
                //   Submit
                // </Button>
                <Button
                  className="bn-center justify-center"
                  icon={<SaveFilled style={{ fontSize: "1rem" }} />}
                  type="primary"
                  style={{ width: "9.5rem" }}
                  htmlType="submit"
                >
                  Save
                </Button>
              )}
            </Flex>
          </Col>
        </Row>
      </div>
      <br></br>
      <Steps current={activeStep} onChange={onChange}>
        {props.steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <br></br>
      {props.steps.map((item) => (
        <div
          className={`steps-content ${
            item.step !== activeStep + 1 && "hidden"
          }`}
        >
          {item.content}
        </div>
      ))}
    </>
  );
};

export { StepPanel };
