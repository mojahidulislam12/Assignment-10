import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};
export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    window.location.reload();
    redirect("/signin");
  }
  if (user.role !== role) {
    window.location.reload();
    redirect("/unauthorized");
  }
  return user;
};
