console.log("Welcome to Spotify");
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    { songName: "Jaadui - Tu Jhoothi me Makkar", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    { songName: "Rabba Janda - Mission Majnu", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    { songName: "Heeriye Heeriye", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    { songName: "Tu hai to mujhe phir aur kya chahiye", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    { songName: "Ram siya ram - Aadipurush", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    { songName: "Kesariya - Arjit Singh", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    { songName: "Tere hawale - Arjit Singh", filePath:"songs/7.mp3", coverPath: "covers/7.jpg"},
    { songName: "Pyar hota kayi baar hai", filePath:"songs/8.mp3", coverPath: "covers/8.jpg"},
    { songName: "Kahani Suno", filePath:"songs/9.mp3", coverPath: "covers/9.jpg"},
    { songName: "Maan meri jaan - King", filePath:"songs/10.mp3", coverPath: "covers/10.jpg"},
    
    
]
 
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
}) 

// audioElement.play()

//Handle Play/pause click
masterPlay.addEventListener('click', ()=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
})



//Listen to event

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');

    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) /100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })  
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src =`songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = '0';
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })

})

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>=10) {
        songIndex = 0;
        
    }else{
    songIndex += 1;
    }
    audioElement.src =`songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = '0';
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex<= 0) {
        songIndex = 1;
        
    }else{
    songIndex -= 1;
    }
    audioElement.src =`songs/${songIndex}.mp3`;
    audioElement.currentTime = '0';
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

audioElement.addEventListener('ended', () => {
    pauseSong();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 0;
});
           
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      event.preventDefault(); // Prevent the default space bar behavior (e.g., scrolling)
      if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        syncPlayButton();
      } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        syncPlayButton();
      }}
    else if (event.code === 'ArrowLeft') {
        // Handle backward action
        audioElement.currentTime -= 5;} // Go back 5 seconds
    else if (event.code === 'ArrowRight') {
        // Handle forward action
        audioElement.currentTime += 5; // Go forward 5 seconds
      }
    }
  );