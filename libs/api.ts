import { isProd } from "./env";

export type RES<T> = {
  code: number;
  message: string;
  data: T;
};

export type TGUser = {
  id: number;
  username: string;
  profile: {
    followX?: boolean;
    joinTgChat?: boolean;
    joinTgChannel?: boolean;
  };
};
const BASE_URL = isProd ? "https://api-mini.zoofi.io" : "http://localhost:4000";

async function getData<T>(res: Response) {
  return res.json().then((data) => (data as RES<T>).data);
}
export function getTgUser(userId: number) {
  return fetch(`${BASE_URL}/api/tguser/${userId}`).then(getData<TGUser | undefined>);
}

export function reportCheck(auth: string, taskId: "followX" | "joinTgChannel" | "joinTgChat") {
  return fetch(`${BASE_URL}/api/report/${taskId}/check`, { method: "post", headers: { authorization: auth } }).then(getData<void>);
}
