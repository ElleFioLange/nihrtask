import React, { FC } from "react";
import { Typography, Form, Radio, Button, Input } from "antd";
import { questions } from "../constants/form-questions";

const { Title, Paragraph } = Typography;

type FormViewProps = {
  onFinish: (values: TFormData) => Promise<boolean>;
  onFinishFailed: (errorInfo: any) => void;
};

const FormView: FC<FormViewProps> = ({ onFinish, onFinishFailed }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Title className="header" style={{ fontWeight: 700 }}>
        NIHR PTSD Checklist
      </Title>
      <Form
        form={form}
        className="form"
        name="ptsd-checklist"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={async (values) => {
          const successUploading = await onFinish(values);
          if (successUploading) form.resetFields();
        }}
        onFinishFailed={onFinishFailed}
      >
        <Paragraph>First name:</Paragraph>
        <Form.Item
          name="first_name"
          rules={[{ required: true, message: "Your first name is required" }]}
        >
          <Input />
        </Form.Item>
        <Paragraph>Last name:</Paragraph>
        <Form.Item
          name="last_name"
          rules={[{ required: true, message: "Your last name is required" }]}
        >
          <Input />
        </Form.Item>
        <Paragraph>ID:</Paragraph>
        <Form.Item
          name="patient_id"
          rules={[{ required: true, message: "Your ID is required" }]}
        >
          <Input />
        </Form.Item>
        {questions.map((question, idx) => (
          <React.Fragment key={idx}>
            <Paragraph>{question}</Paragraph>
            <Form.Item
              name={`question_${idx}`}
              rules={[{ required: true, message: "Question required" }]}
            >
              <Radio.Group>
                <Radio value={0}>0</Radio>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
              </Radio.Group>
            </Form.Item>
          </React.Fragment>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormView;
