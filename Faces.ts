import Blink from "./Blink";
import Queue from "./Queue";
import Updatable from "./Updatable";

export default class Face implements Updatable{
    private belongsTo : Blink; //the blink that this face is a part of
    private connectedTo : Face; //the face of the other blink that this face is connected to (neighbor)
    private _isConnected : boolean;
    private faceID : number;
    private performFunc : Function;
    private emitter : Queue<Record<string,any>>;

    constructor(faceID : number){
        this.emitter = new Queue();
        this.faceID = faceID;
        
    }

    update() {
        
    }


    /**
     * Sends messages to the neighboring face
     * @param options contain data to be transfered to the neighboring face
     */
    public sendMessage(options : Record<string,any>) {
        this.connectedTo.recieveMessage(Object.assign({},options));
    }

    public recieveMessage(options : Record<string, any>){
        options['faceID'] = this.faceID;
        this.belongsTo.recieveMessages(options);
    }

    static initFaces(count : number) : Face[]{
        let faces = new Face[count];
        for(let i = 0; i<faces.length; i++){
            faces[i] = new Face(i);
        }
        return faces;
    }

    get isConnected() :boolean{
        return this._isConnected;
    }

    get ID(){
        return this.faceID;
    }
    

}