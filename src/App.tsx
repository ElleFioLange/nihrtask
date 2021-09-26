import { initializeApp } from "firebase/app";
import { Button } from "antd";
import "./App.less";

const firebaseConfig = {
  apiKey: "AIzaSyDFY1vAx2dkZ83tBmIcOf9hrV_76MAQ3JA",
  authDomain: "nihr-task.firebaseapp.com",
  projectId: "nihr-task",
  storageBucket: "nihr-task.appspot.com",
  messagingSenderId: "943861323887",
  appId: "1:943861323887:web:a50062eb52790c823a959a",
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
  );
}

export default App;
