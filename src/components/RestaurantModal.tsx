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
  onClose: () => void; // Function to close the modal
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurants, generatedImage, onClose }) => {
  return (
    <div className="restaurant-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Restaurants</h2>
        {restaurants.length > 0 ? (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <img src={restaurant.image_url} alt={restaurant.name} />
                <h3>{restaurant.name}</h3>
                <p>{`${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No restaurants found.</p>
        )}
        {generatedImage && (
          <div className="generated-image">
            <h3>Generated Image:</h3>
            <img src={generatedImage} alt="Generated" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantModal;
