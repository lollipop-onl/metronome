import { useMetronome } from "~hooks/useMetronome";

export const App = () => {
  const { play, start, stop } = useMetronome(60);

  return (
    <div>
      <p>Hello World</p>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => play()}>Play</button>
    </div>
  );
};
