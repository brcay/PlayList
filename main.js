// Elementler

const prevButton = document.getElementById("prev")
const nextButton = document.getElementById("next")
const repeatButton = document.getElementById("repeat")
const shuffleButton = document.getElementById("shuffle")
const audio = document.getElementById("audio")
const songImage = document.getElementById("song-image")
const songName = document.getElementById("song-name")
const songArtist = document.getElementById("song-artist")
const pauseButton = document.getElementById("pause")
const playButton = document.getElementById("play")
const playListButton = document.getElementById("playlist")

const maxDuration = document.getElementById("max-duration")
const currentTimeRef = document.getElementById("current-time")

const progressBar = document.getElementById("progress-bar")
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById("close-button")
const playListSongs = document.getElementById("playlist-songs")

const currentProgress = document.getElementById("current-progress")

//sira
let index

//döngü
let loop = true

//liste
const songsList = [
    {
        name: "Siz Bana Aldırmayın",
        link: "assets/dktt.mp3",
        artist: "Dolu Kadehi Ters Tut",
        image: "assets/dktt.jpg"
    },
    {
        name: "Dal",
        link: "assets/adamlar.mp3",
        artist: "Adamlar",
        image: "assets/adamlar.jpg"
    },
    {
        name: "Bul Beni",
        link: "assets/köfn.mp3",
        artist: "Köfn",
        image: "assets/köfn.jpg"
    },
    {
        name: "Dip",
        link: "assets/madrigal.mp3",
        artist: "Madrigal",
        image: "assets/madrigal.jpg"
    },
    {
        name: "Derin",
        link: "assets/ikiyeOnKala.mp3",
        artist: "İkiye On Kala",
        image: "assets/ikiyeOnKala.jpg"
    }
]

// İçerik atama 
const setSong = (arrayIndex) => {
    console.log(arrayIndex)
    let {name, link, artist, image} = songsList[arrayIndex]
    audio.src = link;
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

// time
audio.onloadedmetadata = () =>{
    maxDuration.innerText = timeFormatter(audio.duration)
    }

    playListContainer.classList.add('hide')
    playAudio()
}

// time format
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput/60) // 3.25
    minute = minute < 10 ? "0"+minute : minute
    let second = Math.floor(timeInput % 60) // 25
    second = second < 10 ? "0"+second : second
    return `${minute}:${second}`
}

//playButton
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}

//pauseButton
const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")
}

// nextButton
const nextSong = () =>{
    if (loop) {
        if(index == (songsList.length -1)) {
            index = 0
        }
        else {
            index += 1
        }
    }
    else {
        let randIndex = Math.floor(Math.random()*songsList.length*10)
        index = randIndex
    }
    setSong(index)
    playAudio()
}

//prevButton
const previousSong = () =>{
    pauseAudio()
    if(index>0) {
        index -= 1
    }
    else{
        index = songsList.length -1
    }
    setSong(index)
    playAudio()
}

// playButton click
playButton.addEventListener("click",playAudio)

// pauseButton click
pauseButton.addEventListener("click", pauseAudio)

// nextButton click
nextButton.addEventListener("click", nextSong)

// prevButton click
prevButton.addEventListener("click",previousSong)

// shuffleButton click
shuffleButton.addEventListener("click",() =>{
    if(shuffleButton.classList.contains("active")){
        shuffleButton.classList.remove("active")
        loop = true
    }
    else{
        shuffleButton.classList.add("active")
        loop = false
    }
})

// repeatButton click
repeatButton.addEventListener("click",() =>{
    if(repeatButton.classList.contains("active")){
        repeatButton.classList.remove("active")
        loop = false
    }
    else{
        repeatButton.classList.add("active")
        loop = true
    }
})

//progress bar click (grey area)
progressBar.addEventListener("click",(event) =>{

    //Start - left
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)
    console.log("coordStart: " + coordStart)

    //Finish
    let coordEnd = event.clientX
    console.log(coordEnd)
    console.log("coordEnd: " + coordEnd)

    console.log("progressBar.offsetWidth: " + progressBar.offsetWidth)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    currentProgress.style.width = progress * 100 + "%"

    //time update
    audio.currentTime = progress * audio.duration //300

    //play
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
})

//Ekran yüklenince
setInterval(() =>{
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime/audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

//Zaman güncellendiğinde
 audio.addEventListener("timeupdate",() =>{
        currentTimeRef.innerText = timeFormatter(audio.currentTime)
 })

//liste acma butonuna tiklanildiginda
playListButton.addEventListener("click",()=>{
    playListContainer.classList.remove("hide")
})

//oynatma listesini kapata tiklanildiginda
closeButton.addEventListener("click",()=>{
    playListContainer.classList.add("hide")
})


 //Sonraki şarkıya geç
audio.onended = () =>{
    nextSong()
}

//Oynatma listesini oluştur
const initializePlaylist = () =>{
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `
    }
}

//Ekran yüklendiğinde
window.onload = () =>{
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}