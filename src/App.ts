import HostView from "./Views/HostView";
import HostController from "./Controllers/HostController";
import EditorController from "./Controllers/EditorController";
import TracksController from "./Controllers/TracksController";

import TracksView from "./Views/TracksView";
import { makeDivScrollSync } from "./Controllers/StaticController";
import Tracks from "./Models/Tracks";
import Host from "./Models/Host";
import PlayheadController from "./Controllers/PlayheadController";
import PluginsController from "./Controllers/PluginsController";
import PluginsView from "./Views/PluginsView";
import EditorView from "./Views/EditorView";
import ControlsController from "./Controllers/ControlsController";
import ControlsView from "./Views/ControlsView";
import Controls from "./Models/Controls";
import AutomationController from "./Controllers/AutomationController";
import AutomationView from "./Views/AutomationView";
import RegionsController from "./Controllers/RegionsController";
import WaveformController from "./Controllers/WaveformController";
import RecorderController from "./Controllers/RecorderController";

/**
 * Main class for the host. Start all controllers, views and models. All controllers and views are accessible frome this app.
 */
export default class App {
    
    hostController: HostController;
    editorController: EditorController;
    tracksController: TracksController;
    playheadController: PlayheadController;
    pluginsController: PluginsController;
    automationController: AutomationController;
    waveFormController: WaveformController;
    regionsController: RegionsController;
    recorderController: RecorderController;
    specialsController: ControlsController;

    hostView: HostView;
    tracksView: TracksView;
    editorView: EditorView;
    pluginsView: PluginsView;
    automationView: AutomationView;
    controlsView: ControlsView;

    tracks: Tracks;
    host: Host;

    regionsController: RegionsController;
    controls: Controls;

    constructor() {
        this.tracks = new Tracks(this);
        this.host = new Host(this);
        this.controls = new Controls(this);

        this.hostView = new HostView();
        this.tracksView = new TracksView();
        this.pluginsView = new PluginsView();
        this.editorView = new EditorView();
        this.automationView = new AutomationView();
        this.controlsView = new ControlsView();

        this.hostController = new HostController(this);
        this.editorController = new EditorController(this);
        this.tracksController = new TracksController(this);
        this.playheadController = new PlayheadController(this);
        this.pluginsController = new PluginsController(this);
        this.specialsController = new ControlsController(this);
        this.automationController = new AutomationController(this);
        this.waveFormController = new WaveformController(this);
        this.regionsController = new RegionsController(this);
        this.recorderController = new RecorderController(this);

        makeDivScrollSync();
    }

    /**
     * Initialize the master track for the host.
     */
    async initHost() {
        await this.host.initWAM()
    }
}
