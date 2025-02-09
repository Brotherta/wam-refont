import { WebAudioModule, addFunctionModule } from "@webaudiomodules/sdk";
import BaseAudioPlayerNode from "./BaseAudioPlayerNode";

/**
 * A base WAM for every audio players.
 */
export default abstract class BaseAudioPlayerWAM<T extends BaseAudioPlayerNode> extends WebAudioModule<T> {

    constructor(
        groupId: string,
        audioContext: AudioContext,
        private factory: (wam:BaseAudioPlayerWAM<T>)=>T,
        private processorFn: any

    ){
        super(groupId,audioContext)
        this.descriptor.identifier="WamStudio."+this.constructor.name
    }

    override async createAudioNode() {
        await BaseAudioPlayerNode.addModules(this.audioContext, this.moduleId);
        await addFunctionModule(this.audioContext.audioWorklet, this.processorFn, this.moduleId);
        const node = this.factory(this)
        await node._initialize();
        return node;
    }

}