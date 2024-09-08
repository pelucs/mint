"use client"

import { ptBR } from "date-fns/locale"; 
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { CalendarIcon } from "@radix-ui/react-icons"
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: (newDate: DateRange | undefined) => void;
}

export function DatePicker({
  date,
  setDate,
  className,
}: DatePickerProps) {

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ptBR })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            locale={ptBR}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            defaultMonth={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}