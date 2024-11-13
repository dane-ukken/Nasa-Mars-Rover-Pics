import { useState } from "react";
import { useDates } from "../../hooks/useDates";
import { usePhotoContext } from "../../context/PhotoContext";
import { useRovers } from "../../hooks/useRovers";

const Sidebar = () => {
    const [expandedRover, setExpandedRover] = useState<string | null>(null);
    const { data: dates } = useDates();
    const { data: roversData, isLoading: isLoadingRovers } = useRovers();
    const { setSelectedRover, setSelectedDate } = usePhotoContext();

    const handleRoverClick = (rover: string) => {
      setSelectedRover(rover.toLowerCase());
      setSelectedDate('');
      setExpandedRover(expandedRover === rover ? null : rover);
    };

    const handleDateClick = (date: string) => {
      setSelectedDate(date);
    };

    if (isLoadingRovers) {
      return (
        <aside className="w-64 bg-slate-100 p-4 min-h-full">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="h-12 bg-white rounded-lg shadow">
                  <div className="h-full flex items-center px-3">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      );
    }
  
    return (
      <aside className="w-64 bg-slate-100 p-4 min-h-full">
        <div className="space-y-4">
          <div className="space-y-2">
            {roversData?.rovers.map((rover) => (
              <div key={rover.id} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full p-3 flex justify-between items-center bg-white hover:bg-slate-50"
                  onClick={() => handleRoverClick(rover.name)}
                >
                  <span className="font-medium">{rover.name}</span>
                  <span className="transform transition-transform duration-200" style={{
                    transform: expandedRover === rover.name ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    ▼
                  </span>
                </button>
                
                {expandedRover === rover.name && (
                  <div className="p-3 bg-white border-t">
                    <div className="space-y-2">
                      <div>
                        {dates?.dates?.length ? (
                          dates.dates.map((date) => (
                            <button
                              key={date}
                              onClick={() => {
                                if (date >= rover.landing_date && date <= rover.max_date) {
                                  handleDateClick(date);
                                }
                              }}
                              className={`w-full text-left p-2 rounded ${
                                date >= rover.landing_date && date <= rover.max_date
                                  ? 'hover:bg-slate-50'
                                  : 'text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {date}
                            </button>
                          ))
                        ) : (
                          <div>No valid dates.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  };

export default Sidebar; 