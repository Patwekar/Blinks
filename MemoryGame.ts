import Color from "./Color";
import Game from "./Game";
import { StateNames } from "./State";

export default class MemoryGame extends Game{
    
    readonly visiblityTime : number = 5000;
    readonly lossDisplayTime : number = 5000;
    private storedBlinkColor : Color;
    memoryPath : number[] = [];

    constructor(){
        super();
        const stateMappings : Record<string, Function> = {
            "idle" : this.idling,
            "init" : this.init,
            "start" : this.start,
            "playing" : this.playing,
            "won" : this.won,
            "lose" : this.lose,

        }
        this.assignStates("idle",stateMappings);
    }

    // update(){
        
    // }
    /**
     * Chooses random color between red and green and assigns to the face
     * chooses random face that is connected and not currently "inGame" and invokes start()
     *  for that blink
     * 
     * if the blink sends "start" message to a blink that is already in game, then the 
     * process stops and no further blinks are 
     */

    
    start() {
        if(!this.blink.gameStarted){
            this.blink.inGame = true;
            this.storedBlinkColor = this.blink.color = Math.random() < 0.5 ? Color.RED : Color.GREEN;
            let connectedFaces = this.blink.getConnectedFaces();
            let chosenFaceIndex = Math.floor(Math.random()*connectedFaces.length);
            this.blink.gameStarted = true;
            this.memoryPath.push(chosenFaceIndex);
            connectedFaces[chosenFaceIndex].sendMessage({start : "start", path : Array.from(this.memoryPath)});
            
            
            setTimeout(function(){
                this.blink.color = Color.NONE;
                this.state.changeState(StateNames.PLAYING);
            }, this.visiblityTime);
        }
        else{

        }

    }

    

    clone() : MemoryGame{
        return new MemoryGame();
    }

    end(){

    }

    /**
     * do nothing, game has not loaded yet
     */

    idling(){

    }

    /**
     * Loads the selected game into all blinks
     */
    init(){
        this.blink.sendInitToFaces({
            "init" : {
                game : this
            }
        })
    }

    /**
     * execute when in middle of game and handle inputs recieved 
     */
    playing(){
        if(this.blink.input.singleClicked()){
            this.blink.inGame ? this.blink.gameColor === Color.GREEN ? this.blink.color = Color.GREEN : this.lose() : this.lose();
        }

        if(this.blink.input.doubleClicked()){
            this.blink.inGame ? this.blink.gameColor === Color.RED ? this.blink.color = Color.RED : this.lose() : this.lose();
        }
    }

    /**
     * Execute when the game is won
     */
    won(){

    }

    /**
     * Walks along the memoryPath and checks if each blink has been pressed correctly
     */
    checkWin(){

    }

    /**
     * Execute when the game is lost
     */
    lose(){
        this.blink.sendLossToFaces();
    }



    



}