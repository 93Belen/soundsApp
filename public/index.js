const form = document.getElementById('form');
const audios = document.getElementById('audios');


// GET SOUNDS
async function getSounds(){
    const query = document.getElementById('query').value;
    const response = await fetch(`/getUrls/${query}`);
    const json = await response.json();
    //console.log(json);
    for(let i = 0; i < json.length; i++){
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.loop = true;
    audios.appendChild(audio).id = 'audio' + i;
    document.getElementById('audio' + i).className = 'audio';
    document.getElementById('audio' + i).src = json[i];
    }

    //return json;
}

let handler;





// EVENT
form.addEventListener('submit', handler = (e) => { 
    e.preventDefault();
     //reset form
     if(audios.childNodes.length != 0){
        while(audios.firstChild){
            audios.removeChild(audios.firstChild);
        }
    }
    //fetch 
    getSounds();
    console.log('Form has been submited!');

})



// GET PICTURES
async function getPictures(){
    const response = await fetch(`/pictures`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    let random = Math.floor(Math.random() * 10);

    document.querySelector('body').style.backgroundImage = `url('${jsonResponse[random]}')`;

}


//change background periodically

    
    //document.querySelector('body').style.backgroundImage = `url('${jsonResponse[i]}')`

// Get pictures in background
getPictures();

//setInterval(getPictures, 8000)




