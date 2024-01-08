import { availableSongs } from "./songs.js";

let correctLyrics;
let currentTimeout;

function playRandomSong() {
    const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];
    correctLyrics = randomSong.lyrics;

    const spotifyIframe = document.getElementById("spotify-iframe");
    spotifyIframe.src = randomSong.spotifyEmbedURL;
    spotifyIframe.style.display = "block";

    document.getElementById("song-name").innerHTML = `<h2>${randomSong.name}</h2>`;
}

function playSelectedSong(index) {
    if (index < 0 || index >= availableSongs.length) {
        console.error("Invalid song index.");
        return;
    }

    const selectedSong = availableSongs[index];
    correctLyrics = selectedSong.lyrics;

    const spotifyIframe = document.getElementById("spotify-iframe");
    spotifyIframe.src = selectedSong.spotifyEmbedURL;
    spotifyIframe.style.display = "block";

    document.getElementById("song-name").innerHTML = `<h2>${selectedSong.name}</h2>`;

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
        resultContainer.innerHTML = "<p>Correct! You got at least one sentence right!</p>";
    } else {
        resultContainer.innerHTML = "<p>Oops! That's not quite right. Try again!</p>";
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
