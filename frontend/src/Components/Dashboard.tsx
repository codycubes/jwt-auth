import React, { useEffect } from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store';
import { usePodcastStore } from '../store/podcast';
import { CgAdd } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import PodcastCategories from './Categories';

interface CardProps {
  _id: string;
  name: string;
  host: string;
  description: string;
  genre: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ _id, name, genre, host, description, image }) => (
  <Link to={`/podcast/${_id}`}>
    <div className="rounded-lg shadow-md text-start overflow-hidden p-4 hover:bg-slate-900">
      <img src={image} alt={name} className="w-full h-32 sm:h-48 object-cover" />
      <div className="py-4">
        <h2 className="font-bold text-lg">{name}</h2>
        <p>{host}</p>
      </div>
    </div>
  </Link>
);

const Dashboard: React.FC = () => {
  const { fetchPodcasts, podcasts } = usePodcastStore();

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { userInfo } = useTypedSelector((state) => state.auth);

  console.log("podcasts", podcasts); // Log podcasts to identify missing _id

  return (
    <div className="container font-oswald h-full p-4">
      <div className='flex justify-between mt-28 text-3xl font-bold mb-10'>
        <h2 className="">Categories</h2>
        <h2 className='text-base underline'>Show all</h2>
      </div>

      <PodcastCategories />
      
      <section className="mb-8">
        <Link to={'/createpodcast'}>
          <div className='flex items-center justify-end mb-10 hover:cursor-pointer'>
            <CgAdd size={35} />
          </div> 
        </Link>

        <div className='flex justify-between text-3xl font-bold mb-10'>
          <h2 className="">Recently Played</h2>
          <h2 className='text-base underline'>Show all</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {podcasts.map((podcast) => (
            <Card
              key={podcast._id || podcast.name} // Provide fallback key
              _id={podcast._id || "111"} // Provide fallback _id
              name={podcast.name || "Unnamed Podcast"}
              description={podcast.description || "No Description"}
              image={podcast.image || "default_image_url"}
              host={podcast.host || "Unknown Host"}
              genre={podcast.genre || "Uncategorized"}
            />
          ))}
        </div>
      </section>


      <section className="mb-8">
        <div className='flex justify-between text-3xl font-bold mb-10'>
          <h2 className="">Popular Podcasts</h2>
          <h2 className='text-base underline'>Show all</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {podcasts.map((podcast) => (
            <Card
              key={podcast._id || podcast.name} // Provide fallback key
              _id={podcast._id || "default_id"} // Provide fallback _id
              name={podcast.name || "Unnamed Podcast"}
              description={podcast.description || "No Description"}
              image={podcast.image || "default_image_url"}
              host={podcast.host || "Unknown Host"}
              genre={podcast.genre || "Uncategorized"}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className='flex justify-between text-3xl font-bold mb-10'>
          <h2 className="">Recommended For You</h2>
          <h2 className='text-base underline'>Show all</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {podcasts.map((podcast) => (
            <Card
              key={podcast._id || podcast.name} // Provide fallback key
              _id={podcast._id || "default_id"} // Provide fallback _id
              name={podcast.name || "Unnamed Podcast"}
              description={podcast.description || "No Description"}
              image={podcast.image || "default_image_url"}
              host={podcast.host || "Unknown Host"}
              genre={podcast.genre || "Uncategorized"}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
