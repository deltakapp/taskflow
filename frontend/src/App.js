import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  async function testFetch(e) {
    e.preventDefault();
    const request = {
      method: "GET",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "echo!" }),
    };
    const response = await fetch(
      "https://taskflow.herokuapp.com/testfetch",
      request
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setMessage(result.message);
    } else {
      console.log(response.status);
    }
  }

  return (
    <div className="App">
      <button onClick={testFetch}>Fetch something!</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
