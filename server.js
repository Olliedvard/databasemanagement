import express from 'express' ;

var app = express();


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



app.get('/', (req, res) => {
    res.send('<h1>root endpoint<h1>')
});

app.get('/user', (req, res) => {
    res.send('Getting user information')
});


app.get('/movies', (req, res) => {
    res.send('Getting movies information')
});