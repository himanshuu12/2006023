import React, { useState } from 'react';
import axios from 'axios';

const TrainSchedule = () => {
  const [urls, setUrls] = useState('');
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/numbers?url=${urls}`);
      setNumbers(response.data.numbers);
    } catch (error) {
      console.error(error);
      setNumbers([]);
    }
  };

  return (
    <div>
      <h1>Train Schedule</h1>
      <label htmlFor="urls">Enter URLs (separated by comma):</label>
      <input type="text" id="urls" value={urls} onChange={(e) => setUrls(e.target.value)} />
      <button onClick={fetchNumbers}>Get Numbers</button>
      <p>Numbers: {numbers.join(', ')}</p>
    </div>
  );
};

export default TrainSchedule;