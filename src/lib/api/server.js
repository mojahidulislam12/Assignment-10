import { getUserToken } from "../core/user";
import { baseUrl } from "./baseUrl";

// export const authHeader = async () => {
//   const token = await getUserToken();
//   const header = {
//     authorization: `Bearer ${token}`,
//   };
//   return token ? header : {};
// };
export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
};
