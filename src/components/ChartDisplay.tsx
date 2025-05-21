
import { useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { TokenomicsEntry } from "@/types/tokenomics";
import { Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import html2canvas from "html2canvas";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type ChartDisplayProps = {
  entries: TokenomicsEntry[];
};

const ChartDisplay = ({ entries }: ChartDisplayProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // This function improves label positioning to prevent overlaps
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.3; // Increased distance from the pie even more
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show labels for segments with significant percentage
    return percent > 0.03 ? (
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="11"
        fontWeight="500"
      >
        {`${entries[index].label} (${(percent * 100).toFixed(0)}%)`}
      </text>
    ) : null;
  };

  const downloadChart = async () => {
    if (chartRef.current) {
      try {
        toast.info("Preparing your chart for download...");
        
        const canvas = await html2canvas(chartRef.current, {
          backgroundColor: "#FFFFFF", // Set white background for the downloaded chart
          scale: 2,
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "graphfi-tokenomics.png";
        link.href = image;
        link.click();
        
        toast.success("Chart downloaded successfully!");
      } catch (err) {
        console.error("Error downloading chart:", err);
        toast.error("Failed to download chart. Please try again.");
      }
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow-md border text-sm">
          <p className="font-medium">{data.label}</p>
          <p className="text-graphfi-purple font-bold">{data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Tokenomics Distribution</h3>
      </div>
      
      <ScrollArea className="flex-1 min-h-[300px] md:min-h-[350px] overflow-hidden">
        <div className="min-w-[500px] h-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={entries}
                cx="50%"
                cy="50%"
                labelLine={{
                  strokeWidth: 1,
                  stroke: "#888",
                  strokeDasharray: "2 2", // Optional: makes lines dashed for better visibility
                }}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="label"
                paddingAngle={2}
              >
                {entries.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex justify-center mt-6">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={downloadChart}
        >
          <Download className="h-4 w-4" />
          Download Chart
        </Button>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-xs truncate">{entry.label} ({entry.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
