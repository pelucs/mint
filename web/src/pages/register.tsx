import logotipoForDark from "@/assets/logotipo-mint-for-dark.svg";
import logotipoForLight from "@/assets/logotipo-mint-for-light.svg";

import { z } from "zod";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type FormTypes = z.infer<typeof formSchema>;

export function Register() {

  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormTypes) => {
      const { name, email, password } = data;

      await api.post("/user/create", {
        name, 
        email, 
        password,
      });
    },

    onSuccess: () => {
      toast({
        title: "Usuário criado com sucesso"
      });

      navigate("/")
    },

    onError: (err: unknown) => {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string };

      toast({
        title: errorData.message
      });
    }
  })

  const createUser = (data: FormTypes) => {
    mutate(data);
  }

  return(
    <div className="w-full h-screen px-5 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl h-full flex flex-col items-center justify-center gap-10">
        <img 
          src={logotipoForDark} 
          alt="Logotipo Penny"
          className="w-40 hidden dark:block"
        />

        <img 
          src={logotipoForLight} 
          alt="Logotipo Penny"
          className="w-40 block dark:hidden"
        />    

        <div className="space-y-5">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">
              Criar conta
            </h1>

            <div className="text-xs text-muted-foreground">
              Já possui conta? <Link to="/" className="underline text-primary">entre aqui</Link>
            </div>
          </div>

          <Separator orientation="horizontal" className="w-full h-px bg-secondary"/>

          <div className="w-full">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map(num => (
                <Button 
                  key={num} 
                  variant="ghost"
                  onClick={() => {
                    if(num === 1 && form.getValues("name")) {
                      setStep(1)
                    } else if(num === 2 && form.getValues("email") && form.getValues("password")) {
                      setStep(2)
                    }  else if(num === 3 && form.getValues("email") && form.getValues("password")) {
                      setStep(3)
                    }
                  }}
                  className="p-2 w-fit h-fit flex flex-col items-center gap-2"
                >
                  <span 
                    className={`size-6 flex items-center justify-center rounded-full border 
                    border-primary ${ step > num ? "bg-primary" : step === num ? "bg-primary/50" : "bg-transparent" }`}
                  >
                    {step > num && <Check className="size-4 text-background"/>}
                  </span>

                  <h1 className="text-xs">Passo {num}</h1>
                </Button>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(createUser)}
              className="space-y-5"
            >
              {step === 1 && (
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-light">Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Informe seu nome"
                          className="w-80"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {step === 2 && (
                <>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-light">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Informe seu email"
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
                        <FormLabel className="font-light">Senha</FormLabel>

                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              className="w-80"
                              placeholder="Informe uma senha"
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
                </>
              )}

              {step === 3 && (
                <Card className="w-80">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Confirme seus dados
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <span className="font-light text-muted-foreground">Nome</span>
                      <h1>{form.getValues("name")}</h1>
                    </div>

                    <div>
                      <span className="font-light text-muted-foreground">Email</span>
                      <h1>{form.getValues("email")}</h1>
                    </div>

                    <div>
                      <span className="font-light text-muted-foreground">Senha</span>
                      <div className="flex items-center justify-between">
                        {visiblePassword ? (
                          <h1 className="">
                            {form.getValues("password")}
                          </h1>
                        ) : (
                          <h1 className="">
                            {"•".repeat(form.getValues("password").length)}
                          </h1>
                        )}

                        <Button 
                          size="icon"
                          type="button"
                          variant="secondary"
                          className="size-6"
                          onClick={() => setVisiblePassword(!visiblePassword)}
                        >
                          {visiblePassword ? <EyeOff className="size-3"/> : <Eye className="size-3"/>}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 1 ? (
                <Button 
                  onClick={(e) => {
                    e.preventDefault()
                    setStep(2)
                  }}
                  className="w-full gap-2"
                >
                  Continuar

                  <ArrowRight className="size-4"/>
                </Button>
              ) : step === 2 ? (
                <Button 
                  onClick={(e) => {
                    e.preventDefault()
                    setStep(3)
                  }}
                  className="w-full gap-2"
                >
                  Continuar

                  <ArrowRight className="size-4"/>
                </Button>
              ) : (
                <Button 
                  type="submit"
                  disabled={isPending}
                  className="w-full gap-2 disabled:opacity-50"
                >
                  { isPending ? (
                    <Loader2 className="size-4 animate-spin"/>
                  ): (
                    <>
                      Criar conta

                      <ArrowRight className="size-4"/>
                    </>
                  )}
                </Button>
              )}              
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

        <div>
          
        </div>
      </div>
    </div>
  );
}