import logotipoForDark from "@/assets/logotipo-mint-for-dark.svg";
import logotipoForLight from "@/assets/logotipo-mint-for-light.svg";

import { z } from "zod";
import { api } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormTypes = z.infer<typeof formSchema>;

export function Login() {

  const navigate = useNavigate()

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (dataForm: FormTypes) => {

      const { email, password } = dataForm;

      const response = await api.post("/user/login", {
        email,
        password,
      });

      const data: { token: string } = response.data;

      return data.token;
    },

    onSuccess: (token) => {
      const expireTokenInSeconds = 60 * 60 * 24 * 30;
      document.cookie = `token=${token}; Path=/; max-age=${expireTokenInSeconds};`;

      navigate("/dashboard");
    },

    onError: (err: unknown) => {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string };

      toast({
        title: errorData.message
      });
    }
  })

  const login = async (data: FormTypes) => {
    mutate(data)
  }

  return(
    <div className="w-full h-screen px-5 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl h-full flex flex-col items-center justify-center gap-10">
        <img 
          src={logotipoForDark} 
          alt="Logotipo Mint"
          className="w-40 hidden dark:block"
        />

        <img 
          src={logotipoForLight} 
          alt="Logotipo Mint"
          className="w-40 block dark:hidden"
        /> 

        <div className="space-y-5">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">
              Efetue seu login
            </h1>

            <div className="text-xs text-muted-foreground">
              Ainda não possui conta? <Link to="/register" className="underline text-primary">crie uma aqui</Link>
            </div>
          </div>

          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(login)}
              className="space-y-5"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-light">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Seu email"
                        className="w-80"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <FormLabel className="font-light">Senha</FormLabel>

                      <Link to="/" className="text-xs hover:underline text-lime-500">
                        Esqueceu a senha?
                      </Link>
                    </div>

                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          className="w-80"
                          placeholder="Sua senha"
                          type={visiblePassword ? "text" : "password"}
                        />
                      </FormControl>

                      <Button 
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="size-6 absolute right-1.5 top-1.5"
                        onClick={() => setVisiblePassword(!visiblePassword)}
                      >
                        {visiblePassword ? <EyeOff className="size-3"/> : <Eye className="size-3"/>}
                      </Button>
                    </div>
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
                  <>
                    Entrar

                    <ArrowRight className="size-4"/>
                  </>
                )}
              </Button>             
            </form>
          </Form>

          <div className="flex items-center gap-5">
            <Separator orientation="horizontal" className="flex-1 h-px bg-secondary"/>

            <span className="text-xs text-muted-foreground">Ou</span>

            <Separator orientation="horizontal" className="flex-1 h-px bg-secondary"/>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <GitHubLogoIcon/>

            Entrar com GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}