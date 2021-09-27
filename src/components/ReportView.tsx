import { FC } from "react";

type ReportViewProps = {
  form: TFormData;
};

const ReportView: FC<ReportViewProps> = ({ form }) => {
  return <div>{form.date}</div>;
};
