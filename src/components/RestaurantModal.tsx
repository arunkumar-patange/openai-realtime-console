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
  imageSearchResults: any[]; // Add this prop for image search results
  displayMode: 'restaurants' | 'generatedImage' | 'searchResults' | 'imageSearch' | null; // Allow null
  onClose: () => void; // Function to close the modal
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurants, generatedImage, searchResults, imageSearchResults, displayMode, onClose }) => {
  return (
    <div className="restaurant-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        
        {/* Render based on display mode */}
        {displayMode === 'imageSearch' && (
          <>
            <h2>Image Search Results</h2>
            <ul>
              {imageSearchResults.map((imageResult, index) => (
                <li key={index}>
                  <h3>{imageResult.title}</h3>
                  <img src={imageResult.image.thumbnailLink} alt={imageResult.title} />
                  <p>{imageResult.snippet}</p>
                  <a href={imageResult.link} target="_blank" rel="noopener noreferrer">View Image</a>
                </li>
              ))}
            </ul>
          </>
        )}
        
        {displayMode === 'restaurants' && restaurants.length > 0 && (
          <>
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
          </>
        )}
        
        {displayMode === 'generatedImage' && generatedImage && (
          <div className="generated-image">
            <h3>Generated Image</h3>
            <img src={generatedImage} alt="Generated" />
          </div>
        )}
        
        {displayMode === 'searchResults' && searchResults.length > 0 && (
          <>
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
          </>
        )}
        
        {/* Optional: Message when nothing is available */}
        {displayMode === null && (
          <p>No results to display.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantModal;
