import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Smile } from "lucide-react";

export function FeedbackPopover() {
  return(
    <Popover>
      <PopoverTrigger className="hover:text-primary transition-colors">
        Feedback
      </PopoverTrigger>

      <PopoverContent className="space-y-4">
        <div>
          <h1 className="text-sm">Envie um feedback</h1>
          <h2 className="text-xs text-muted-foreground">Envie uma mensagem sobre o app</h2>
        </div>

        <Textarea
          placeholder="Envie uma mensagem"
          className="h-32 resize-none overflow-y-auto"
        ></Textarea>
        
        <div className="flex items-center justify-between">
          <Button size="sm">
            Enviar feedback
          </Button>

          <div className="flex items-center gap-1">
            <Smile className="size-4"/>

            <span className="text-[10px] px-2 py-1 bg-secondary rounded">⌘ + .</span>
          </div>
        </div>

      </PopoverContent>
    </Popover>
  );
}