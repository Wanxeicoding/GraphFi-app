
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import TokenomicsForm from '@/components/TokenomicsForm';
import ChartDisplay from '@/components/ChartDisplay';
import { TokenomicsEntry } from '@/types/tokenomics';
import Header from '@/components/Header';

const INITIAL_ENTRIES: TokenomicsEntry[] = [
  { id: "1", label: "Private Investors", percentage: 20, color: "#8B5CF6" },
  { id: "2", label: "Public Sale", percentage: 15, color: "#60A5FA" },
  { id: "3", label: "Team", percentage: 20, color: "#EC4899" },
  { id: "4", label: "Foundation", percentage: 25, color: "#F97316" },
  { id: "5", label: "Ecosystem", percentage: 20, color: "#10B981" },
];

const COLORS = [
  "#8B5CF6", // Purple
  "#60A5FA", // Blue
  "#EC4899", // Pink
  "#F97316", // Orange
  "#10B981", // Green
  "#FBBF24", // Yellow
  "#EF4444", // Red
  "#6B7280", // Gray
];

const Index = () => {
  const [entries, setEntries] = useState<TokenomicsEntry[]>(INITIAL_ENTRIES);
  const [showChart, setShowChart] = useState(false);
  
  const handleEntryChange = (updatedEntries: TokenomicsEntry[]) => {
    const entriesWithColors = updatedEntries.map((entry, index) => ({
      ...entry,
      color: entry.color || COLORS[index % COLORS.length]
    }));
    setEntries(entriesWithColors);
  };

  const handleGenerateChart = () => {
    const totalPercentage = entries.reduce((sum, entry) => sum + (Number(entry.percentage) || 0), 0);
    
    if (Math.abs(totalPercentage - 100) > 0.1) {
      toast.error(`Total percentage is ${totalPercentage.toFixed(1)}%. It should be 100%.`);
      return;
    }

    if (entries.some(entry => !entry.label || entry.label.trim() === '')) {
      toast.error("All entries must have a label.");
      return;
    }

    setShowChart(true);
    toast.success("Chart generated successfully!");
  };

  const resetForm = () => {
    setShowChart(false);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <Card className="p-4 md:p-6 card-shadow h-full">
              <h2 className="text-xl font-semibold mb-4">Tokenomics Distribution</h2>
              
              <TokenomicsForm 
                entries={entries} 
                onEntriesChange={handleEntryChange} 
              />
              
              <div className="mt-6 flex gap-4">
                <Button 
                  onClick={handleGenerateChart} 
                  className="bg-graphfi-purple hover:bg-graphfi-purple/90"
                >
                  Generate Chart
                </Button>
                
                {showChart && (
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </Card>
          </div>
          
          <div>
            <Card className={`p-4 md:p-6 h-full card-shadow flex flex-col justify-center items-center ${showChart ? '' : 'bg-muted/40'}`}>
              {showChart ? (
                <ChartDisplay entries={entries} />
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <p>Fill in your tokenomics details and generate a chart</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
