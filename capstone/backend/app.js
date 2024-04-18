const express = require('express');
const mongooseConnection = require('./mongoose')
const app = express();
const bookRoutes = require('./routes/bookRoutes');

//Define middlewate to parse incoming request bodies as JSON and hadle CORS:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', bookRoutes)

//Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Start the server and have it listen for incoming requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is listening on port ${PORT}');
});