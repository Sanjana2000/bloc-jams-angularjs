function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /*
     * @desc Information for current album
     * @type {Object}
     */
    var currentAlbum = Fixtures.getAlbum();

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /*
     *@desc song object from list of songs.
     *@type {object}
     */
    SongPlayer.currentSong = null;
    /*
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;
    /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
    };

    /*Added Private playSong function here.
     * @function playSong
     * @desc Plays current song.
     * @param {Object} song
     */
    var playSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.play();
        SongPlayer.currentSong.playing = true;
      };



      /*
       * @function SongPlayer
       * @desc sets and plays the current Buzz object
       * @param song
       * @type {object}
       */
      SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
        } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
          }
        }
      };



      /*
       *@function Pause
       *@desc Pause current song
       *@param song
       *@type {object}
       */
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
      };



      /*@function previous
       *@desc Set song to previous song in album
       */
      SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          currentBuzzObject.stop();
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
