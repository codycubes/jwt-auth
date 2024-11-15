import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePodcastStore } from '../store/podcast';
import { toast } from 'react-toastify';

interface Podcast {
  _id: string;
  name: string;
  host: string;
  image: string;
  description: string;
}

const ViewPodcast: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const { podcasts, deletePodcast, updatePodcast } = usePodcastStore();
  const podcast: Podcast | undefined = podcasts.find(podcast => podcast._id === _id);

  const [updatedPodcast, setUpdatedPodcast] = useState<Podcast | null>(podcast || null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const navigate = useNavigate()
  if (!podcast) return <div>Podcast not found</div>;



  const handleDeletePodcast = async (pid: string) => {
    const { success } = await deletePodcast(pid);
    if (success) {
      toast.success("Successfully Deleted");
      
      navigate(`/podcast/${_id}`); 
    } else {
      toast.error("Could Not Remove Podcast");
    }
  };
  

  

  const handleUpdatePodcast = async (pid: string, updatedPodcast: Podcast) => {
    const { success, message } = await updatePodcast(pid, updatedPodcast);
    if (success) {
      toast.success("Successfully Updated");
    } else {
      toast.error("Could Not Update Podcast");
    }
    
  };

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedPodcast(prevState => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleSave = () => {
    if (updatedPodcast) {
      handleUpdatePodcast(podcast._id, updatedPodcast);
      closeEditPopup();
    }
  };

  return (
    <div className="w-full h-full min-h-screen p-8 text-white">
      <div className="flex items-center mb-8">
        <img
          src={podcast.image}
          alt="Podcast Cover"
          className="w-56 h-56 object-cover rounded-lg shadow-lg"
        />
        <div className="ml-8">
          <h1 className="text-4xl font-bold">{podcast.name}</h1>
          <h2 className="text-2xl mt-2">{podcast.host}</h2>
        </div>
      </div>

      <div className='flex gap-5'>
        <button className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200">
          Following
        </button>

        <button onClick={openEditPopup} className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200">
          Edit
        </button>

        <button onClick={() => handleDeletePodcast(podcast._id)} className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200">
          Delete
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold">About</h3>
        <p className="mt-4 text-lg">
          {podcast.description}
        </p>
      </div>

      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Podcast</h2>
            <input
              name="name"
              value={updatedPodcast?.name || ''}
              onChange={handleChange}
              className="border p-2 mb-4 w-full"
              placeholder="Podcast Name"
            />
            <input
              name="host"
              value={updatedPodcast?.host || ''}
              onChange={handleChange}
              className="border p-2 mb-4 w-full"
              placeholder="Podcast Host"
            />
            <input
              name="image"
              value={updatedPodcast?.image || ''}
              onChange={handleChange}
              className="border p-2 mb-4 w-full"
              placeholder="Podcast Image URL"
            />
            <textarea
              name="description"
              value={updatedPodcast?.description || ''}
              onChange={handleChange}
              className="border p-2 mb-4 w-full"
              placeholder="Podcast Description"
            />
            <div className="flex gap-4">
              <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-full">
                Save
              </button>
              <button onClick={closeEditPopup} className="bg-gray-300 text-black py-2 px-4 rounded-full">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPodcast;
