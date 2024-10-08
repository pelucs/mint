import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

export function formatDate(date: string) {
  return format(new Date(date), "MMM dd, yyy", { locale: ptBR })
}