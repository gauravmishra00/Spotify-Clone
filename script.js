// ole.log("Script is attached");


let songList = document.querySelectorAll(".songs ul li a");

let songsArray = Array.from(songList).map(a => a.getAttribute("href"));
// console.log(songsArray)
let audioPlayer = document.getElementById("audioPlayer")
let playPauseBtn = document.getElementById("playPauseBtn")
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");


let currentSongIndex = 0
let currentPosition = 0;

// let songName = document.querySelectorAll(".show-song-name");
let displaySongName = document.getElementById("show-song-name")

function getSongName(songPath) {
    let songName = songPath.split("/").pop();
    return songName.replace(".mp3", "");
}
// songName.innerText = "Hello"
function playSong(index) {
    if (index < 0)
        index - songsArray.length - 1;
    if (index >= songsArray.length)
        index = 0;
    currentSongIndex = index
    audioPlayer.src = songsArray[currentSongIndex];
    audioPlayer.play();
    // Change the play btn text
    // playPauseBtn.innerText = "Pause";
    let no = displaySongName.innerText = "Now Playing : " + getSongName(songsArray[currentSongIndex]);
    // console.log(no)
}
let playBtnImg = document.querySelector("#playPauseBtn img").getAttribute("src");
playPauseBtn.addEventListener("click", function
    () {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtnImg.src = "svg/circle-pause-regular.svg"
        // console.log(playBtnImg.src)
    }
    else {
        audioPlayer.pause();
        playPauseBtn.src = "image/1.jpg"
    }

}
);

nextBtn.addEventListener("click",
    function () {
        playSong(currentSongIndex + 1)
        currentPosition += 1
    }
);
prevBtn.addEventListener("click",
    function () {
        if (currentSongIndex > 0) {
            playSong(currentSongIndex - 1)
            currentPosition -= 1
        }
        else {
            currentSongIndex = songsArray.length;
        }
    }
);


// let progressBar = document.getElementById("song-time");
let seekbar = document.querySelector("#seekbar");
let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : " "}${secs}`;
}

audioPlayer.addEventListener("timeupdate", function () {
    seekbar.value = audioPlayer.currentTime;
    currentTime.innerText = formatTime(audioPlayer.currentTime);
    // console.log(seekbar.value);
    // seekbar.value = 
});
audioPlayer.addEventListener("loadedmetadata", function () {
    seekbar.max = audioPlayer.duration;
    totalTime.innerText = formatTime(audioPlayer.duration);
});

seekbar.addEventListener("input", function () {
    audioPlayer.currentTime = seekbar.value;
    // console.log(audioPlayer.currentTime);
});


//   if we use id then play the song and class name is unable to play the song

//  so *** algo is i have to access the all list and somehow find the index of every btn for every song


// let songPlayBtn = document.getElementsByClassName("songPlayBtn");

// songPlayBtn.addEventListener("click", function()
// {   
//     // audioPlayer.play();
//     playSong(2)
//     console.log('Btn clicked');
// });

// Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e => {
//     // console.log(e.querySelector(".songs ul li a").getAttribute("href"))
// })



// Writing code for hamburger

document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".left").style.left = "0px"

})

document.querySelector(".cross").addEventListener("click", function () {
    document.querySelector(".left").style.left = "-100%"

})


// play btn for each songs

// let songItems = document.querySelectorAll("#songList li");
// // let audioPlayer = document
// function playEachSong(songSrc){
//     audioPlayer.src = songSrc;
//     audioPlayer.play();
//     // console.log("Btn clicked")
// }

// songItems.forEach((item)=>
// {
//     let playBtn = document.querySelector(".songPlayBtn");

//     playBtn.addEventListener("click", function ()
// {
//     let songLink = item.querySelector("a").getAttribute("href");
//     // let songSrc = songLink.getAttribute("href");
//     // console.log(songSrc)
//     playEachSong(songLink);
//     console.log("Btn clicked")
// });
// });
document.querySelectorAll('.PlayBtn').forEach(button => 
    {
        button.addEventListener("click", function ()
    {
        // console.log("Btn clicked")
        const songUrl = this.parentElement.querySelector("a").href;
        console.log(songUrl)
       
        audioPlayer.src = songUrl;
        audioPlayer.play()
        getSongName(songUrl)
        // audioPlayer.play()
    })
    
})