import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAirportSearch } from "@/hooks/use-airport-search"

interface SelectedAirport {
  skyId: string
  entityId: string
}

interface AirportSelectProps {
  value: string
  onChange: (airport: SelectedAirport | null) => void
  placeholder?: string
  icon?: React.ReactNode
}

export function AirportSelect({ value, onChange, placeholder, icon }: AirportSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const { data, isLoading } = useAirportSearch(search)

  const airports = data?.data || []
  const selectedAirport = airports.find((airport) => airport.navigation.relevantFlightParams.skyId === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex items-center gap-2">
            {icon}
            {selectedAirport ? (
              <div className="text-left">
                <div>{selectedAirport.presentation.title}</div>
                <div className="text-xs text-muted-foreground">{selectedAirport.presentation.subtitle}</div>
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search airports..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                "No airports found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {airports.map((airport) => (
                <CommandItem
                  key={airport.navigation.relevantFlightParams.skyId}
                  value={airport.navigation.relevantFlightParams.skyId}
                  onSelect={() => {
                    onChange({
                      skyId: airport.navigation.relevantFlightParams.skyId,
                      entityId: airport.navigation.relevantFlightParams.entityId,
                    })
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === airport.navigation.relevantFlightParams.skyId ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div>
                    <div>{airport.presentation.title}</div>
                    <div className="text-xs text-muted-foreground">{airport.presentation.subtitle}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

