import { Button } from "./ui/button";
import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "./ui/popover";

interface CategorysTypes {
  label: string;
  value: string;
  color: string;
}

const categorys: CategorysTypes[] = [
  { label: "Salário", value: "salary", color: "#84cc16" },
  { label: "Equipamento", value: "equipament", color: "#eab308" },
  { label: "Outro", value: "other", color: "#0ea5e9" },
]

export function CategoryFilter() {
  
  const [categorySelected, setCategorySelected] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      <label className="text-sm">
        Categoria
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="w-full justify-between border font-normal truncate">
            {categorySelected ? categorySelected : "Selecione a categoria"}

            <ChevronsLeftRight className="size-3 rotate-90 text-muted-foreground"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              value={searchTerm} 
              onValueChange={setSearchTerm}
            />
            <CommandList>
              <CommandEmpty className="p-1">
                <Button   
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5"
                  onClick={() => {
                    setOpen(false);
                    setCategorySelected(searchTerm);
                  }}
                >
                  Criar "{searchTerm}"
                </Button>
              </CommandEmpty>

              <CommandGroup>
                {categorys.map(category => (
                  <CommandItem  
                    key={category.value}
                    className="flex items-center gap-2 cursor-pointer"
                    onSelect={(e) => {
                      setOpen(false);
                      setCategorySelected(e)
                    }}
                  >
                    <span className={`size-4 rounded bg-[${category.color}]`}/>
                    
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}