import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import NIHRForm from "./components/NIHRForm";
import { Button, message } from "antd";
import "./App.less";

const firebaseConfig = {
  apiKey: "AIzaSyDFY1vAx2dkZ83tBmIcOf9hrV_76MAQ3JA",
  authDomain: "nihr-task.firebaseapp.com",
  projectId: "nihr-task",
  storageBucket: "nihr-task.appspot.com",
  messagingSenderId: "943861323887",
  appId: "1:943861323887:web:a50062eb52790c823a959a",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  const [view, setView] = useState<"form" | "admin">("form");

  useEffect(() => {
    document.title = "NIHR PTSD Checklist";
  });

  // Callbacks for submitting the form or if there's an error

  const onFinish = async (values: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const docRef = await addDoc(collection(db, "submitted-forms"), values);
      message.success("Success!");
    } catch (e) {
      console.error(e);
      message.error("Error uploading form, please try again");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Error");
    console.error(errorInfo);
    message.error("Error compiling form, please try again");
  };

  const NIHRFormProps = { onFinish, onFinishFailed };

  return (
    <>
      <div className="nav">
        <Button
          type="primary"
          onClick={() => (view === "form" ? setView("admin") : setView("form"))}
        >
          {view === "form" ? "Switch to admin" : "Switch to form"}
        </Button>
      </div>
      <div className="container">
        {view === "form" ? (
          <NIHRForm {...NIHRFormProps} />
        ) : (
          <h1>admin view</h1>
        )}
      </div>
    </>
  );
}

export default App;
