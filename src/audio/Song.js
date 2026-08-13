class Song {

    constructor(file) {

        this.id = crypto.randomUUID();

        this.file = file;

        this.name = file.name;

        this.size = file.size;

        this.type = file.type;

        this.url = URL.createObjectURL(file);

        this.duration = 0;

        this.bpm = null;

        this.waveform = null;

        this.createdAt = new Date();

    }

}

export default Song;