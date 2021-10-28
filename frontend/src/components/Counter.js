import { useEffect, useState } from "react";

export default function Counter(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Counter just rendered");
  });

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>State: {props.userPanel.toString()}</p>
    </>
  );
}
