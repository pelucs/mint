import Cookies from "js-cookie";

import { z } from "zod";
import { api } from "@/lib/api";
import { IUser } from "@/types/user-types";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface UpdateUserProps {
  user: IUser;
}

const formSchema = z.object({
  name: z.string(),
});

type FormTypes = z.infer<typeof formSchema>;

export function UpdateUser({ user }: UpdateUserProps) {

  const queryClient = useQueryClient();

  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormTypes) => {
      const token = Cookies.get("token");

      const { name } = data;

      if(token) {
        await api.put(`/user/${user.id}/update`, {
          name,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    },

    onSuccess: (_, variables) => {
      toast({
        title: "Alterações salvas com sucesso"
      });

      queryClient.setQueryData(['user'], (data: IUser) => {
        return {
          ...data,
          name: variables.name
        }
      });
    },

    onError: (err: unknown) => {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string };

      toast({
        title: errorData.message
      });
    }
  }) 

  const update = async (data: FormTypes) => {
    if(
      data.name !== user.name
    ) {
      mutate(data);
    } else {
      toast({
        title: "Nenhuma alteração encontrada"
      })
    }
  }

  return(
    <Card>
      <CardHeader>
        <CardTitle>
          Atualizar dados da sua conta
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(update)}
            className="space-y-5"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-light">Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-80"
                      defaultValue={user.name}
                      placeholder="Informe seu nome completo"
                    />
                  </FormControl>
                </FormItem>
              )}
            />  

            <Button 
              type="submit"
              disabled={isPending}
              className="w-40 disabled:opacity-50"
            >
              { isPending ? (
                <Loader2 className="size-4 animate-spin"/>
              ): (
                "Salvar alterações"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}