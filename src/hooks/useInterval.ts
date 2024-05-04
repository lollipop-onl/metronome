import { WorkerPayload } from "./useInterval.worker";
import MetronomeWorker from "./useInterval.worker?worker";
import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, interval = 25) => {
  const worker = useRef<InstanceType<typeof MetronomeWorker> | null>(null);

  useEffect(() => {
    worker.current ||= new MetronomeWorker();

    const onMessage = (e: MessageEvent<unknown>) => {
      if (e.data === "tick") {
        callback();
      }
    };

    worker.current.addEventListener("message", onMessage);
    return () => worker.current?.removeEventListener("message", onMessage);
  }, [callback]);

  const postMessage = (payload: WorkerPayload) => {
    worker.current?.postMessage(payload);
  };

  const start = () => {
    postMessage({ action: "start", interval });
  };

  const stop = () => {
    postMessage({ action: "stop" });
  };

  return { start, stop };
};
