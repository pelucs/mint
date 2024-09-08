import Cookies from "js-cookie";
import logotipoForDark from "@/assets/logotipo-mint-for-dark.svg";
import logotipoForLight from "@/assets/logotipo-mint-for-light.svg";

import { Link } from "react-router-dom";
import { IUser } from "@/types/user-types";
import { Navbar } from "./navbar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ButtonTheme } from "./button-theme";
import { useQueryClient } from "@tanstack/react-query";
import { FeedbackPopover } from "./feedback-popover";
import { Menu, User, LogOut, LayoutGrid } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Header() {

  const queryClient = useQueryClient();
  const user: IUser | undefined = queryClient.getQueryData(['user']);

  return(
    <div className="w-full h-16 px-5 flex items-center justify-between border-b border-secondary">
      <img 
        src={logotipoForDark} 
        alt="Logotipo Mint"
        className="w-32 hidden dark:block"
      />

      <img 
        src={logotipoForLight} 
        alt="Logotipo Mint"
        className="w-32 block dark:hidden"
      /> 

      <div className="flex items-center gap-5">
        <nav className="flex items-center gap-5 text-muted-foreground">
          <Link to="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          
          <Link to="/about" className="hover:text-primary transition-colors">
            Sobre o app
          </Link>

          <FeedbackPopover/>
        </nav>

        <Separator orientation="vertical" className="h-5"/>

        <div className="flex items-center gap-2">
          <Popover>
            <Button 
              asChild
              variant="outline"
              className="rounded-full px-2"
            >
              <PopoverTrigger className="flex items-center gap-2">
                <Menu className="size-4 ml-1"/>

                <span className="size-6 flex items-center justify-center rounded-full bg-primary">
                  <User className="size-3 text-black"/>
                </span>
              </PopoverTrigger>
            </Button>

            <PopoverContent align="end" className="w-52 p-0">
              <div className="py-2 px-3">
                <h1 className="text-sm">Olá, {user?.name.split(" ")[0]}</h1>
                <h2 className="text-xs text-muted-foreground">{user?.email}</h2>
              </div>

              <Separator orientation="horizontal"/>

              <div className="p-1.5">
                <Button
                  asChild  
                  size="sm"
                  variant="ghost"
                  className="w-full px-2 justify-start gap-1.5"
                >
                  <Link to="/dashboard">
                    <LayoutGrid className="size-4"/>

                    Dashboard
                  </Link>
                </Button>

                <Button
                  asChild  
                  size="sm"
                  variant="ghost"
                  className="w-full px-2 justify-start gap-1.5"
                >
                  <Link to="/profile">
                    <User className="size-4"/>

                    Perfil
                  </Link>
                </Button>

                <ButtonTheme/>
              </div>

              <Separator orientation="horizontal"/>

              <div className="p-1.5">
                <Button  
                  size="sm"
                  variant="ghost"
                  className="w-full px-2 justify-start gap-1.5"
                  onClick={() => {
                    Cookies.remove("token")
                    window.location.pathname = "/"
                  }}
                >
                  <LogOut className="size-4"/>

                  Encerrar sessão
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Navbar/>
        </div>
      </div>
    </div>
  );
}