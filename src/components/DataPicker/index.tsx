import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";

export default function DataPicker({ field }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? (
            format(field.value.toString(), "PPP", { locale: ptBR })
          ) : (
            <span>Escolha uma Data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 backdrop-blur-sm" align="start">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
