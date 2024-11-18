import React, { useState } from 'react';
import { usePodcastStore } from '../store/podcast';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface Podcast {
  name: string;
  host: string;
  description: string;
  genre: string;
  image: string;
}

const CreatePodcast: React.FC = () => {
  const [newPodcast, setNewPodcast] = useState<Podcast>({
    name: '',
    host: '',
    description: '',
    genre: '',
    image: '',
  });

  const { createPodcast } = usePodcastStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPodcast({ ...newPodcast, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPodcast = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const { success } = await createPodcast(newPodcast);

    if (success) {
      toast.success("Podcast Created Successfully");
    } else {
      toast.error("An Error Occurred on Creation");
    }

    setNewPodcast({ name: '', host: '', description: '', genre: '', image: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white font-raleway flex-col p-6">
      <Link to={'/'}>
        <button className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center mb-6">
          <span className="text-5xl hover:scale-150">←</span>
        </button>
      </Link>

      <h2 className="text-7xl my-10 font-black text-center">Create Podcast</h2>

      <form className="space-y-6" onSubmit={handleAddPodcast}>
        <div>
          <label className="block text-sm font-bold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={newPodcast.name}
            onChange={(e) => setNewPodcast({ ...newPodcast, name: e.target.value })}
            className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="host">
            Host
          </label>
          <input
            id="host"
            name="host"
            type="text"
            required
            value={newPodcast.host}
            onChange={(e) => setNewPodcast({ ...newPodcast, host: e.target.value })}
            className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            value={newPodcast.description}
            onChange={(e) => setNewPodcast({ ...newPodcast, description: e.target.value })}
            className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="genre">
            Genre
          </label>
          <input
            id="genre"
            name="genre"
            type="text"
            required
            value={newPodcast.genre}
            onChange={(e) => setNewPodcast({ ...newPodcast, genre: e.target.value })}
            className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            required
            onChange={handleImageChange}
            className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center w-full px-4 mb-8 py-2 font-bold text-white bg-red-700 border border-transparent rounded-full shadow-sm hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Create Podcast
        </button>
      </form>
    </div>
  );
};

export default CreatePodcast;
