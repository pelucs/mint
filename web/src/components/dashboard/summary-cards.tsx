import { DateRange } from "react-day-picker";
import { formatDate } from "@/helpers/formate-date";
import { ITransaction } from "@/types/transaction-types";
import { formatCurrency } from "@/helpers/format-currency";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BadgeDollarSign, Coins, MinusCircle, PlusCircle } from "lucide-react";

interface SummaryCards {
  date: DateRange | undefined;
  transactions: ITransaction[];
}

export function SummaryCards({ date, transactions }: SummaryCards) {

  if(!transactions) {
    return null
  }

  const entries = transactions.filter(transaction => transaction.type === "entrie");
  const totalEntries = entries.reduce((acc, transaction) => acc + transaction.amount, 0);

  const exits = transactions.filter(transaction => transaction.type === "exit");
  const totalExits = exits.reduce((acc, transaction) => acc + transaction.amount, 0);

  const total = totalEntries - totalExits;

  return(
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de entradas
          </CardTitle>
          
          <PlusCircle className="size-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <h1 className="text-primary text-2xl font-bold">
            +{formatCurrency(totalEntries)}
          </h1>
          <h2 className="text-xs text-muted-foreground">
            {date?.from && formatDate(`${date.from}`)} - {date?.to && formatDate(`${date.to}`)}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de saídas
          </CardTitle>
          
          <MinusCircle className="size-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold text-red-500">
            -{formatCurrency(totalExits)}
          </h1>
          <h2 className="text-xs text-muted-foreground">
            {date?.from && formatDate(`${date.from}`)} - {date?.to && formatDate(`${date.to}`)}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Saldo restante
          </CardTitle>
          
          <Coins className="size-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <h1 className={`text-2xl font-bold ${total > 0 ? "text-primary" : "text-red-500"}`}>
            {formatCurrency(total)}
          </h1>
          <h2 className="text-xs text-muted-foreground">
            {date?.from && formatDate(`${date.from}`)} - {date?.to && formatDate(`${date.to}`)}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de transações
          </CardTitle>
          
          <BadgeDollarSign className="size-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold">
            {transactions.length}
          </h1>
          <h2 className="text-xs text-muted-foreground">
            {date?.from && formatDate(`${date.from}`)} - {date?.to && formatDate(`${date.to}`)}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}