import { authClient } from "./auth-client";

export const getsessionUser = async () => {
  const { data: session } = await authClient.getSession();
  const user = session?.user;
  return user;
};
