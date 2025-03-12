import { isProd } from "./env";

export type RES<T> = {
  code: number;
  message: string;
  data: T;
};

export type TGUser = {
  id: number;
  username: string;
  profile?: {
    followX?: boolean;
    joinTgChat?: boolean;
    joinTgChannel?: boolean;
    connectEvmAccount?: string;
    connectTonAccount?: string;
    joinDiscord?: boolean;
    lookUrl1?: boolean;
    lookUrl2?: boolean;
    lookUrl3?: boolean;
    lookUrl4?: boolean;
    lookUrl5?: boolean;
    lookUrl6?: boolean;
    inviteFriend?: number;
  };
};

export type TaskID = keyof Exclude<TGUser["profile"], undefined>;
const BASE_URL = isProd ? "https://api-mini.zoofi.io" : "http://localhost:4000";

async function getData<T>(res: Response) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json().then((data) => (data as RES<T>).data);
}
export function getTgUser(userId: number) {
  return fetch(`${BASE_URL}/api/tguser/${userId}`).then(getData<TGUser | undefined>);
}

export function reportCheck(auth: string, taskId: TaskID, body?: { account?: string }) {
  return fetch(`${BASE_URL}/api/report/${taskId}/check`, {
    method: "post",
    headers: { authorization: auth },
    body: body ? JSON.stringify(body) : undefined,
  }).then(getData<void>);
}
