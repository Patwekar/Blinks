export default class Queue<T>{
    private q : Array<T>;

    constructor(){
        this.q = new Array();
    }

    enqueue(obj: T){
        this.q.push(obj);
    }

    dequeue() : T {
        let elem : T = this.q[0];
        this.q.splice(0,1);
        return elem;
    }

    size() : number{
        return this.q.length;
    }

    isEmpty() : boolean{
        return this.size() === 0;
    }
}