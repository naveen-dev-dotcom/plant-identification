import { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';


const plantData = [
  { name: "Ginger Root", src: "https://sketchfab.com/models/14d7deb215f84f6ea2c10a9da12e60fd/embed" },
  { name: "Aloe Vera", src: "https://sketchfab.com/models/66c6699e50ab4863989777f920a981dd/embed" },
  { name: "Mint Plant", src: "https://sketchfab.com/models/25837c82537c46e3ade674e0b8e99864/embed" },
  { name: "Holy Basil", src: "https://sketchfab.com/models/3272493ccf6c4ede895f259905ef1db8/embed" },
  { name: "Turmeric", src:"https://sketchfab.com/models/4109217edc144af397889e93d2bd5268/embed" },
  { name:"Coriander", src:"https://sketchfab.com/models/46189cef8027408db9518c63943cf74a/embed" },
  { name:"Fenugreek", src:"https://sketchfab.com/models/81f3b0e19eff4c6a985e5ddab4eb6559/embed" },
  { name:"Neem", src:"https://sketchfab.com/models/03edef8009d942d3a3db6fa64cecbe56/embed" },
  { name:"Lemongrass", src:"https://sketchfab.com/models/33e522407a9944b2b07f5e8facfc0f86/embed" },
  { name:"Chamomile", src:"https://sketchfab.com/models/a9beac7103f1435ea8ccd7d078c1f5e0/embed" },
  { name:"Lavender", src:"https://sketchfab.com/models/08f35ae30b924678955b4bb483b86a70/embed" },
  { name:"Thyme", src:"https://sketchfab.com/models/425ebb1bf98046169f7c24fd57266eb6/embed" },
  { name:"Rosemary", src:"https://sketchfab.com/models/e5cb5a1d273f46bcb8587079c13de8a5/embed" },
  { name:"Sage", src:"https://sketchfab.com/models/f41f028de9ca4be2b2e85df0820508ae/embed" },
  { name:"Oregano", src:"https://sketchfab.com/models/3b1a67311a354e1a9d18314d65c8f2d3/embed" },
  { name:"Cardamom", src:"https://sketchfab.com/models/7e84837fa85c4b56b751f51dccb5aee0/embed" },
  { name:"Camphor", src:"https://sketchfab.com/models/27a7a54347284fbebaf194808dddde34/embed" },
  { name:"California Poppy", src:"https://sketchfab.com/models/957a776310804d81a3ed9de7583558e0/embed" },
];

const ThreeDView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlants = plantData.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
   <div className="mb-6">
  {/* Title */}
  <h2 className="font-bold text-xl mb-4">🌱 Visual Garden</h2>

  {/* Search Bar */}
  <form
  className="relative transition-all duration-700 ease-in-out w-[50px] h-[50px] bg-gray-800 border-4 border-gray-600 rounded-full p-[5px] hover:w-full max-w-md mx-auto overflow-hidden"
  onSubmit={(e) => e.preventDefault()}
>
  {/* Input */}
  <input
  type="search"
  placeholder="Search here ..."
  className="absolute top-0 left-0 w-full h-full pl-5 pr-12 text-base font-bold rounded-full outline-none bg-gray-800 text-gray-300 placeholder-gray-400"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>


  {/* Icon */}
  <div className="absolute top-0 right-0 w-[42.5px] h-[42.5px] text-[#8c52ff] flex items-center justify-center rounded-full transition-all duration-700 hover:bg-[#8c52ff] hover:text-white">
    <MagnifyingGlassIcon className="w-5 h-5" />
  </div>
</form>
</div>
       {/* Plant Cards */}
  {filteredPlants.length > 0 ? (
    filteredPlants.map((plant, index) => (
      <div
        key={index}
        className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-800 mb-4"
      >
        <div className="sketchfab-embed-wrapper">
          <iframe
            title={plant.name}
            frameBorder="0"
            loading="lazy"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src={plant.src}
            style={{ width: "100%", height: "300px" }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-center py-2 text-lg font-semibold text-white rounded-b-xl shadow-md">
          {plant.name}
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No herbs found 😢</p>
  )}
  </div>
  );
};

export default ThreeDView;
