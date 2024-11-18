import React, { useEffect } from 'react';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store';
import { usePodcastStore } from '../store/podcast';
import { CgAdd } from 'react-icons/cg';
import { Link } from 'react-router-dom';

interface CardProps {
  _id: string;"?>:lm"
  name: string;
  host: string;
  description: string;
  genre: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ _id, name, genre, host, description, image }) => (
  <Link to={`/podcast/${_id}`}>
    <div className="rounded-lg shadow-md text-start overflow-hidden">
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
    <div className="container font-raleway h-full p-4">
      <div className='flex justify-between mt-28 text-3xl font-bold mb-10'>
        <h2 className="">Browse By Genre</h2>
        <h2 className='text-base underline'>Show all</h2>
      </div>
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {podcasts.map((podcast) => (
            <Card
              key={podcast._id || podcast.name} // Provide fallback key
              _id={podcast._id || "default_id"} // Provide fallback _id
              name={podcast.name}
              description={podcast.description}
              image={podcast.image}
              host={podcast.host}
              genre={podcast.genre}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className='flex justify-between text-3xl font-bold mb-10'>
          <h2 className="">Popular Podcasts</h2>
          <h2 className='text-base underline'>Show all</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {podcasts.map((podcast) => (
            <Card
              key={podcast._id || podcast.name} // Provide fallback key
              _id={podcast._id || "default_id"} // Provide fallback _id
              name={podcast.name}
              description={podcast.description}
              image={podcast.image}
              host={podcast.host}
              genre={podcast.genre}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className='flex justify-between text-3xl font-bold mb-10'>
          <h2 className="">Recommended For You</h2>
          <h2 className='text-base underline'>Show all</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {podcasts.map((podcast) => (
            <Card
              key={podcast._id || podcast.name} // Provide fallback key
              _id={podcast._id || "default_id"} // Provide fallback _id
              name={podcast.name}
              description={podcast.description}
              image={podcast.image}
              host={podcast.host}
              genre={podcast.genre}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
