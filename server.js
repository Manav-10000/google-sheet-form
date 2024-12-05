import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // To make API requests

const app = express();
app.use(express.static('public')); // Serve frontend files
app.use(bodyParser.json());

const PORT = 3000;

// SheetDB API Endpoint
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/oo2hlpx0602t5'; // SheetDB API URL

app.post('/submit', async (req, res) => {
  const { name, email, age } = req.body;

  try {
    // Send data to SheetDB
    const response = await fetch(SHEETDB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ Name: name, Email: email, Age: age }]),
    });

    if (response.ok) {
      res.status(200).send('Data submitted successfully!');
    } else {
      throw new Error('Error sending data to SheetDB');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error writing to Google Sheets');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
