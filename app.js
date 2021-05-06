let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume_slider');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

// Cree un element audio
let track = document.createElement('audio');

// Liste de tout les sons
let All_song = [
    {
        name: "Pour de vrai",
        path: "music/1.mp3",
        img: "image/img1.jpg",
        singer: "Vianney"
    },
    {
        name: "Longtemps",
        path: "music/2.mp3",
        img: "image/img2.jpg",
        singer: "Amir"
    },
    {
        name: "Vorrei ma non...",
        path: "music/3.mp3",
        img: "image/img3.jpg",
        singer: "J-AX ft Fedez"
    },
    {
        name: "Mes dammes",
        path: "music/4.mp3",
        img: "image/img4.jpg",
        singer: "Grand corps malade"
    },
    {
        name: "Mon roi",
        path: "music/5.mp3",
        img: "image/img5.jpg",
        singer: "Youssoupha"
    },
    {
        name: "Meteoriti",
        path: "music/6.mp3",
        img: "image/img6.jpg",
        singer: "Mr Rain"
    },
    {
        name: "Ti dedico il silenzio",
        path: "music/7.mp3",
        img: "image/img7.jpg",
        singer: "Ultimo"
    },
    {
        name: "Je m'en vais",
        path: "music/8.mp3",
        img: "image/img8.jpg",
        singer: "Vianney"
    }
];

// Toutes les fonctions 

// Fonction charge le track
function load_track(index_no){
    clearInterval(timer);
    reset_slider(); // Fonction appelle en bas...
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();
    // Compteur en haut de l'ecran
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    //
    timer = setInterval(range_slider, 1000); // range_slider, est une fonction appelle en bas...
}
load_track(index_no);

// Son muet
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

// Recommencer le son
function reset_slider(){
    slider.value = 0;
}

// 
function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

// Play music
function playsong(){
    track.play();
    playing_song  = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

// Pause Music
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

// Prochainne musique 
function next_song(){
    if (index_no < All_song.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong()
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

// Recente musique 
function previous_song(){
    if (index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong()
    }else{
        index_no = All_song.length - 1;
        load_track(index_no);
        playsong();
    }
}

// Gerer le volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// Gerer la musique
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

// La fonction autoplay
function autoplay_switch(){
    if(autoplay==1){
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}

function range_slider(){
    let position = 0;
    // Mettre a jour position du slider
    if(!isNaN(track.duration)){
        position = track.currentTime * (100/ track.duration);
        slider.value = position;
    }
    // Activer la rejoue auto du son
    if(track.ended){
        play.innerHTML = '<i class="fa fa-play"></i>';
        if(autoplay==1){
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}