import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { FileUpload } from "./file-upload";
import { ScrollArea } from "../ui/scroll-area";
import { ITransaction } from "@/types/transaction-types";
import { Info, Landmark } from "lucide-react";
import { TooltipComponent } from "../tooltip-component";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { 
  Sheet, 
  SheetContent, 
  SheetOverlay, 
  SheetPortal, 
  SheetTitle, 
  SheetTrigger 
} from "../ui/sheet";

interface OverviewTransactionSheet {
  transaction: ITransaction;
}

export function OverviewTransactionSheet({ transaction }: OverviewTransactionSheet) {
  return(
    <Sheet>
      <TooltipComponent content="Visualizar transação">
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="size-7 p-0">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
      </TooltipComponent>

      <SheetPortal>
        <SheetOverlay/>

        <SheetContent className="w-[520px] py-6 px-0">
          <div className="h-full flex flex-col justify-between">
            <ScrollArea className="flex-1 px-6 pb-5">
              <div className="flex flex-col gap-5">
                <span className="text-sm text-muted-foreground">Ago 29, 2024</span>

                <div className="space-y-1">
                  <SheetTitle className="text-base">
                    {transaction.description}
                  </SheetTitle>

                  <h1 className="text-3xl font-bold text-primary">
                    {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </h1>
                </div>

                <div className="w-fit py-1.5 px-2 flex items-center gap-1.5 rounded text-sm bg-secondary">
                  <Landmark className="size-4"/>

                  {transaction.account} - {transaction.method}
                </div>

                <Separator/>

                  <div className="space-y-8">
                    {/* <CategoryFilter/> */}
                    <div className="space-y-2">
                      <label className="text-sm flex items-center gap-1.5">
                        <Info className="size-4"/>
                        
                        Categoria
                      </label>

                      <h1 className="flex items-center gap-1.5">
                        <span className={`size-4 rounded bg-primary`}/>
                        
                        {transaction.category}
                      </h1>
                    </div>

                    <FileUpload attachments={transaction.attachment}/>

                    <div className="space-y-2">
                      <label className="text-sm flex items-center gap-1.5">
                        <Info className="size-4"/>
                        
                        Nota
                      </label>

                      <Textarea
                        defaultValue={transaction.note}
                        className="resize-none h-40"
                        placeholder="Escreva alguma nota"
                      />
                    </div>
                  </div>
              </div>
            </ScrollArea>

            <div className="px-6">
              <Button className="w-full">
                Salvar
              </Button>
            </div>
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}