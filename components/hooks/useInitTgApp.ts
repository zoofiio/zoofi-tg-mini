import { useEffect, useState } from "react";

export function getTgApp() {
  return window.Telegram?.WebApp;
}

export function useInitTgApp() {
  const [state, setState] = useState<{ inited: boolean; tgApp?: ReturnType<typeof getTgApp> }>({ inited: false });
  useEffect(() => {
    setState({ inited: true, tgApp: getTgApp() });
  }, []);
  return state;
}
