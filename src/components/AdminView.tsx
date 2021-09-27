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
          <Button onClick={() => dispatch(fetchForms())}>
            <ReloadOutlined />
          </Button>
          <List>
            {forms
              .slice()
              .sort((a, b) =>
                Date.parse(a.date) > Date.parse(b.date) ? 1 : -1
              )
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
