const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar")
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar")
const ul = document.querySelector("ul")


const player = new MusicPlayer(musicList);

window.addEventListener("load", ()=>{
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
});

function displayMusic(music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "./assets/img/" + music.img;
    audio.src = "./assets/mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", ()=> {
    prevMusic();
});

next.addEventListener("click", ()=>{
    nextMusic();
});

function prevMusic(){
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function pauseMusic(){
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (totalsecond) => {
    const minute = Math.floor(totalsecond / 60);
    const second = Math.floor(totalsecond % 60);
    const updatesecond = second < 10 ? `0${second}`:`${second}`;
    const result = `${minute} : ${updatesecond}`;
    return result;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
})

progressBar.addEventListener("input", ()=>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

let soundsit = "soundon"

volumeBar.addEventListener("input", (e) =>{
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        audio.muted = true;
        soundsit = "soundoff";
        volume.classList = "fa-solid fa-volume-xmark";
    }
    else{
        audio.muted = false;
        soundsit = "soundon";
        volume.classList = "fa-solid fa-volume-high";
    }
})

volume.addEventListener("click", ()=>{
    if(soundsit ==="soundon"){
        audio.muted = true;
        soundsit = "soundoff";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    }
    else{
        audio.muted = false;
        soundsit = "soundon";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    for(let i=0; i<list.length; i++){
        let liTag =`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class = "music-${i}" src="./assets/mp3/${list[i].file}"></audio>
        </li>
        `;

        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);
        liAudioTag.addEventListener("loadeddata", () =>{
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
            //console.log(liAudioTag.duration);
        })

        
    }
}


/*player.next();
music = player.getMusic();
console.log(music.getName());

player.previous();
music = player.getMusic();
console.log(music.getName());
*/