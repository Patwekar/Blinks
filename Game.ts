import Blink from "./Blink";
import State from "./State";

export default abstract class Game /*implements Updatable */{
    //everytime this blink object is instantiated, set the 
    //blink in game class to 'this'
    public state : State;
    protected blink : Blink;
    //abstract update();
    abstract readonly visiblityTime;
    abstract readonly lossDisplayTime;

    abstract start();
    abstract end();
    abstract clone() : Game;

    setBlink(blink : Blink){
        this.blink = blink;
    }

    assignStates(startState : string ,states : Record<string,Function>){
        this.state = new State("idle", states);
    }

    
 
}