import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function WarningCard() {
  return(
    <div className="w-72 flex flex-col justify-between gap-10 p-6 rounded-xl bg-cover bg-[url(/public/bg-card.png)]">
      <span className="w-fit py-1 px-3 text-sm font-semibold rounded-full text-black bg-white">
        Novidade!
      </span>

      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-black leading-none">
          Em breve, a Penny contará com o apoio da IA✦
        </h1>

        <p className="text-white">
          Para oferecer uma experiência ainda mais personalizada e eficiente, estamos preparando 
          interações mais inteligentes e soluções rápidas om apoio da inteligência artificial.
        </p>
      </div>

      <Button className="w-full gap-2 text-black bg-white hover:bg-zinc-200">
        Saiba mais

        <ArrowRight className="size-4"/>
      </Button>
    </div>
  );
}