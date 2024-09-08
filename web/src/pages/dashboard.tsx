import { Chart } from "@/components/dashboard/chart";
import { Header } from "@/components/header";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange } from "react-day-picker";
import { DataTable } from "@/components/dashboard/data-table";
import { DatePicker } from "@/components/date-picker";
import { WarningCard } from "@/components/warning-card";
import { getUserData } from "@/http/user-api";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { getTransactionsData } from "@/http/transactions-api";

export function Dashboard() {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(
      subDays(new Date(), (new Date().getDate() - 1))
      .setHours(0, 0, 0, 0)
    ),
    to: new Date(
      new Date().setHours(23, 59, 59, 999)
    ),
  });

  useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    refetchOnWindowFocus: false,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactionsData(date),
    refetchOnWindowFocus: false,
  });

  return(
    <div>
      <Header/>
      
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <h2 className="text-muted-foreground">Gerenciador financeiro</h2>
          </div>

          <DatePicker 
            date={date} 
            setDate={setDate}
          />
        </div>

        <SummaryCards 
          date={date} 
          transactions={transactions}
        />

        <div className="flex flex-col md:flex-row items-start gap-5">
          <Chart/>
          <WarningCard/>
        </div>

        {transactions ? (
          <DataTable data={transactions}/>
        ) : (
          <div>
            <Skeleton className="w-full h-[40vh] rounded-md"/>
          </div>
        )}
      </div>
    </div>
  );
}