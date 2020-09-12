/* jshint esversion: 6*/
/* jshint browser: true */

export class Card{
    constructor(suit, value, face){
        this.suit = suit;
        this.value = value;
        this.isFaceUp = face;
    }
    getSuit(){
        return this.suit;
    }
    setSuit(suit){
        this.suit = suit;
    }
    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
    }
    isFaceUp(){
        return this.isFaceUp;
    }
    setFaceUp(){
        this.isFaceUp = true;
    }
    isRed(){
        if(this.suit % 2 === 0){           
            return true;
        }
        else return false;
    }
    toString(){

        let values = [" ","A","2","3","4","5","6","7","8","9","10","J","Q","K"];
        let suits    = [' ', '\u2666', '\u2663','\u2665', '\u2660'];   
        
        let toString = "[" + values[this.value]+suits[this.suit] +"]";  
        
        return toString;
    }
}
