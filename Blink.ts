import Color from "./Color";
import Face from "./Faces";
import Game from "./Game";
import Input from "./Input";
import MemoryGame from "./MemoryGame";
import Queue from "./Queue";
import { StateNames } from "./State";
import Updatable from "./Updatable";


export default class Blink implements Updatable{
    /**
     * Each blink has 6 faces
     *               Face 1
     *                ____
     *  Face 6 ----> /    \ <---- Face 2
     *  Face 5 ----> \____/ <---- Face 3
     * 
     *               Face 4

     */

    private _color : Color;
    private currentGame : Game;
    private _faces : Face[];
    private reciever : Queue<Record<string, any>>;
    static readonly numFaces : number = 6;
    private _gameStarted : boolean;
    private initFaceID : number;
    private connectedFaces : number;
    private neighborInitCount : number = 0;
    public input : Input;
    public gameColor : Color;
    private won : boolean;
    private lost : boolean;
    private pathFace : number;

    /**
     * Set to true if blink is a part of the game
     */
    private _inGame : boolean;

    constructor(){
        this.reciever = new Queue();
        this._faces = Face.initFaces(Blink.numFaces);
        this._faces.forEach((face)=>{
            if(face.isConnected){
                this.connectedFaces++;
            }
        });
        this._gameStarted = false;
        this._inGame = false;
    }

    sendToAllFaces(options : Record<string,any>){
        this._faces.forEach(face=>face.sendMessage(options));
    }

    sendMessages(index : number, options : Record<string,any>){
        this._faces[index].sendMessage(options);
    }

    recieveMessages(options : Record<string,any>){
        this.reciever.enqueue(options);
    }

    

    update(){
        if(this.currentGame){
            this.currentGame.state.currentState();
        }
    }

    

    /**
     * handles each message in the reciever
     */
    handleIncomingMessages(){
        while(!(this.reciever.isEmpty())){
            let message = this.reciever.dequeue();
            Object.keys(message).forEach(key => this.handleMessage(key,message));
        }
    }

    handleMessage(key : string, options? : Record<string,any>){
        switch(key){
            case StateNames.INIT:{
                this.currentGame = options["init"]['game'];
                this.initFaceID = options['faceID'];
                this.currentGame.setBlink(this);
                
                delete options['faceID'];
                options['init']['game'] = this.currentGame.clone();
                this.sendInitToFaces(options);

                break;
            }
            case StateNames.STARTBLINK || StateNames.START:{
                this.pathFace = options['faceID'];
                if(this.currentGame.state.currentState() === StateNames.START){
                    this._faces[this.pathFace].sendMessage({"path" : [this.pathFace]})
                    return;
                }
                this.currentGame.state.changeState(StateNames.START);
                //this.sendStartToFaces();
                break;
            }
            case StateNames.NEIGHBOR_INIT_COMPLETE:{
                this.neighborInitCount++;
                if(this.neighborInitCount === this.connectedFaces){
                    this._faces[this.initFaceID].sendMessage({"NEIGHBOR_INIT_COMPLETE" : "NEIGHBOR_INIT_COMPLETE"})
                }
            }
            case StateNames.LOST:{
                this.currentGame.state.changeState("lose");
                this._color = Color.LOSS;
                setTimeout(function(){
                    this.currentGame.state.changeState("idle");
                },this.currentGame.lossDisplayTime);
                break;
            }
            case StateNames.PATH:{
                if(!this.pathFace){
                    (<MemoryGame>this.currentGame).memoryPath = options['path'];
                    return;
                }
                options['path'].push(this.pathFace);
                this._faces[this.pathFace].sendMessage(options);
            }
            
        }
    }

    sendInitToFaces(options : Record<string,any>){
        let connected = this._faces.filter(face => face.isConnected && face.ID!=options['faceID']);
        if(connected.length === 0){
            this._faces[options['faceID']].sendMessage({"NEIGHBOR_INIT_COMPLETE" : "NEIGHBOR_INIT_COMPLETE"});
            return;
        }

        connected.forEach(face => face.sendMessage(options));
    }

    sendStartToFaces(){
        let connected = this._faces.filter(face => face.isConnected);
        connected.forEach(face => face.sendMessage({start : "start"}));
    }

    sendLossToFaces(){
        let connected = this._faces.filter(face => face.isConnected);
        connected.forEach(face => face.sendMessage({lost : "lost"}));
    }

    /**
     * 
     * @returns returns true if the blink is pressed
     */
    

    set color(color : Color){
        this._color = color;
    }

    set gameStarted(hasStarted : boolean){
        this._gameStarted = hasStarted;
    }

    get gameStarted() : boolean{
        return this._gameStarted;
    }

    /**
     * returns an array of faces that are connected to another face of another blink
     */
    getConnectedFaces() : Face[]{
        return this._faces.filter(face => face.isConnected);
    }

    get inGame(){
        return this._inGame;
    }

    set inGame(inGame : boolean){
        this._inGame = inGame;
    }

    /**
     * Uninstall game from blinks
     */
    gameOver(){

    }

}