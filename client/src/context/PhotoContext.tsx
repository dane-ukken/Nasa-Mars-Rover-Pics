import { createContext, useContext, useState, ReactNode } from 'react';

type PhotoContextType = {
  selectedRover: string;
  selectedDate: string;
  setSelectedRover: (rover: string) => void;
  setSelectedDate: (date: string) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

type PhotoProviderProps = {
  children: ReactNode;
}

export const PhotoProvider = ({ children }: PhotoProviderProps) => {
  const [selectedRover, setSelectedRover] = useState<string>('curiosity');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const value = {
    selectedRover,
    selectedDate,
    setSelectedRover,
    setSelectedDate,
  };

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('PhotoProvider not found for usePhotoContext');
  }
  return context;
}; 