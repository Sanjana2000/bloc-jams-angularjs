(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};


    /**
    * @desc Assign the Fixtures' albumPicasso Object to currentAlbum
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();


    /**
     * @desc Buzz object audio file
     * @type {Object}
     */



    //check var SongPlayer.currentBuzzObject = null;



    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (SongPlayer.currentBuzzObject) {
        SongPlayer.currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      SongPlayer.currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };



    /**
     * @function playSong
     * @desc Starts playing the currently selected song and sets the song.playing Boolean flag
     * @param {Object} song
     */
    var playSong = function(song) {
      SongPlayer.currentBuzzObject.play();
      song.playing = true;
    };



    /** Private function.
     * @desc Album index number of current song
     * @type {Number}
     * @param {Object} song
     */
    var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
    };


    /**
     * @desc Active song object from list of songs
     * @type {Object}
     */
  SongPlayer.currentSong = null;



    /**
     * @method SongPlayer.play
     * @desc Checks to see if the song clicked was already the selected song and, if not,
     * sets the clicked song as the current song & plays it or, if so, and if paused,
     * resumes playing.
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (SongPlayer.currentBuzzObject.isPaused()) {
          SongPlayer.currentBuzzObject.play();
        }
      }
    };


    /**
     * @method SongPlayer.pause
     * @desc Pauses the currently playing song and clears the song.playing Boolean flag
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      SongPlayer.currentBuzzObject.pause();
      song.playing = false;
    };



    /**
     * @method SongPlayer.previous
     * @desc 1. Changes the current song to previous song in the album order.
     *@desc 2. Stop the currently playing song, and
      *set the value of the currently playing song to the first song.
     *@desc 3.If the currentSongIndex is greater than zero, it moves to the previous song and automatically plays it:
     */
    SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
         SongPlayer.currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
 };

 SongPlayer.next = function() {
  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
      SongPlayer.currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
    }
};




    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);

})();
