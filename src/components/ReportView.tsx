import React, { useState } from "react";
import { Typography, List, Input, Image } from "antd";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { questions } from "../constants/form-questions";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

type ReportViewProps = {
  form: TFormData;
};

const ReportView: React.FC<ReportViewProps> = ({ form }) => {
  const [notes, setNotes] = useState(
    "This is a placeholder that is meant to simulate patient notes. This is a placeholder that is meant to simulate patient notes. This is a placeholder that is meant to simulate patient notes. This is a placeholder that is meant to simulate patient notes. This is a placeholder that is meant to simulate patient notes. This is a placeholder that is meant to simulate patient notes."
  );
  const [preview, setPreview] = useState(false);

  const keys = Object.keys(form);
  const values = Object.values(form);

  const avoidance =
    form.question_0 +
    form.question_1 +
    form.question_2 +
    form.question_3 +
    form.question_4;
  const intrusions = form.question_5 + form.question_6;
  const cognition =
    form.question_7 +
    form.question_8 +
    form.question_9 +
    form.question_10 +
    form.question_11 +
    form.question_12 +
    form.question_13;
  const hypervigilance =
    form.question_14 +
    form.question_15 +
    form.question_16 +
    form.question_17 +
    form.question_18 +
    form.question_19;

  const chartData = [
    {
      category: "avoidance",
      cur: avoidance,
      prev: 6,
      fullMark: 20,
    },
    {
      category: "intrusions",
      cur: intrusions,
      prev: 4,
      fullMark: 8,
    },
    {
      category: "cognition",
      cur: cognition,
      prev: 19,
      fullMark: 28,
    },
    {
      category: "hypervigilance",
      cur: hypervigilance,
      prev: 9,
      fullMark: 24,
    },
  ];

  return (
    <>
      <Title level={2}>
        {form.first_name} {form.last_name}
      </Title>
      <Title style={{ color: "rgb(62.4%, 62.4%, 62.4%)" }} level={4}>
        {form.patient_id}
      </Title>
      <TextArea
        rows={4}
        style={{ borderRadius: 0 }}
        contentEditable
        value={notes}
        onChange={(e) => setNotes(e.currentTarget.value)}
      />
      <div
        style={{
          width: "auto",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          preview={{ visible: false }}
          width={200}
          src="https://thumbs.dreamstime.com/z/senior-doctor-laughing-to-camera-16276713.jpg"
          onClick={() => setPreview(true)}
        />
        <div style={{ display: "none" }}>
          <Image.PreviewGroup
            preview={{
              visible: preview,
              onVisibleChange: (vis) => setPreview(vis),
            }}
          >
            <Image src="https://thumbs.dreamstime.com/z/senior-doctor-laughing-to-camera-16276713.jpg" />
            <Image src="https://www.publicdomainpictures.net/pictures/210000/nahled/doctor-1490804731WQI.jpg" />
            <Image src="https://en.pimg.jp/018/206/992/1/18206992.jpg" />
          </Image.PreviewGroup>
        </div>
        <ResponsiveContainer width={400} height={250}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <Radar
              name="Current"
              dataKey="cur"
              stroke="#f99000"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Previous"
              dataKey="prev"
              stroke="rgb(62.4%, 62.4%, 62.4%)"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
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
