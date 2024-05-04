import { useInterval } from "./useInterval";
import { useCallback, useRef, useState } from "react";

export const useMetronome = (tempo: number) => {
  const context = useRef<AudioContext | null>(null);
  const [nextNoteTime, setNextNoteTime] = useState(0);
  const [sixteenthNote, setSixteenthNote] = useState(0);

  const nextNote = useCallback(() => {
    setNextNoteTime((value) => value + (60 / tempo) * 0.25);
    setSixteenthNote((value) => (value + 1) % 16);
  }, []);

  const play = useCallback(() => {
    context.current ||= new AudioContext();

    const frequency =
      sixteenthNote % 16 === 0 ? 880 : sixteenthNote % 4 === 0 ? 440 : 220;
    const oscillator = new OscillatorNode(context.current, { frequency });

    oscillator.connect(context.current.destination);
    oscillator.start();
    oscillator.stop(context.current.currentTime + 0.05);
  }, [sixteenthNote]);

  const onTick = useCallback(() => {
    context.current ||= new AudioContext();

    if (nextNoteTime < context.current.currentTime + 0.1) {
      play();
      nextNote();
    }
  }, [nextNoteTime, nextNote, play]);

  const { start, stop } = useInterval(onTick);

  return { start, stop, play };
};
