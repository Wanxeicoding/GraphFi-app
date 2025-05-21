
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TokenomicsEntry } from "@/types/tokenomics";
import { Plus, Trash } from "lucide-react";

type TokenomicsFormProps = {
  entries: TokenomicsEntry[];
  onEntriesChange: (entries: TokenomicsEntry[]) => void;
};

const TokenomicsForm = ({ entries, onEntriesChange }: TokenomicsFormProps) => {
  const handleInputChange = (id: string, field: keyof TokenomicsEntry, value: string) => {
    const updatedEntries = entries.map(entry => {
      if (entry.id === id) {
        if (field === 'percentage') {
          // Ensure percentage is a valid number between 0 and 100
          const numValue = parseFloat(value);
          const validValue = isNaN(numValue) ? 0 : Math.min(Math.max(numValue, 0), 100);
          return { ...entry, [field]: validValue };
        }
        return { ...entry, [field]: value };
      }
      return entry;
    });
    
    onEntriesChange(updatedEntries);
  };

  const addEntry = () => {
    const newEntry: TokenomicsEntry = {
      id: Date.now().toString(),
      label: "",
      percentage: 0,
      color: "",
    };
    
    onEntriesChange([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    if (entries.length <= 1) {
      return; // Prevent removing the last entry
    }
    
    const updatedEntries = entries.filter(entry => entry.id !== id);
    onEntriesChange(updatedEntries);
  };

  const totalPercentage = entries.reduce((sum, entry) => sum + (Number(entry.percentage) || 0), 0);
  const isValidTotal = Math.abs(totalPercentage - 100) <= 0.1;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          <span>Total: </span>
          <span className={`ml-1 font-bold ${isValidTotal ? 'text-graphfi-green' : 'text-graphfi-red'}`}>
            {totalPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
        {entries.map((entry, index) => (
          <div key={entry.id} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-6 sm:col-span-7">
              <Input
                placeholder="Label (e.g. Private Investors)"
                value={entry.label}
                onChange={(e) => handleInputChange(entry.id, 'label', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="col-span-4 sm:col-span-4">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={entry.percentage}
                  min="0"
                  max="100"
                  step="0.1"
                  onChange={(e) => handleInputChange(entry.id, 'percentage', e.target.value)}
                  className="w-full pr-6"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>
            
            <div className="col-span-2 sm:col-span-1 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => removeEntry(entry.id)}
                disabled={entries.length <= 1}
              >
                <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addEntry}
        className="mt-2 text-xs"
      >
        <Plus className="h-3.5 w-3.5 mr-1" />
        Add Entry
      </Button>
    </div>
  );
};

export default TokenomicsForm;
