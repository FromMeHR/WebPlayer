$(document).ready(function () {
    let musicIndex = 0
    const musics = JSON.parse(document.getElementById('musics').textContent);

    const player = $('audio')[0];
    const play = $('.playing');
    const progress = $('.progress');
    const duration = $('.Duration');
    const progress_container = $('.progress_container');
    const currentTime = $('.currentDuration');
    const song_title = $('.song-title');
    const artist = $('.artist');
    const music_img = $('.music_img');
    const prev = $('.prev');
    const next = $('.next');
    const audio_tracks = $('.audio-tracks')
    const audio_tracks_by_genre = $('.audio-tracks-bygenre')


    const setSRC = (index) => {
        player.src = `/media/${musics[index].music}`;
        song_title.text(musics[index].title);
        artist.text(musics[index].artiste);
        music_img.attr('src', `/media/${musics[index].image}`);
    };

    setSRC(musicIndex);

    play.on('click', function () {
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    })

    player.addEventListener('timeupdate', function () {
        const progressPercent = (player.currentTime / player.duration) * 100;
        progress.css('width', progressPercent + '%');
        duration.text(formatTime(player.duration));
        currentTime.text(formatTime(player.currentTime));
        if (progressPercent >= 100) {
            musicIndex++;
            if (musicIndex < musics.length) {
                setSRC(musicIndex);
            } else {
                musicIndex = 0;
                setSRC(musicIndex);
            }
        }
    })
    player.addEventListener('loadedmetadata',()=>{
        duration.text(formatTime(player.duration))
    })
    progress_container.on('click', function (e) {
        const clickX = e.pageX - progress_container.offset().left;
        const containerWidth = progress_container.width();
        const newTime = (clickX / containerWidth) * player.duration;
        player.currentTime = newTime;
    })

    prev.on('click', function () {
        musicIndex = musicIndex - 1;
        if (musicIndex < 0) {
            musicIndex = musics.length - 1;
        }
        setSRC(musicIndex);
    })
    next.on('click', function () {
        musicIndex = musicIndex + 1;
        if (musicIndex > musics.length - 1) {
            musicIndex = 0;
        }
        setSRC(musicIndex);
    })

    audio_tracks.on('click', 'button.play_single', function () {
        const clicked = $(this).closest('tr').index();
        musicIndex = clicked;
        setSRC(musicIndex);
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    })
    audio_tracks_by_genre.on('click', 'button.play-single-bygenre', function () {
        const clicked = $(this).closest('.audio-tracks-bygenre').attr('id');
        const index = clicked - 1;
        musicIndex = index;
        setSRC(musicIndex);
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    })


    function formatTime(secs) {
        let min = Math.floor((secs % 3600) / 60);
        let sec = Math.floor(secs % 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        return `${min}:${sec}`;
    }
});
