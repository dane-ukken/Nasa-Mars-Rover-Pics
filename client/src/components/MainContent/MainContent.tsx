import { useState } from 'react';
import Modal from '../Modal/Modal';
import { useRoverPhotos } from '../../hooks/usePhotos';
import { Photo } from '../../types/api';
import { usePhotoContext } from '../../context/PhotoContext';

const MainContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const { selectedRover, selectedDate} = usePhotoContext();

  const { isLoading, error, data: photos } = useRoverPhotos(selectedRover, selectedDate);

  const handleViewClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  if (!selectedDate) {
    return (
      <div className="text-gray-500 text-center p-4">
        Please select a date.
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="animate-pulse">
          <div className="h-12 bg-slate-200 w-3/4 mx-auto mb-8 rounded"></div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  {['ID', 'Camera', 'Image', 'Action'].map((header) => (
                    <th key={header} className="px-6 py-3 text-left">
                      <div className="h-4 bg-slate-200 w-16 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 w-16 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-slate-200 w-32 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-20 w-20 bg-slate-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 bg-slate-200 w-16 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading photos: {error.message}
      </div>
    );
  }

  if (!photos?.photos?.length) {
    return (
      <div className="text-gray-500 text-center p-4">
        No photos found for this date.
      </div>
    );
  }

  const photosList = photos.photos.map((photo) => {
    return photo;
  });

  return (
    <>
      <h2 className="text-4xl font-bold text-center py-4">{selectedRover.toUpperCase()} - {selectedDate}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Camera</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {photosList.map((photo) => (
              <tr key={photo.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {photo.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {photo.cameraFullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={photo.img_src} 
                    alt={`Mars rover ${photo.camera} camera`} 
                    className="h-20 w-20 object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewClick(photo)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPhoto && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={selectedPhoto.img_src}
          cameraFullName={selectedPhoto.cameraFullName}
          camera={selectedPhoto.camera}
          selectedRover={selectedRover}
          id={selectedPhoto.id.toString()}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
};

export default MainContent;