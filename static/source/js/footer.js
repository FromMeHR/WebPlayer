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
    const volume = $('.volume');

    const setSRC = (index) => {
        player.src = `/media/${musics[index].music}`;
        song_title.text(musics[index].title);
        artist.text(musics[index].artiste);
        music_img.attr('src', `/media/${musics[index].image}`);
    };

    setSRC(musicIndex);
    player.pause();

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

    volume.on('input', function () {
        player.volume = $(this).val();
        let volumeIconsvg = '';
        if ($(this).val() == 0) {
            volumeIconsvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-volume-mute" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/></svg>';
        } else {
            volumeIconsvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-volume-down" viewBox="0 0 16 16"><path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11M12.025 8a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8"/></svg>';
        }
        $('.volume-icons').html(volumeIconsvg);
    });

    function formatTime(secs) {
        let min = Math.floor((secs % 3600) / 60);
        let sec = Math.floor(secs % 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        return `${min}:${sec}`;
    }
});
