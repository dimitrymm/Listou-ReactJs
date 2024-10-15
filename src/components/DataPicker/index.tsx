import { useState } from "react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";

export default function DataPicker() {
  const [date, setDate] = useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Escolha uma Data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 backdrop-blur-sm" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
