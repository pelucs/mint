import Cookies from "js-cookie";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { TooltipComponent } from "../tooltip-component";
import { Button, buttonVariants } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, ChevronDownIcon, CirclePlus, Loader2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogOverlay, 
  DialogPortal, 
  DialogTitle, 
  DialogTrigger 
} from "../ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../ui/form";
import { api } from "@/lib/api";
import { IUser } from "@/types/user-types";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { ITransaction } from "@/types/transaction-types";

const formSchema = z.object({
  description: z.string({ message: "Campo obrigatório" }),
  amount: z.coerce.number({ message: "Campo obrigatório" }),
  type: z.string({ message: "Campo obrigatório" }),
  category: z.string().optional(),
  account: z.string().optional(),
  method: z.string().optional(),
  note: z.string().optional(),
  date: z.date({
    required_error: "Selecione a data",
  }),
});

type FormTypes = z.infer<typeof formSchema>;

export function CreateTransactionSheet() {

  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState<boolean>();

  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormTypes) => {
      const token = Cookies.get("token");
      const user: IUser | undefined = queryClient.getQueryData(['user']);

      await api.post("/transaction/create", {
        userId: user?.id,
        description: data.description,
        amount: data.amount,
        dateAt: data.date,
        attachment: [],
        category: data.category,
        account: data.account,
        method: data.method,
        type: data.type,
        note: data.note,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },

    onSuccess: (_, variables) => {
      toast({
        title: "Transação registrada com sucesso"
      });

      queryClient.setQueryData(['transactions'], (prevList: ITransaction[] | undefined) => {
        if (!prevList) return [];
  
        return [
          ...prevList,
          {
            description: variables.description,
            amount: variables.amount,
            dateAt: variables.date,
            attachment: [],
            category: variables.category,
            account: variables.account,
            method: variables.method,
            type: variables.type,
            note: variables.note,
          },
        ];
      });

      setOpenDialog(false);
    },

    onError: (err: unknown) => {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string };

      toast({
        title: errorData.message
      });
    }
  });

  const createTransaction = async (data: FormTypes) => {
    mutate(data)
  }

  return(
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <TooltipComponent content="Registrar transação">
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <CirclePlus className="size-4"/>
          </Button>
        </DialogTrigger>
      </TooltipComponent>

      <DialogPortal>
        <DialogOverlay/>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Registrar nova transação
            </DialogTitle>

            <DialogDescription>
              Preencha todos os campos corretamente
            </DialogDescription>
          </DialogHeader>

          <Separator orientation="horizontal"/>

          <div>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(createTransaction)}
                className="space-y-4"
              >
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-light">Descrição</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ex: Pagamento da conta de água"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-light">Valor</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="R$ Valor"
                            className="w-full"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-light">Data da transação</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                  <span>Selecione a data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light">Tipo</FormLabel>

                        <FormControl>
                          <div className="relative">
                            <FormControl>
                              <select
                                {...field}
                                className={cn(
                                  buttonVariants({ variant: "outline" }),
                                  "w-full appearance-none font-normal cursor-pointer"
                                )}
                                defaultValue="defaultValue"
                              >
                                <option value="defaultValue" disabled>Selecione o tipo</option>
                                <option value="entrie">Entrada</option>
                                <option value="exit">Saída</option>
                              </select>
                            </FormControl>
                            
                            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light">Categoria</FormLabel>

                        <FormControl>
                          <div className="relative">
                            <FormControl>
                              <select
                                {...field}
                                className={cn(
                                  buttonVariants({ variant: "outline" }),
                                  "w-full appearance-none font-normal cursor-pointer"
                                )}
                                defaultValue="defaultValue"
                              >
                                <option value="defaultValue" disabled>Selecione a categoria</option>
                                <option value="Salário">Salário</option>
                                <option value="Seguro">Seguro</option>
                                <option value="Financiamento">Financiamento</option>
                                <option value="Cotna de casa">Conta de casa</option>
                                <option value="Outro">Outro</option>
                              </select>
                            </FormControl>
                            
                            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="account"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light">Conta bancária</FormLabel>

                        <FormControl>
                          <div className="relative">
                            <FormControl>
                              <select
                                {...field}
                                className={cn(
                                  buttonVariants({ variant: "outline" }),
                                  "w-full appearance-none font-normal cursor-pointer"
                                )}
                                defaultValue="defaultValue"
                              >
                                <option value="defaultValue" disabled>Selecione a conta bancaria</option>
                                <option value="Caixa Econômica">Caixa Econômica</option>
                                <option value="C6 Bank">C6 Bank</option>
                                <option value="Inter">Inter</option>
                                <option value="Nubank">Nubank</option>
                                <option value="Picpay">Picpay</option>
                                <option value="Outro">Outro</option>
                              </select>
                            </FormControl>
                            
                            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-light">Método</FormLabel>

                        <FormControl>
                          <div className="relative">
                            <FormControl>
                              <select
                                {...field}
                                className={cn(
                                  buttonVariants({ variant: "outline" }),
                                  "w-full appearance-none font-normal cursor-pointer"
                                )}
                                defaultValue="defaultValue"
                              >
                                <option value="defaultValue" disabled>Selecione o método</option>
                                <option value="Boleto">Boleto</option>
                                <option value="Carteira digital">Carteira digital</option>
                                <option value="Crédito">Crédito</option>
                                <option value="Débito">Débito</option>
                                <option value="Pix">Pix</option>
                                <option value="Outro">Outro</option>
                              </select>
                            </FormControl>
                            
                            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="note"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-light">Nota</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Escreva alguam nota sobre a transação"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  disabled={isPending}
                  className="w-full gap-2 disabled:opacity-50"
                >
                  { isPending ? (
                    <Loader2 className="size-4 animate-spin"/>
                  ): (
                    "Registrar"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}