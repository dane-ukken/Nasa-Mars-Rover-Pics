import { useEffect } from 'react';
import { downloadImage } from '../../utils/downloadUtils';
import { marsPhotosApi } from '../../services/api/marsPhotosApi';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  cameraFullName: string;
  camera: string;
  selectedRover: string;
  id: string;
  selectedDate: string;
}

const Modal = ({ isOpen, onClose, imageUrl, cameraFullName, camera, selectedRover, id, selectedDate }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDownload = async () => {
    try {
      const fileName = `mars-rover-${selectedRover}-${camera.toLowerCase()}-${id}.png`;
      await downloadImage(imageUrl, fileName);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleSaveToServer = async () => {
    console.log('Save to server');
    await marsPhotosApi.savePhotoToServer(imageUrl, camera, id, selectedRover, selectedDate);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999]">
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
          <div 
            className="relative bg-white rounded-lg w-full max-w-4xl pointer-events-auto 
                       shadow-[0_0_40px_rgba(0,0,0,0.2)] transform transition-all duration-300"
          >
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex flex-col items-left gap-4">
                    <h3 className="text-xl font-semibold">
                        Camera: {cameraFullName}
                    </h3>
                    <h3 className="text-xl font-semibold">
                        ID: #{id}
                    </h3>
                </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSaveToServer}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm
                           transition-colors duration-200 flex items-center gap-2"
                  aria-label="Download image"
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Save To Server
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm
                           transition-colors duration-200 flex items-center gap-2"
                  aria-label="Download image"
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download Image
                </button>
                
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none 
                           transition-colors duration-200 p-2 rounded-full 
                           hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <svg 
                    className="h-6 w-6" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Mars rover ${camera} camera view`}
                  className="w-full h-full object-contain max-h-[70vh]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;