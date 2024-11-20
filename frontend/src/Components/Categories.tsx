import React from 'react';

interface Category {
  name: string;
  imageUrl: string;
}

const categories: Category[] = [
  { name: 'Podcast Charts', imageUrl: '/PNC.jfif' },
  { name: 'Comedy', imageUrl: 'path/to/comedy.jpg' },
  { name: 'Educational', imageUrl: 'path/to/educational.jpg' },
  { name: 'True Crime', imageUrl: 'path/to/true-crime.jpg' },
  { name: 'Sports', imageUrl: 'path/to/sports.jpg' },
  { name: 'Stories', imageUrl: 'path/to/stories.jpg' },
  { name: 'Music', imageUrl: 'path/to/music.jpg' },
  { name: 'Arts & Entertainment', imageUrl: 'path/to/arts-entertainment.jpg' },
];

const PodcastCategories: React.FC = () => {
  return (
    <div className="container mb-5">
      {/* <h1 className="text-3xl font-bold mb-4">Podcast Categories</h1> */}
      <div className="flex gap-4">
        {categories.map((category) => (
          <div key={category.name} className="bg-red-600    shadow rounded-lg overflow-hidden hover:scale-105 hover:cursor-pointer">
            {/* <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover" /> */}
            <div className="px-4 py-2">
              <h2 className="text-sm font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastCategories;
