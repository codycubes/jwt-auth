import React, { useEffect } from 'react';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store";
import { usePodcastStore } from '../store/podcast';
import { CgAdd } from 'react-icons/cg';
import { Link } from 'react-router-dom';

interface CardProps {
  _id: string;
  name: string;
  host: string;
  description: string;
  duration: string;
  image: string;
}


const Card: React.FC<CardProps> = ({ _id = "", name, duration, host, description, image }) => (
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
        fetchPodcasts()
    }, [fetchPodcasts])

    console.log("podcasts", podcasts)

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
const { userInfo } = useTypedSelector((state) => state.auth);
  return (
    <div className="container mx-auto p-4">
{/* {userInfo ? ( */}
           <div className="relative w-full h-[40vh] border-b-2 mb-20 overflow-hidden">
           <div className="absolute inset-0 flex justify-center items-end text-white z-10">
             <h1 className="text-7xl font-bold text-start w-full mb-20">
               Hello,  {userInfo?.name}
             </h1>
           </div>
         </div>

{/* ) : (null) } */}
 
      
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
            key={podcast._id}
            _id={podcast._id || ""}
            name={podcast.name}
            description={podcast.description}
            image={podcast.image}
            host={podcast.host}
            duration={podcast.duration}
          />
        ))}


        </div>
      </section>

      <section className="mb-8 ">
      <div className='flex justify-between text-3xl font-bold mb-10'>
        <h2 className="">Popular Podcasts</h2>
        <h2 className='text-base underline'>Show all</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {podcasts.map((podcast) => (
          <Card
            key={podcast._id}
            _id={podcast._id || ""}
            name={podcast.name}
            description={podcast.description}
            image={podcast.image}
            host={podcast.host}
            duration={podcast.duration}
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
            key={podcast._id}
            _id={podcast._id || ""}
            name={podcast.name}
            description={podcast.description}
            image={podcast.image}
            host={podcast.host}
            duration={podcast.duration}
          />
        ))}

        </div>
      </section>
    </div>
  );
};

export default Dashboard;
