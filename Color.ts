export default class Color{
    /**
     * r, g, b reprsent the red, green and blue values from 0-255
     */
    private r : number;
    private g : number;
    private b : number;

    constructor(r: number, g : number, b : number){
        this.r = r;
        this.g = g;
        this.b = b;
    }

    static get RED() : Color{
        return new Color(255,0,0);
    }

    static get GREEN() : Color{
        return new Color(0,255,0);
    }

    static get NONE() : Color{
        return new Color(0,0,0);
    }

    static get LOSS() : Color{
        return new Color(23,100,55);
    }


}