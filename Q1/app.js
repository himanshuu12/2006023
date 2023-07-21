const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  const promises = [];

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  for (const url of [].concat(urls)) {
    promises.push(axios.get(url).then(response => response.data.numbers));
  }

  try {
    const responses = await Promise.allSettled(promises);
    const numbers = responses.reduce((acc, response) => {
      if (response.status === 'fulfilled') {
        acc.push(...response.value);
      }
      return acc;
    }, []);

    const uniqueNumbers = [...new Set(numbers)].sort((a, b) => a - b);
    return res.json({ numbers: uniqueNumbers });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
