import { useState } from "react";
import { useDates } from "../../hooks/useDates";
import { usePhotoContext } from "../../context/PhotoContext";

const Sidebar = () => {
    const [expandedRover, setExpandedRover] = useState<string | null>(null);
    const { data: dates } = useDates();
    const { setSelectedRover, setSelectedDate } = usePhotoContext();
    
    const rovers = ['Curiosity', 'Opportunity', 'Spirit', 'Perseverance'];

    const handleRoverClick = (rover: string) => {
      setSelectedRover(rover.toLowerCase());
      setSelectedDate('');
      setExpandedRover(expandedRover === rover ? null : rover);
    };

    const handleDateClick = (date: string) => {
      setSelectedDate(date);
    };
  
    return (
      <aside className="w-64 bg-slate-100 p-4 min-h-full">
        <div className="space-y-4">
          <div className="space-y-2">
            {rovers.map((rover) => (
              <div key={rover} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full p-3 flex justify-between items-center bg-white hover:bg-slate-50"
                  onClick={() => handleRoverClick(rover)}
                >
                  <span className="font-medium">{rover}</span>
                  <span className="transform transition-transform duration-200" style={{
                    transform: expandedRover === rover ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>
                    ▼
                  </span>
                </button>
                
                {expandedRover === rover && (
                  <div className="p-3 bg-white border-t">
                    <div className="space-y-2">
                      <div>
                        {dates?.dates?.length ? (
                          dates.dates.map((date) => (
                            <button
                              key={date}
                              onClick={() => handleDateClick(date)}
                              className="w-full text-left p-2 hover:bg-slate-50 rounded"
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