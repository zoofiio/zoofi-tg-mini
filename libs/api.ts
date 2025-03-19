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
    shareBot?: boolean;
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
export async function getTgUser(userId: number) {
  return await fetch(`${BASE_URL}/api/tguser/${userId}`).then(getData<TGUser | undefined>);
}

export async function reportCheck(auth: string, taskId: TaskID, body?: { account?: string }) {
  return await fetch(`${BASE_URL}/api/report/${taskId}/check`, {
    method: "POST",
    headers: { authorization: auth, Accept: "application/json, text/plain, */*", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).then(getData<void>);
}
