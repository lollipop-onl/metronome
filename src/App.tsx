import { useInterval } from "~hooks/useInterval";

export const App = () => {
  const { start, stop } = useInterval(() => {
    console.log("function");
  });

  return (
    <div>
      <p>Hello World</p>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
};
