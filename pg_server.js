import express from 'express' ;
import { pgPool } from './pg_connection.js';

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

connect();

async function connect() {
    try {
        await pgPool.connect();
        console.log('Database connected...');
        
    } catch (error) {
        console.log(error.message);
        
    }
};

// GET ALL MOVIES  /movies
app.get('/movies', async (req,res) => {
    try{
        const result = await pgPool.query('SELECT * FROM movies')
        res.json(result.rows)
        console.log(result)
    } catch(error) {
        console.log(error.message);
    }
})

// GET MOVIE BY ID  /movies/:id
app.get('/movies/:id', async (req, res) => {
    const id = Number(req.params.id)

    if(isNaN(id))
        return res.status(400)

    try{
        const result = await pgPool.query('SELECT * FROM movies WHERE movie_id=$1 ', [id] )
        if(result.rows.length === 0)
            return res.status(404).json({ message: 'Movie was not found' });
        res.json(result.rows[0]);
    } catch(error) {
        console.log(error.message)
    }
})

// ADD NEW MOVIE TO DATABASE
app.post("/addmovie", async (req, res) => {
    const {movie_name, genre_id} = req.body

    if (!movie_name || !genre_id) {
        console.log(movie_name, genre_id)
        return res.status(400).json({ message: 'Missing required fields' })
    } try {
        const result = await pgPool.query("SELECT MAX(movie_id) as largest_id FROM movies"); 
        const newId = parseInt(result.rows[0].largest_id, 10) + 1
    
        const result2 = await pgPool.query(
            "INSERT INTO movies (movie_id, movie_name, genre_id) VALUES ($1, $2, $3)",
            [newId, movie_name, genre_id]
        )
            
        console.log('Successfully added movie ' + movie_name)
        }  catch(error){
        console.log(error);       
    }

})

// DELETE MOVIE BY ID  /deletemovie/:id
app.get('/deletemovie/:id', async (req, res) => {
    const id = Number(req.params.id)

    if(isNaN(id))
        return res.status(400)
    try {
        const result = await pgPool.query('DELETE FROM movies WHERE movie_id=$1 ', [id] )
        
        if(result.rows.length === 0)
            return res.json({ message: 'Movie deleted' });
            console.log('Movie deleted');
            
    } catch(error) {
        console.log(error.message)
    }

})


// ROOT ENDPOINT
app.get('/', (req, res) => {
    res.send('<h1>This is root endpoint<h1>')
});

// USER ENDPOINT
app.get('/user', (req, res) => {
    res.send('User information')
});


