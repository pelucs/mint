import * as React from "react"
import {
  CaretSortIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { 
  Card, 
  CardContent, 
  CardTitle 
} from "../ui/card"

import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { ITransaction } from "@/types/transaction-types"
import { TooltipComponent } from "../tooltip-component"
import { OverviewTransactionSheet } from "./overview-transaction-sheet"
import { Paperclip, SlidersHorizontal, Trash2 } from "lucide-react"
import { CreateTransactionSheet } from "./create-transaction-sheet"

const columns: ColumnDef<ITransaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ml-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <div className="whitespace-nowrap capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Formata para moeda do Brasil
      const formated = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="whitespace-nowrap font-medium">
        {formated}
      </div>
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          className="text-sm p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Conta
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-left">
        {row.getValue("account") ? row.getValue("account") : "Indefinida"}
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: "Método",
    cell: ({ row }) => (
      <div>
        {row.getValue("method") ? row.getValue("method") : "Indefinido"}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("type") === "entrie" ? "Entrada" : "Saída"}
      </div>
    ),
  },
  {
    accessorKey: "dateAt",
    header: "Data",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {`${format(
            new Date(row.getValue("dateAt")), 
            "MMM dd, yyy", 
            { locale: ptBR }
        )}`}
      </div>
    ),
  },
  {
    id: "actions",
    // enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        {row.original.attachment.length > 0 && (
          <TooltipComponent content="Anexos">
            <Button 
              size="icon" 
              variant="outline" 
              className="size-7"
            >
              <Paperclip className="size-4"/>
            </Button>
          </TooltipComponent>
        )}

        <OverviewTransactionSheet transaction={row.original}/>
      </div>
    ),
  },
]

interface DataTableProps {
  data: ITransaction[]
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <div className="w-full px-6 pt-6 pb-4 flex items-center justify-between">
        <CardTitle className="text-xl">
          Transações
        </CardTitle>

        <div className="flex items-center gap-2">
          <Input
            className="w-[320px]"
            placeholder="Pesquise uma transação"
            value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("description")?.setFilterValue(event.target.value)
            }
          />

          <CreateTransactionSheet/>

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button 
              size="icon" 
              variant="destructive" 
              className=""
            >
              <Trash2 className="size-4"/>
            </Button>
          )}

          <DropdownMenu>
            <Button 
              asChild 
              size="icon" 
              variant="outline" 
              className="ml-auto"
            >
              <TooltipComponent content="Colunas">
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline">
                    <SlidersHorizontal className="size-4"/>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipComponent>
            </Button>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent>
        <div className="w-full space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhum resultado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
