import { availableSongs } from "./songs.js";

let correctLyrics;
let currentTimeout;
const aboutEl = document.getElementById("about-el")

aboutEl.addEventListener("click", () => {
    const aboutModalEl = document.getElementById("about-modal-el")
    const aboutCloseEl = document.getElementById("about-close-el")
    aboutModalEl.style.display = "block"

    aboutCloseEl.addEventListener("click", () => {
      aboutModalEl.style.display = "none"
    })
})

function playSelectedSong(index) {
    if (index < 0 || index >= availableSongs.length) {
        console.error("Invalid song index.");
        return;
    }

    document.getElementById("result-container").innerHTML = ""

    const selectedSong = availableSongs[index];
    correctLyrics = selectedSong.lyrics;

    const spotifyIframe = document.getElementById("spotify-iframe");
    const spotifyKarokeIframe = document.getElementById("spotify-karoke-iframe")
    const h2KarokeIframe = document.getElementById("h2-karoke-iframe")
    const giphyEmbed = document.getElementById("giphy-embed")
    spotifyIframe.src = selectedSong.spotifyEmbedURL;
    spotifyKarokeIframe.src = selectedSong.audio;
    spotifyIframe.style.display = "block";
    spotifyKarokeIframe.style.display = "block"
    h2KarokeIframe.style.display = "block"
    giphyEmbed.style.display = "block"



    document.getElementById("song-name").innerHTML = `<h2>${selectedSong.name}</h2>`;

    document.getElementById("user-input").value = "";

    // Set a timeout to pause the song after 15 seconds
    currentTimeout = setTimeout(pauseSong, 15000);
}

function pauseSong() {
    // Pause the song (you need to implement this based on the audio player you are using)
    // Example: document.getElementById("audio").pause();

    // You can also reset the timeout if you want to prevent further pauses
    clearTimeout(currentTimeout);
}

window.checkGuess = function() {
    if (!correctLyrics) {
        console.error("Correct lyrics not set properly.");
        return;
    }

    const userGuess = document.getElementById("user-input").value;
    const resultContainer = document.getElementById("result-container");

    const userSentences = userGuess.split('.'); // Split user input into sentences

    // Check if at least one user sentence matches a correct sentence
    const isCorrect = userSentences.some(userSentence => {
        if (!userSentence) {
            console.warn("Empty user sentence found.");
            return false;
        }
        return correctLyrics.toLowerCase().includes(userSentence.trim().toLowerCase());
    });

    if (isCorrect) {
        resultContainer.innerHTML = `<p>Great job! You nailed at least one line. Keep going, you're on the right track!`
    } else {
        resultContainer.innerHTML = `<p>Oops! While your lyrics may not match the original, your version is uniquely creative. Give it another shot!</p>
        `
    }
}

function autoResize(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
}

function generateSongList() {
    const songListContainer = document.getElementById("song-list-container");

    availableSongs.forEach((song, index) => {
        const songElement = document.createElement("div");
        songElement.classList.add("song");
        songElement.textContent = `Song ${index + 1} - ${song.name}`;
        songElement.onclick = function() {
            playSelectedSong(index);
        };

        songListContainer.appendChild(songElement);
    });
}

// Call this function when your page loads to generate the song list
generateSongList();
