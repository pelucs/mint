import Cookies from "js-cookie";

import { api } from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { DateRange } from "react-day-picker";

export async function getTransactionsData(date: DateRange | undefined) {
  const token = Cookies.get("token");
  const tokenContent: { id: string } | null = token ? jwtDecode(token) : null;

  if (!tokenContent?.id) {
    throw new Error();
  }

  const querystring = `startDate=${date?.from}&endDate=${date?.to}`;

  const response = await api.get(`/transaction/${tokenContent.id}/all?${querystring}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}