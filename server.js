import express from 'express';
import dotenv from 'dotenv';

//start Server
const app = express();
const port = 3030;
// Load environment variables
dotenv.config({ path: '.env' });

app.use(express.static('public'));
app.use(express.json());

//Home route
app.get('/', (req, res) => {
    return res.sendFile('index.html', { root: 'public' });
});

app.listen(port); // Start server on
console.log('Server started at ' + port);

