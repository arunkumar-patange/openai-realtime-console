import React from 'react';
import './RestaurantModal.scss'; // Import your styles

interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  location: {
    address1: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

interface RestaurantModalProps {
  restaurants: Restaurant[];
  generatedImage: string | null; // Add generated image prop
  searchResults: any[]; // Add this prop for search results
  onClose: () => void; // Function to close the modal
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurants, generatedImage, searchResults, onClose }) => {
  return (
    <div className="restaurant-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Restaurants</h2>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <h3>{restaurant.name}</h3>
              <img src={restaurant.image_url} alt={restaurant.name} />
              <p>{restaurant.location.address1}, {restaurant.location.city}</p>
            </li>
          ))}
        </ul>
        {generatedImage && (
          <div className="generated-image">
            <h3>Generated Image</h3>
            <img src={generatedImage} alt="Generated" />
          </div>
        )}
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <h3>{result.title}</h3> {/* Title of the search result */}
              <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a> {/* Link to the result */}
              <p>{result.content}</p> {/* Content snippet of the result */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantModal;
