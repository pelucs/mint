import { ptBR } from "date-fns/locale"
import { CalendarDays } from "lucide-react"
import { ITransaction } from "@/types/transaction-types"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { 
  format, 
  isWithinInterval, 
  lastDayOfMonth, 
  startOfMonth, 
  startOfYear, 
  subMonths 
} from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { getTransactionsData } from "@/http/transactions-api"

// Configuração do gráfico
const chartConfig = {
  entries: {
    label: "Entrada",
    color: "hsl(var(--chart-1))",
  },
  exits: {
    label: "Saída",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function Chart() {

  const { data: transactions } = useQuery({
    queryKey: ['transactionsForChart'],
    queryFn: async () => {
      const from = startOfYear(new Date());
      const to = lastDayOfMonth(subMonths(new Date(), 1));
  
      // Retornar a chamada para getTransactionsData
      return await getTransactionsData({ from, to });
    },
    refetchOnWindowFocus: false,
  });
  
  const getMonthlyBalance = (data: ITransaction[]) => {
    // Verificar se os dados estão disponíveis e não estão vazios
    if (!data || data.length === 0) {
      return [];
    }

    const from = startOfYear(new Date());
    const to = lastDayOfMonth(subMonths(new Date(), 1));

    const monthlyData: Record<string, { entries: number; exits: number }> = {};
    
    // Filtrar transações dentro do intervalo
    const filteredTransactions = data.filter(
      (transaction) => isWithinInterval(transaction.dateAt, { start: from, end: to })
    );
    
    filteredTransactions.forEach((transaction) => {
      const month = format(startOfMonth(transaction.dateAt), "MMMM", { locale: ptBR });

      if (!monthlyData[month]) {
        monthlyData[month] = { entries: 0, exits: 0 };
      }

      if (transaction.type === "entrie") {
        monthlyData[month].entries += transaction.amount;
      } else if (transaction.type === "exit") {
        monthlyData[month].exits += transaction.amount;
      }
    });

    return Object.keys(monthlyData).map((month) => ({
      month,
      entries: monthlyData[month].entries,
      exits: monthlyData[month].exits,
    }));
  };

  if(!transactions) {
    return null
  }

  // Gerar os dados do gráfico
  const chartData = getMonthlyBalance(transactions);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Resumo geral do meses - 2024</CardTitle>
        <CardDescription className="capitalize flex items-center gap-1">
          {format(startOfYear(new Date()), "MMMM", { locale: ptBR })}

          <span>-</span>

          {format(subMonths(new Date(), 1), "MMMM", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[220px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.split("")[0].toUpperCase() + value.slice(1, 3)}
            />

            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent />} 
            />

            <Line
              dataKey="entries"
              type="monotone"
              stroke="var(--color-entries)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="exits"
              type="monotone"
              stroke="var(--color-exits)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              O gráfico exibe {subMonths(new Date(), 1).getMonth() + 1} meses <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}