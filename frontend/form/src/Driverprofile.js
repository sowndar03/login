import React, { useState, useEffect } from "react";
import Axios from "axios";

const JourneyDetails = () => {
  const [journeyDetails, setJourneyDetails] = useState([]);

  useEffect(() => {
    const fetchJourneyDetails = async () => {
      try {
        const response = await Axios.get("http://localhost:3032/api/journeydetails");
        setJourneyDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching journey details:", error);
      }
    };

    fetchJourneyDetails();
  }, []);

  {journeyDetails.map((journey, index) => {
    console.log(journey.name);
  })}

  return (
    <div>
      <h2>All Journey Details</h2>
      <ul>
      {journeyDetails.map((journey, index) => (
        <li key={index}>
          Name: {journey.Name}, Phone: {journey.Phoneno}, 
          Pickup Location: {journey.Pickuplocation}, 
          Drop Location: {journey.dropLocation}
        </li>
      ))}
      
      </ul>
    </div>
  );
};

export default JourneyDetails;
