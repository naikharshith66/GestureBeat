import Song from "./Song.js";

class LibraryManager {

    constructor() {

        this.songs = [];

        this.selectedSong = null;

    }

    addSong(file) {

        const song = new Song(file);

        this.songs.push(song);

        console.log("🎵 Added:", song.name);

        return song;

    }

    getSongs() {

        return this.songs;

    }

    selectSong(id) {

        this.selectedSong = this.songs.find(
            song => song.id === id
        );

        return this.selectedSong;

    }

    getSelectedSong() {

        return this.selectedSong;

    }

}

export default new LibraryManager();