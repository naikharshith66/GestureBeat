import Playlist from "./Playlist.js";

class PlaylistManager {

    constructor() {

        this.playlists = [];

        this.selectedPlaylist = null;

    }

    createPlaylist(name) {

        const playlist = new Playlist(name);

        this.playlists.push(playlist);

        console.log("📁 Playlist Created:", name);

        return playlist;

    }

    getPlaylists() {

        return this.playlists;

    }

    getPlaylist(id) {

        return this.playlists.find(
            playlist => playlist.id === id
        );

    }

    selectPlaylist(id) {

        this.selectedPlaylist =
            this.getPlaylist(id);

        return this.selectedPlaylist;

    }

    addSongToPlaylist(playlistId, song) {

        const playlist =
            this.getPlaylist(playlistId);

        if (!playlist) {

            console.error(
                "Playlist not found:",
                playlistId
            );

            return false;

        }

        playlist.addSong(song);

        return true;

    }

    removeSongFromPlaylist(playlistId, songId) {

        const playlist =
            this.getPlaylist(playlistId);

        if (!playlist) return false;

        playlist.removeSong(songId);

        return true;

    }

    deletePlaylist(id) {

        this.playlists =
            this.playlists.filter(
                playlist => playlist.id !== id
            );

        if (
            this.selectedPlaylist &&
            this.selectedPlaylist.id === id
        ) {

            this.selectedPlaylist = null;

        }

    }

    getSelectedPlaylist() {

        return this.selectedPlaylist;

    }

}

export default new PlaylistManager();