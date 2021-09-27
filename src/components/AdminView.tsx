import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectAllForms, fetchForms } from "../redux/formsSlice";
import { List, Select, Button } from "antd";
import { ReloadOutlined, StepBackwardOutlined } from "@ant-design/icons";

const AdminView = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector(selectAllForms);

  const formsStatus = useAppSelector((state) => state.status);
  const formsError = useAppSelector((state) => state.error);

  const [curForm, setCurForm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    if (formsStatus === "idle") {
      dispatch(fetchForms());
    }
  }, [formsStatus, dispatch]);

  if (curForm)
    return (
      <>
        <Button onClick={() => setCurForm("")}>
          <StepBackwardOutlined />
        </Button>
        <div>The current form id is {curForm}</div>
      </>
    );

  switch (formsStatus) {
    case "loading":
      return <span>Loading...</span>;
    case "succeeded":
      return (
        <>
          <Select
            style={{
              width: "10vw",
              maxWidth: 150,
              minWidth: 50,
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
                        onClick={() => setCurForm(form.id)}
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
