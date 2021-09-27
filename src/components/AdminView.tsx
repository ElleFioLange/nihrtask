import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  selectAllForms,
  selectFormById,
  fetchForms,
} from "../redux/formsSlice";
import { List, Select, Button, Typography } from "antd";
import { ReloadOutlined, StepBackwardOutlined } from "@ant-design/icons";
import ReportView from "./ReportView";

const { Title } = Typography;

const AdminView = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector(selectAllForms);

  const formsStatus = useAppSelector((state) => state.status);
  const formsError = useAppSelector((state) => state.error);

  const [curFormId, setCurFormId] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const curForm = useAppSelector((state) => selectFormById(state, curFormId));

  useEffect(() => {
    if (formsStatus === "idle") {
      dispatch(fetchForms());
    }
  }, [formsStatus, dispatch]);

  if (curForm)
    return (
      <>
        <Title className="header" style={{ fontWeight: 700 }}>
          Form View
        </Title>
        <Button onClick={() => setCurFormId("")} style={{ marginBottom: 25 }}>
          <StepBackwardOutlined />
        </Button>
        <ReportView form={curForm} />
      </>
    );

  switch (formsStatus) {
    case "loading":
      return <span>Loading...</span>;
    case "succeeded":
      return (
        <>
          <Title className="header" style={{ fontWeight: 700 }}>
            Administrator View
          </Title>
          <Select
            style={{
              width: 100,
              marginRight: 25,
            }}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
          >
            <Select.Option value="date">Date</Select.Option>
            <Select.Option value="first_name">First Name</Select.Option>
            <Select.Option value="last_name">Last Name</Select.Option>
            <Select.Option value="patient_id">ID</Select.Option>
          </Select>
          <Button onClick={() => dispatch(fetchForms())}>
            <ReloadOutlined />
          </Button>
          <List style={{ marginTop: 25 }}>
            {forms
              .slice()
              .sort((a, b) => {
                switch (sortBy) {
                  case "date":
                    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
                  case "first_name":
                    return a.first_name > b.first_name ? 1 : -1;
                  case "last_name":
                    return a.last_name > b.last_name ? 1 : -1;
                  case "patient_id":
                    return a.patient_id > b.patient_id ? 1 : -1;
                  default:
                    return 0;
                }
              })
              .map((form) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setCurFormId(form.id)}
                      >{`${form.first_name} ${form.last_name}`}</span>
                    }
                    description={`${form.patient_id}`}
                  />
                </List.Item>
              ))}
          </List>
        </>
      );
    case "failed":
      return <div>{formsError}</div>;
    default:
      return <></>;
  }
};

export default AdminView;
