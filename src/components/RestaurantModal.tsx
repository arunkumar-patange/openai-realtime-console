import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './RestaurantModal.scss'; // Import your styles
import CalendarPage from '../pages/CalendarPage'; // Corrected import statement
import AlgorandPage from '../pages/AlgorandPage'; // Corrected import statement

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

interface Flight {
  id: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  airlines: {
    code: string;
    name: string;
    icon: string;
    from: string;
    fromCity: string;
    to: string;
    toCity: string;
    departureTime: {
      dateTimeString: string;
    };
    arrivalTime: {
      dateTimeString: string;
    };
    duration: number;
    flightNumber: string;
    cabinClassText: string;
  }[];
  departureTime: {
    dateTimeString: string;
  };
  arrivalTime: {
    dateTimeString: string;
  };
  price: number;
}

type DisplayMode =
  | 'restaurants'
  | 'generatedImage'
  | 'searchResults'
  | 'imageSearch'
  | 'flights'
  | 'calendar'
  | 'algorand'
  | 'generalReSearch'
  | null;

interface RestaurantModalProps {
  restaurants: Restaurant[];
  generatedImage: string | null; // Add generated image prop
  searchResults: any[]; // Add this prop for search results
  imageSearchResults: any[]; // Add this prop for image search results
  flights: any[]; // Add this prop for flight search results
  generalReSearchResult: string;
  displayMode: any;
  onClose: () => void; // Function to close the modal
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({
  restaurants,
  generatedImage,
  searchResults,
  imageSearchResults,
  flights,
  generalReSearchResult,
  displayMode,
  onClose
}) => {
  const [history, setHistory] = useState<DisplayMode[]>([displayMode]); // State to maintain history
  const [currentIndex, setCurrentIndex] = useState(0); // Current index in history

  useEffect(() => {
    setHistory((prev) => [...prev.slice(0, currentIndex + 1), displayMode]); // Update history on displayMode change
    setCurrentIndex((prev) => prev + 1); // Move to the new index
  }, [displayMode]);

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="xrestaurant-modal restaurant-block">
      <div className="xmodal-content block-content">
        <span className="close" onClick={onClose}>&times;</span>

        {/* Navigation buttons */}
        <button onClick={goBack} disabled={currentIndex === 0}>Back</button>
        <button onClick={goForward} disabled={currentIndex === history.length - 1}>Forward</button>

        {/* Render based on current display mode */}
        {history[currentIndex] === 'imageSearch' && (
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

        {history[currentIndex] === 'generalReSearch' && (
        <>
          <h2>Research Topic</h2>
          <div dangerouslySetInnerHTML={{ __html: generalReSearchResult }} />
          {/*<ReactMarkdown>
            {generalReSearchResult}
          </ReactMarkdown>*/}
        </>
      )}
        
        {history[currentIndex] === 'restaurants' && restaurants.length > 0 && (
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
        
        {history[currentIndex] === 'generatedImage' && generatedImage && (
          <div className="generated-image">
            <h3>Generated Image</h3>
            <img src={generatedImage} alt="Generated" />
          </div>
        )}
        
        {history[currentIndex] === 'searchResults' && searchResults.length > 0 && (
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

        {history[currentIndex] === 'flights' && flights.length > 0 && (
          <>
            <h2>Flight Search Results</h2>
            <ul>
              {flights.map((flight) => (
                <li key={flight.id}>
                  <h3>{flight.fromCity} to {flight.toCity}</h3>
                  <p>Flight Number: {flight.airlines[0].flightNumber} - {flight.airlines[0].name}</p>
                  <p>Departure: {flight.departureTime.dateTimeString}</p>
                  <p>Arrival: {flight.arrivalTime.dateTimeString}</p>
                  <p>Duration: {Math.floor(flight.duration / 60)}h {flight.duration % 60}m</p>
                  <p>Price: ${flight.price}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {history[currentIndex] === 'calendar' && (
          <CalendarPage /> // Render the CalendarPage component
        )}

        {history[currentIndex] === 'algorand' && (
          <AlgorandPage /> // Render the AlgorandPage component
        )}
        
        {/* Optional: Message when nothing is available */}
        {history[currentIndex] === null && (
          <p>No results to display.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantModal;
