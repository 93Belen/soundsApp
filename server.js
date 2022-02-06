import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
const api_key = process.env.API_KEY;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('public')
});

app.listen(3000, () => console.log('Listening to port 3000'));



// Fetch API to get sounds
app.get('/getUrls/:query', async (req, res) => {
    const query = req.params.query;

    const getCount = await fetch(`https://freesound.org/apiv2/search/text/?query=${query}&token=${api_key}&page_size=12&fields=count`);
    const countResponse = await getCount.json();
    const count = countResponse.count;
    console.log(count);

    const pages = Math.floor(count / 12);
    const page = Math.floor(Math.random() * pages);
    console.log(pages)
    console.log(page);

    const fetchSound = await fetch(`https://freesound.org/apiv2/search/text/?query=${query}&token=${api_key}&page=${page}&page_size=12&fields=id`);
    const response = await fetchSound.json();

    // Get info (id) of sounds related to query word
    //console.log(response);



    
    // Getting ids from response
    // use either response.results.length or a number
    const arrOfIds = [];
    for(let i = 0; i < response.results.length; i++){
        arrOfIds.push(response.results[i].id)
    }

    //console.log(arrOfIds);


    //Array that we will return
    const arrOfUrls = [];


    //use either number or arrOfIds.length
   for(let i = 0; i < arrOfIds.length; i++){
    const fetchUrl = await fetch(`https://freesound.org/apiv2/sounds/${arrOfIds[i]}/?token=${api_key}&fields=previews`);
    const response2 = await fetchUrl.json();
    
    //console.log(response2);


    arrOfUrls.push(response2.previews['preview-hq-mp3'])
    console.log(arrOfUrls);

   }


    res.send(arrOfUrls);



})


// Fetch API to get pictures
app.get('/pictures', async (req, res) => {

    // API key
    const api_key_photos = process.env.API_KEY_PHOTOS;
    // Fetch so I know how many pictures total
    const response = await fetch(`https://pixabay.com/api/?key=${api_key_photos}&per_page=10&image_type=photo&q=space&colors=blue,`);
    const jsonResponse = await response.json();

    const total = jsonResponse['totalHits'] / 10;
    const random = Math.floor(Math.random() * total);

    // Fetch random image from random page
    const fetchPicture = await fetch(`https://pixabay.com/api/?key=${api_key_photos}&per_page=10&page=${random}&image_type=photo&q=space&colors=blue`);
    const pictureResponse = await fetchPicture.json();
    //console.log(pictureResponse);

    //Get image url array
    const arrOfImages = [];

    for(let i = 0; i < 10; i++){
        arrOfImages.push(pictureResponse.hits[i].largeImageURL);

    }
    

    res.send(arrOfImages);
    //console.log(arrOfImages);



})