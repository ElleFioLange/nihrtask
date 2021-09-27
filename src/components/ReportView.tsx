import React from "react";
import { Typography, List } from "antd";
import { questions } from "../constants/form-questions";

const { Title, Paragraph } = Typography;

type ReportViewProps = {
  form: TFormData;
};

const ReportView: React.FC<ReportViewProps> = ({ form }) => {
  const keys = Object.keys(form);
  const values = Object.values(form);
  return (
    <>
      <Title level={2}>
        {form.first_name} {form.last_name}
      </Title>
      <Title style={{ color: "rgb(62.4%, 62.4%, 62.4%)" }} level={4}>
        {form.patient_id}
      </Title>
      <List bordered>
        {questions.map((question, idx) => (
          <List.Item>
            <Paragraph>{question}</Paragraph>
            {/* This is hacky I know, but it's the easiest way to iterate
            over the values since the form returns each one under its own key. */}
            <Paragraph>{values[keys.indexOf(`question_${idx}`)]}</Paragraph>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default ReportView;
