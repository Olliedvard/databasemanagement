import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();




const {Client} = pg;




const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST, 
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
});




export {pgPool}




const {client} =pgPool;




connect();

async function connect() {
    try {
        await client.connect();
        console.log('Database connected...');
        
    } catch (error) {
        console.log(error.message);
        
    }
};




res.json(result.rows)




app.get('/movies', async (req,res) => {
    try{
        const result = await pgPool.query("SELECT * FROM movies")
        res.json(result.rows)
        console.log(result)
    } catch(error) {
        console.log(error.message);
    }
})

res.json(result.rows[0]);

// ADD NEW MOVIE OMA
app.post('/addmovie', async (req, res) => {
    
    const name = req.body.movie_name
    const genreid = req.body.genre_id


    try{
        await pgPool.query('INSERT INTO movies (movie_name, genre_id) VALUES ($2, $3)', [name, genreid] )
        console.log("toimii");
        
        if(result.rows.length === 0)
            return res.status(404).json({ message: 'No Movie' });
        
    } catch(error) {
        console.log(error)
    }
})
