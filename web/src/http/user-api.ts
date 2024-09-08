import Cookies from "js-cookie";

import { api } from "@/lib/api";
import { jwtDecode } from "jwt-decode";

export async function getUserData() {
  const token = Cookies.get("token");
  const tokenContent: { id: string } | null = token ? jwtDecode(token) : null;

  if (!tokenContent?.id) {
    throw new Error();
  }

  const response = await api.get(`/user/${tokenContent.id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
