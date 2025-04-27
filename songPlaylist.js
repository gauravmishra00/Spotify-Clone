let currentAudio = null
let currentButton = null
let updateInterval = null
let seekbar = document.querySelector("#seekbar");
let currentTime = document.querySelector("#current-time")
let totalTime = document.querySelector("#total-time")
// let PlayBtn = document.querySelectorAll(".PlayBtn")
let playPauseBtn = document.querySelector("#playPauseBtn");
// let audioPlayer = document.querySelector("#audioPlayer");

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : " "}${secs}`;
}


document.querySelectorAll('.PlayBtn').forEach(button => 
    {
        button.addEventListener("click", function ()
    {
        // console.log("Btn clicked")
        const songUrl = this.parentElement.querySelector("a").href;
        console.log(songUrl)
        const isSameSong = currentAudio && currentAudio.src === songUrl;

        if(currentAudio && !isSameSong)
            {
                currentAudio.pause()
                this.textContent = "Play"
                seekbar.value =0
            }
        
            if(isSameSong){
                if(currentAudio.paused)
                    {
                        currentAudio.play()
                        this.textContent = "Play"




                    }
                    else{
                        currentAudio.pause();
                    }
            }else{
                currentAudio = new Audio(songUrl)
                currentButton = this;
                currentAudio.play()
                this.textContent = "Pause"
                
                currentAudio.addEventListener('loadedmetadata', ()=>{
                    seekbar.max = currentAudio.duration;
                    totalTime.textContent = formatTime(seekbar.max)
                })
                currentAudio.addEventListener("play" , ()=>{
                    startUpdater();
                })
                currentAudio.addEventListener("ended", ()=>{
                    this.textContent="Play"
                    currentAudio=null
                    currentButton=null
                })
                playPauseBtn.addEventListener("click",function ()
                {
                    if(currentAudio.paused)
                        {
                            currentAudio.play()
                            playPauseBtn.src = "svg/circle-play-regular.svg"
                            this.textContent="Pause"
                        }
                    else
                    {
                        currentAudio.pause();
                        playPauseBtn.src = "svg/circle-pause-regular.svg" 
                        // PlayBtn.textContent="Pause"
                        // console.log("paused")  
                    }
                    
                })
            }
            currentAudio.addEventListener('pause',()=>{
                if(currentAudio && ! currentAudio.ended){
                    this.textContent = "Play"
                }
            })
            seekbar.addEventListener('input' , function (){
                currentAudio.currentTime = seekbar.value
            })
    })
    }
)

function startUpdater()
{
    clearInterval(updateInterval);
    updateInterval = setInterval(()=> {
        if(currentAudio && !currentAudio.paused)
            {
                seekbar.value = currentAudio.currentTime;
                currentTime.textContent = formatTime(seekbar.value)
            }
    })
}
