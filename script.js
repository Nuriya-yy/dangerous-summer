
const playlist = [
    {
        title: "Loco",
        artist: "Yeat",
        duration: "2:34",
        file: "audio/loco.mp3.mp3"
    },
    {
        title: "Oh I Did",
        artist: "Yeat ft. NGeeYL",
        duration: "2:56",
        file: "audio/oh-i-did.mp3.mp3"
    },
    {
        title: "Comë N Go",
        artist: "Yeat",
        duration: "3:18",
        file: "audio/come-n-go.mp.mp3"
    },
    {
        title: "Im Yeat",
        artist: "Yeat ft. BNYX®",
        duration: "2:48",
        file: "audio/im-yeat.mp3.mp3"
    },
    {
        title: "2Tone",
        artist: "Yeat ft. Don Toliver",
        duration: "3:40",
        file: "audio/2tone.mp3.mp3"
    },
    
];


let currentAudio = null;
let currentTrackIndex = -1;


function createPlaylist() {
    const playlistContainer = document.getElementById('playlist-container');
    
    playlist.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.setAttribute('data-index', index);
        
        trackElement.innerHTML = `
            <div class="track-info">
                <span class="track-number">${(index + 1).toString().padStart(2, '0')}</span>
                <div class="track-details">
                    <span class="track-title">${track.title}</span>
                    <span class="track-artist">${track.artist}</span>
                </div>
            </div>
            <div class="track-duration">${track.duration}</div>
            <button class="play-btn" data-index="${index}">▶</button>
        `;
        
        trackElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('play-btn')) {
                playTrack(index);
            }
        });
        
        playlistContainer.appendChild(trackElement);
    });
    
    
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.getAttribute('data-index'));
            playTrack(index);
        });
    });
}

// Функция для воспроизведения трека
function playTrack(index) {
    const track = playlist[index];
    const audioPlayer = document.getElementById('audio-player');
    const currentTrackSpan = document.getElementById('current-track');
    
    
    if (currentAudio) {
        currentAudio.pause();
    }
    
    currentAudio = new Audio(track.file);
    currentAudio.play();
    
    currentTrackSpan.innerHTML = `🎵 Сейчас играет: ${track.title} - ${track.artist}`;
    currentTrackIndex = index;
    
    highlightActiveTrack(index);
    
    currentAudio.addEventListener('ended', () => {
        let nextIndex = index + 1;
        if (nextIndex < playlist.length) {
            playTrack(nextIndex);
        } else {
            currentTrackSpan.innerHTML = `🎵 Плейлист завершён`;
            highlightActiveTrack(-1);
        }
    });
}


function highlightActiveTrack(index) {
    const tracks = document.querySelectorAll('.track');
    tracks.forEach((track, i) => {
        if (i === index) {
            track.classList.add('active');
        } else {
            track.classList.remove('active');
        }
    });
}


function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        document.getElementById('current-track').innerHTML = '🎵 Музыка остановлена';
        highlightActiveTrack(-1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createPlaylist();
    
    
    const stopBtn = document.getElementById('stop-music');
    if (stopBtn) {
        stopBtn.addEventListener('click', stopMusic);
    }
});