import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  // CORS test
  // CORS: 리소스 접근 허용
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

  // CORS: 서로 다른 도메인간 쿠키 전달 허용
  axios.defaults.withCredentials = true;
  const test = async () => {
    try {
      const response = await axios.get("http://118.67.142.96/"); // 백엔드 URL을 여기에 넣어주세요
      console.log("API 호출 결과:", response.data);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={test}>test button</button>
      </header>
    </div>
  );
}

export default App;
