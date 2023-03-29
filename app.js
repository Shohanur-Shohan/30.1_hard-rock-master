document.getElementById('search-btn').addEventListener('click', function(){
    const searchData = document.getElementById('search-box').value;
    // console.log(searchData);

    fetch(`https://api.lyrics.ovh/suggest/${searchData}`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < 10; i++){
            // const user = data[i];
            // // console.log(user);
            //
            const songDetails = data.data[i];
            const songName = songDetails.title;
            // console.log('song name =', songName);
            const artistName = songDetails.artist.name;
            // console.log('artist name =', artistName);
            const songPreview = songDetails.preview;
            // console.log('artist name =', songPreview);
            // const songPreview = songDetails.link;
            // console.log('audio =', songPreview);
            // const songlink = `http://cdn-preview-4.deezer.com/stream/c-4bbcbad7c63500139522852bbb0cd9e7-4.mp3`;
            // console.log('artist name =', songlink);
            // document.getElementById('audiofile').innerHTML = songlink.value;

            const pushHere = document.getElementById('push');
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-sm-8">
                        <h3 class="lyrics-name">${songName}</h3>
                        <p class="author lead">Album by <span>${artistName}</span></p>
                        <audio controls>
                            <source src="${songPreview}" type="audio/mpeg">
                        </audio>
                        
                    </div>
                    <div class="col-sm-4 text-md-right text-center">
                        <button class="lyricsBtn">Get Lyrics</button>
                    </div>
                </div>
                
            `; 
            pushHere.appendChild(div);
           
        }
    })
    .catch(error => displayError('something went wrong'))

})
const getLyric = async (artist, title) => {
const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}

const displayLyrics = lyrics => {
const lyricsDiv = document.getElementById('song-lyrics');
lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}