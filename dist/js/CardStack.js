/* jshint esversion: 6*/
/* jshint browser: true */
import {Card} from "./Card.js";

export class CardStack{
    constructor(type){
        this.type = type;
        this.cardStack = [];
    } 
    
    push(card){
        this.cardStack.push(card);
    }
    pop(){
        return this.cardStack.pop();
    }
    isEmpty(){
        if(this.cardStack.length === 0){
            return true;
        }
        else{
            return false;
        }
    }
    size(){
        return this.cardStack.length;
    }
    peek(){
        return this.cardStack[this.cardStack.length-1];
    }
    
    printStack(type){
        switch(type){
            case ('s'):
                if(this.isEmpty()){
                    return "[&nbsp;&nbsp;&nbsp;&nbsp;]";
                }
                else {
                    return "[XX]";
                }
                break;
            case ('w'):
                if(this.isEmpty()){
                    return "[&nbsp;&nbsp;&nbsp;&nbsp;]";
                }
                else {
                    return this.peek().toString();
                }
                break;
            case ('f'):
                return this.peek().toString();
            case ('t'):
                var toString = '';
                for(let x = 0; x < this.size(); x++){
                    if(this.cardStack[x].isFaceUp) {
                        toString += this.cardStack[x].toString();
                    }
                    else{
                        toString += "[XX]";
                    }

                    if(this.isEmpty()){
                        toString += "[&nbsp;&nbsp;&nbsp;&nbsp;]";
                    }
                }
                return toString;
        }
    
    }
}