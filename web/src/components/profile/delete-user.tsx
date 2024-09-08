import Cookies from "js-cookie";

import { api } from "@/lib/api";
import { toast } from "../ui/use-toast";
import { IUser } from "@/types/user-types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { AxiosError } from "axios";
import { formatDate } from "@/helpers/formate-date";
import { useMutation } from "@tanstack/react-query";
import { Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../ui/card";
import { Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogOverlay, 
  DialogPortal, 
  DialogTitle, 
  DialogTrigger 
} from "../ui/dialog";

interface DeleteUserProps {
  user: IUser;
}

export function DeleteUser({ user }: DeleteUserProps) {

  const [password, setPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      console.log("FUNÇÃO CHAMADA")
      if(password.length > 0) {
        const token = Cookies.get("token");

        if(token) {
          await api.delete(`/user/${user.id}/delete`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            data: {
              password,
            }
          });
        }
      }
    },

    onSuccess: () => {
      Cookies.remove("token")
      window.location.pathname = "/"
    },

    onError: (err: unknown) => {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string };

      toast({
        title: errorData.message
      })
    }
  });

  return(
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>
          Deletar conta
        </CardTitle>

        <CardDescription>
          Ao deletar sua conta todas as transações, anexos e notas serão excluídos juntos.
          Essa ação é irreversível.
        </CardDescription>
      </CardHeader>

      <div className="px-5">
        <Separator orientation="horizontal" className="px-5"/>
      </div>

      <CardContent className="mt-5 space-y-4">
        <h1 className="flex items-center gap-2">
          Conta criada desde: 

          <span className="py-1 px-2 rounded bg-secondary text-xs text-muted-foreground">
            {formatDate(user.createAt)}
          </span>
        </h1>

        <Dialog>
          <Button asChild variant="destructive">
            <DialogTrigger>
              Deletar conta
            </DialogTrigger>
          </Button>

          <DialogPortal>
            <DialogOverlay/>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Deseja realmente excluir sua conta?
                </DialogTitle>

                <DialogDescription>
                  Ao deletar sua conta todas as transações, anexos e notas serão excluídos juntos.
                  Essa ação é irreversível.
                </DialogDescription>

              </DialogHeader>

                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-light">Senha</label>
                    <Input
                      type="password"
                      className="w-80"
                      placeholder="Informe sua senha"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <Button 
                    variant="destructive"
                    onClick={() => mutate()}
                    className="w-40 disabled:opacity-50"
                    disabled={(isPending || password.length === 0)}
                  >
                    { isPending ? (
                      <Loader2 className="size-4 animate-spin"/>
                    ): (
                      "Deletar conta"
                    )}
                  </Button>
                </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </CardContent>
    </Card>
  );
}