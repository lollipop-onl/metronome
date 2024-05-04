type StartPayload = {
  action: "start";
  interval: number;
};

type StopPayload = {
  action: "stop";
};

export type WorkerPayload = StartPayload | StopPayload;

const getWorkerPayload = (e: MessageEvent): WorkerPayload | null => {
  const { data } = e;

  if (typeof data !== "object" || data === null) {
    return null;
  }

  switch (data.action) {
    case "stop":
      return data;
    case "start":
      return typeof data.interval === "number" ? data : null;
    default:
      return null;
  }
};

let timerId: number | undefined;

const stop = () => {
  clearInterval(timerId);
};

const start = (interval: number) => {
  stop();

  timerId = setInterval(() => self.postMessage("tick"), interval);
};

self.onmessage = (e: MessageEvent<unknown>) => {
  const payload = getWorkerPayload(e);

  switch (payload?.action) {
    case "start": {
      start(payload.interval);

      break;
    }
    case "stop": {
      stop();

      break;
    }
  }
};
