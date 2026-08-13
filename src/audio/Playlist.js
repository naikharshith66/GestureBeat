class Playlist {

    constructor(name) {

        this.id = crypto.randomUUID();

        this.name = name;

        this.songs = [];

        this.createdAt = new Date();

    }

    addSong(song) {

        if (!song) return;

        const alreadyExists =
            this.songs.some(
                existingSong =>
                    existingSong.id === song.id
            );

        if (alreadyExists) {

            console.log(
                "🎵 Song already in playlist"
            );

            return;

        }

        this.songs.push(song);

        console.log(
            `🎵 Added "${song.name}" to "${this.name}"`
        );

    }

    removeSong(songId) {

        this.songs =
            this.songs.filter(
                song => song.id !== songId
            );

    }

    getSongs() {

        return this.songs;

    }

    getSong(songId) {

        return this.songs.find(
            song => song.id === songId
        );

    }

}

export default Playlist;