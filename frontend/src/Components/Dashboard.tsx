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
    <div className="rounded-lg shadow-md text-start overflow-hidden h-auto p-4 hover:bg-zinc-900">
      <img src={image} alt={name} className="w-full rounded-xl sm:h-72 object-cover" />
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

  return (
    <div className="font-raleway w-full h-full p-4">
      <div className='flex mt-10 mb-10'>
        <PodcastCategories />
        <Link to={'/createpodcast'}>
          <div className='flex items-center justify-end hover:cursor-pointer'>
            <CgAdd size={35} />
          </div> 
        </Link>
      </div>
  
      <section className="mb-8">
        <div className='flex justify-between text-3xl font-bold mb-10'>
          <h2 className="">Recently Played</h2>
          <h2 className='text-base underline'>Show all</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {podcasts.slice(0, 3).map((podcast) => (
            <Card
              key={podcast._id || podcast.name}
              _id={podcast._id || "111"} 
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
              key={podcast._id || podcast.name}
              _id={podcast._id || "default_id"} 
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
              key={podcast._id || podcast.name}
              _id={podcast._id || "default_id"} 
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
