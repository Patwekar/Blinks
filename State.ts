import MemoryGame from "./MemoryGame";

export default class State{
    private stateMap : Record<string,Function>;
    private _currentState : string;
    private game : MemoryGame;
    constructor(currentState : string, stateMappings : Record<string,Function>){
        this._currentState = currentState;
        this.stateMap = stateMappings;
    }
    changeState(state : string){
        if(Object.keys(this.stateMap).includes(state)){
            this._currentState = state;
        }
    }

    get currentState() : Function{
        return this.stateMap[this._currentState];
    }
}

export enum StateNames{
    INIT = "init", /**
        {
            "init" : {
                game : <game obj>
            },
            
            'faceID' : <number>
        }
     */

    STARTBLINK = "STARTBLINK",
    START = "start",
    /**
     * {
     *      "start" : "start"
     * }
     */

    PLAYING = "playing",

    NEIGHBOR_INIT_COMPLETE = "NEIGHBOR_INIT_COMPLETE",
    /**
     * {
     * 
     * }
     */

    LOST = "lost",

    PATH = "path"
    /**
     * {
     *      "path" : [...]
     * }
     */
}

