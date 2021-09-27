import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectAllForms, fetchForms } from "../redux/formsSlice";
import { List } from "antd";

const AdminView = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector(selectAllForms);

  const formsStatus = useAppSelector((state) => state.status);

  useEffect(() => {
    if (formsStatus === "idle") {
      dispatch(fetchForms());
    }
  }, [formsStatus, dispatch]);

  return (
    <List>
      {forms.map((form) => (
        <List.Item>{form.id}</List.Item>
      ))}
    </List>
  );
};

export default AdminView;
