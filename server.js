const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;


const pool = new Pool({
  url: 'postgres://rutwgkkq:cXxE1qm9JAXDhWVh672U6dzq1d_Kyf0X@berry.db.elephantsql.com/rutwgkkq',
  port: 5432,
});

app.use(bodyParser.json());


app.get('/animals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Animal');
    res.json(rows);
  } catch (error) {
    console.error('Error getting animals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/animals', async (req, res) => {
  const { name, species, age } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO Animal (Name, Species, Age) VALUES ($1, $2, $3) RETURNING *',
      [name, species, age]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Error adding animal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/animals/:id', async (req, res) => {
  const animalID = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM Animal WHERE AnimalID = $1', [
      animalID,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Animal not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error getting animal by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/animals/:id', async (req, res) => {
  
});


app.delete('/animals/:id', async (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
