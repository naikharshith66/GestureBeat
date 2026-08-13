import Header from "./Header.js";
import Workspace from "./Workspace.js";
import SongInfo from "./SongInfo.js";
import Controls from "./Controls.js";

export default class Dashboard {

    constructor() {

        this.header = new Header();
        this.workspace = new Workspace();
        this.songInfo = new SongInfo();
        this.controls = new Controls();

    }

    render() {

        return `

        <div class="dashboard">

            ${this.header.render()}

            ${this.workspace.render()}

            ${this.songInfo.render()}

            ${this.controls.render()}

        </div>

        `;

    }

}