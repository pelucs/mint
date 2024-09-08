import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { UpdateUser } from "@/components/profile/update-user";
import { getUserData } from "@/http/user-api";
import { DeleteUser } from "@/components/profile/delete-user";

export function Profile() {

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
    refetchOnWindowFocus: false,
  });

  if(!user) {
    return <Loading/>
  }

  return(
    <div>
      <Header/>
      
      <div className="p-5 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Perfil</h1>
          <h2 className="text-muted-foreground">Gerencie suas informações</h2>
        </div>

        <Separator orientation="horizontal" className="bg-secondary"/>

        <div className="min-h-screen flex items-start gap-10">
          <div className="w-72">
            <Button 
              size="lg"
              variant="secondary"  
              className="w-full px-4 justify-start"
            >
              Geral
            </Button>
          </div>

          <div className="flex-1 space-y-5">
            <div>
              <h1 className="text-xl font-semibold">Conta</h1>
              <h2 className="text-muted-foreground">Informações da sua conta</h2>
            </div>
            
            <Separator className="w-full h-px bg-secondary"/>

            <UpdateUser user={user}/>
            <DeleteUser user={user}/>
          </div>
        </div>
      </div>
    </div>
  );
}