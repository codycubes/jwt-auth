import React, { useState } from 'react';
import { usePodcastStore } from '../store/podcast';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


interface Podcast {
  name: string;
  host: string;
  description: string;
  duration: string;
  image: string;
}

const CreatePodcast: React.FC = () => {
  const [newPodcast, setNewPodcast] = useState<Podcast>({
    name: '',
    host: '',
    description: '',
    duration: '',
    image: '',
  });

  const { createPodcast } = usePodcastStore();

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const { success } = await createPodcast(newPodcast);

    if (success) {
      toast.success("Podacast Created Successfully");
    } else {
      toast.error("An Error Occured on Creation");
    }

    setNewPodcast({ name: '', host: '', description: '', duration: '', image: '' });
  };

  return (
    <div className="min-h-screen text-white flex flex-col p-6">
      {/* Back Arrow */}
      <Link to={'/'}>
        <button className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center mb-6">
          <span className="text-5xl hover:scale-150">←</span>
        </button>
      </Link>

      {/* Title */}
      <h1 className="text-8xl font-bold mb-8">Create Podcast</h1>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleAddProduct}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={newPodcast.name}
            onChange={(e) => setNewPodcast({ ...newPodcast, name: e.target.value })}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Host */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="host">
            Host
          </label>
          <input
            id="host"
            name="host"
            type="text"
            required
            value={newPodcast.host}
            onChange={(e) => setNewPodcast({ ...newPodcast, host: e.target.value })}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            value={newPodcast.description}
            onChange={(e) => setNewPodcast({ ...newPodcast, description: e.target.value })}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="duration">
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            required
            value={newPodcast.duration}
            onChange={(e) => setNewPodcast({ ...newPodcast, duration: e.target.value })}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            name="image"
            type="text"
            required
            value={newPodcast.image}
            onChange={(e) => setNewPodcast({ ...newPodcast, image: e.target.value })}
            className="w-full bg-gray-800 p-2 rounded border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Podcast
        </button>
      </form>
    </div>
  );
};

export default CreatePodcast;
