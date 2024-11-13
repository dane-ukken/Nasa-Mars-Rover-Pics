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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
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