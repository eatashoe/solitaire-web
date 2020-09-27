/* jshint esversion: 6*/
/* jshint browser: true */
import {Card} from "./Card.js";
import {CardStack} from "./CardStack.js";

var fR1 = document.getElementById('f1');
var fR2 = document.getElementById('f2');
var fR3 = document.getElementById('f3');
var fR4 = document.getElementById('f4');
var wR1 = document.getElementById('w1');
var sR1 = document.getElementById('s1');
var sR2 = document.getElementById('s2');
var row1 = document.getElementById('row1');
var row2 = document.getElementById('row2');
var row3 = document.getElementById('row3');
var row4 = document.getElementById('row4');
var row5 = document.getElementById('row5');
var row6 = document.getElementById('row6');
var row7 = document.getElementById('row7');
var input = document.querySelector('input');
var output = document.getElementById('outputs');
var helpbox = document.getElementById('helpBox');
var help = document.getElementById('help');


var copy = new CardStack('s');
var deck = new CardStack('s');
var stock = new CardStack('s');
var waste = new CardStack('w');

var f1 = new CardStack('f');
var f2 = new CardStack('f');
var f3 = new CardStack('f');
var f4 = new CardStack('f');

var t1 = new CardStack('t');
var t2 = new CardStack('t');
var t3 = new CardStack('t');
var t4 = new CardStack('t');
var t5 = new CardStack('t');
var t6 = new CardStack('t');
var t7 = new CardStack('t');

var piles = {
    'w1' : waste,
    't1' : t1,
    't2' : t2,
    't3' : t3,
    't4' : t4,
    't5' : t5,
    't6' : t6,
    't7' : t7,
    'f1' : f1,
    'f2' : f2,
    'f3' : f3,
    'f4' : f4,
};


function initialize(){
    
    for(let x = 1; x <= 4; x++){
        for(let y = 1; y <= 13; y++){
                let card = new Card(x,y, false);
                deck.push(card);
        }
    }
    
    deck.cardStack.sort(() => Math.random() - 0.5);
    copy.cardStack = [...deck.cardStack];
    for(let x = 0; x < 24; x++){
            stock.push(deck.pop());
    }
    
    for(let x = 7; x > 0; x--){
        for(let y = 0; y < x; y++){
            if(x === 7){
                if(y === 6){
                    deck.peek().setFaceUp();
                }
                t7.push(deck.pop());
            }
            else if(x === 6){
                if(y === 5){
                    deck.peek().setFaceUp();
                }
                t6.push(deck.pop());
            }
            else if(x === 5){
                if(y === 4){
                    deck.peek().setFaceUp();
                }
                t5.push(deck.pop());
            }
            else if(x === 4){
                if(y === 3){
                    deck.peek().setFaceUp();
                }
                t4.push(deck.pop());
            }
            else if(x === 3) {
                if(y === 2){
                    deck.peek().setFaceUp();
                }
                t3.push(deck.pop());
            }
            else if(x === 2) {
                if(y === 1){
                    deck.peek().setFaceUp();
                }
                t2.push(deck.pop());
            }
            else{
                deck.peek().setFaceUp();
                t1.push(deck.pop());
            }

        }

    }
    render();
}

function resetBoard(){
    deck.cardStack.length = 0;
    waste.cardStack.length = 0;
    stock.cardStack.length = 0;
    f1.cardStack.length = 0;
    f2.cardStack.length = 0;
    f3.cardStack.length = 0;
    f4.cardStack.length = 0;
    t1.cardStack.length = 0;
    t2.cardStack.length = 0;
    t3.cardStack.length = 0;
    t4.cardStack.length = 0;
    t5.cardStack.length = 0;
    t6.cardStack.length = 0;
    t7.cardStack.length = 0;
    correctInputs = [];
    inputList = [];
    inputCount = 0;
}

function render(){
    if(f1.isEmpty()){
            fR1.innerHTML = "[F1]";
    }
    else {
        fR1.innerHTML = f1.printStack(f1.type);
    }
    if(f2.isEmpty()){
        fR2.innerHTML = "[F2]";
    }
    else {
        fR2.innerHTML = f2.printStack(f2.type);
    }
    if(f3.isEmpty()){
        fR3.innerHTML = "[F3]";
    }
    else {
        fR3.innerHTML = f3.printStack(f3.type);
    }
    if(f4.isEmpty()){
        fR4.innerHTML = "[F4]";
    }
    else {
        fR4.innerHTML = f4.printStack(f4.type);
    }
    wR1.innerHTML = waste.printStack(waste.type);
    sR1.innerHTML = stock.printStack(stock.type);
    sR2.innerHTML = stock.size();
    row7.innerHTML = t7.printStack(t7.type);
    row6.innerHTML = t6.printStack(t6.type);
    row5.innerHTML = t5.printStack(t5.type);
    row4.innerHTML = t4.printStack(t4.type);
    row3.innerHTML = t3.printStack(t3.type);
    row2.innerHTML = t2.printStack(t2.type); 
    row1.innerHTML = t1.printStack(t1.type);

    
}
function winner(){
    let x = 0;
    copy.cardStack.forEach(element => (element.isFaceUp) ? x++:x);
    if(x == 52){
        return true;
    }
    else{return false;}
}

function play(inputs){
    
    switch(inputs[0].toLowerCase()){

        case ('draw'):
            if(stock.isEmpty() && waste.isEmpty()){
                output.innerHTML = "No more cards to draw.";
            }
            else if(!stock.isEmpty()){
                waste.push(stock.pop());
                correctInputs.push(input.value);
                input.value='';
                output.innerHTML = '';
                
            }
            else{
                let size = waste.size();
                for(let x = 0; x < size; x++){
                    stock.push(waste.pop());
                }
                waste.push(stock.pop());
                correctInputs.push(input.value);
                input.value='';
                output.innerHTML = '';
                
            }
                break;

        case ('move'):
            
            if(inputs.length === 3){
                if(inputs[1]==="w1"){

                    if(waste.isEmpty()){
                        output.innerHTML = "There are no cards in W1.";
                        input.classList.add('wrong');
                        setTimeout(function (){
                        input.classList.remove('wrong');
                        }, 200);
                    }
                    else if(inputs[2].substring(0, 1)==="f"){
                        if(piles[inputs[2]].isEmpty()){
                            if(piles[inputs[1]].peek().value === 1){
                                piles[inputs[2]].push(piles[inputs[1]].pop());
                                piles[inputs[2]].peek().setFaceUp();
                                correctInputs.push(input.value);
                                input.value='';
                                output.innerHTML = '';
                                
                            }
                            else{
                                input.classList.add('wrong');
                                setTimeout(function (){input.classList.remove('wrong');}, 200);
                                output.innerHTML = "You cannot move this.";
                            }
                        }
                        else if(piles[inputs[2]].peek().value + 1 === piles[inputs[1]].peek().value && piles[inputs[2]].peek().suit === piles[inputs[1]].peek().suit){

                            piles[inputs[2]].push(piles[inputs[1]].pop());
                            piles[inputs[2]].peek().setFaceUp();
                            correctInputs.push(input.value);
                            input.value='';
                            output.innerHTML = '';
                            
                        }
                        else{
                            input.classList.add('wrong');
                            setTimeout(function (){input.classList.remove('wrong');}, 200);
                            output.innerHTML = "You cannot move this.";
                        }

                    }
                    else if(inputs[2].substring(0,1)==="t"){
                        if(piles[inputs[2]].isEmpty()){
                            if(piles[inputs[1]].peek().value === 13){
                                piles[inputs[2]].push(piles[inputs[1]].pop());
                                piles[inputs[2]].peek().setFaceUp();
                                correctInputs.push(input.value);
                                input.value='';
                                output.innerHTML = '';
                                
                            }
                            else{
                                input.classList.add('wrong');
                                setTimeout(function (){input.classList.remove('wrong');}, 200);
                                output.innerHTML = "You cannot move this.";
                            }
                        }
                        else if(piles[inputs[2]].peek().value - 1 === piles[inputs[1]].peek().value && ((piles[inputs[2]].peek().isRed())^(piles[inputs[1]].peek().isRed()))){
                            piles[inputs[2]].push(piles[inputs[1]].pop());
                            piles[inputs[2]].peek().setFaceUp();
                            correctInputs.push(input.value);
                            input.value='';
                            output.innerHTML = '';
                            
                        }
                        else{
                            input.classList.add('wrong');
                            setTimeout(function (){input.classList.remove('wrong');}, 200);
                            output.innerHTML = "You cannot move this.";
                        }
                    }
                }
                else if(inputs[1].substring(0,1)==="f"){

                    if(piles[inputs[1]].isEmpty()){
                        let name = inputs[1].toUpperCase();
                        output.innerHTML = "There are no cards in "+ name +".";
                    }
                    else if(inputs[2].substring(0,1)==="t"){
                        if(piles[inputs[2]].isEmpty()){
                            if(piles[inputs[1]].peek().value === 13){
                                piles[inputs[2]].push(piles[inputs[1]].pop());
                                piles[inputs[2]].peek().setFaceUp();
                                correctInputs.push(input.value);
                                input.value='';
                                output.innerHTML = '';
                                
                            }
                            else{
                                input.classList.add('wrong');
                                setTimeout(function (){input.classList.remove('wrong');}, 200);
                                output.innerHTML = "You cannot move this.";
                            }
                        }
                        else if(piles[inputs[2]].peek().value - 1 === piles[inputs[1]].peek().value && ((piles[inputs[2]].peek().isRed())^(piles[inputs[1]].peek().isRed()))){
                            piles[inputs[2]].push(piles[inputs[1]].pop());
                            piles[inputs[2]].peek().setFaceUp();
                            correctInputs.push(input.value);
                            input.value='';
                            output.innerHTML = '';
                            
                        }
                        else{
                            input.classList.add('wrong');
                            setTimeout(function (){input.classList.remove('wrong');}, 200);
                            output.innerHTML = "You cannot move this.";
                        }
                    }
                }
                else if(inputs[1].substring(0,1)==="t"){

                    if(piles[inputs[1]].isEmpty()){
                        let name = inputs[1].toUpperCase();
                        output.innerHTML = "There are no cards in "+ name + ".";
                    }
                    else if(inputs[2].substring(0,1)==="f"){
                        if(piles[inputs[2]].isEmpty()){
                            if(piles[inputs[1]].peek().value === 1){
                                piles[inputs[2]].push(piles[inputs[1]].pop());
                                piles[inputs[2]].peek().setFaceUp();

                                if(!piles[inputs[1]].isEmpty()){
                                    piles[inputs[1]].peek().setFaceUp();
                                }
                                correctInputs.push(input.value);
                                input.value='';
                                output.innerHTML = '';
                                
                            }
                            else{
                                input.classList.add('wrong');
                                setTimeout(function (){input.classList.remove('wrong');}, 200);
                                output.innerHTML = "You cannot move this.";
                            }
                        }
                        else if(piles[inputs[2]].peek().value + 1 === piles[inputs[1]].peek().value && piles[inputs[2]].peek().suit === piles[inputs[1]].peek().suit){

                            piles[inputs[2]].push(piles[inputs[1]].pop());
                            piles[inputs[2]].peek().setFaceUp();

                            if(!piles[inputs[1]].isEmpty()){
                                piles[inputs[1]].peek().setFaceUp();
                            }
                            correctInputs.push(input.value);
                            input.value='';
                            output.innerHTML = '';
                            
                        }
                        else{
                            input.classList.add('wrong');
                            setTimeout(function (){input.classList.remove('wrong');}, 200);
                            output.innerHTML = "You cannot move this.";
                        }

                    }
                    else if(inputs[2].substring(0,1)==="t"){
                        if(piles[inputs[2]].isEmpty()){
                            if(piles[inputs[1]].peek().value === 13){
                                piles[inputs[2]].push(piles[inputs[1]].pop());
                                piles[inputs[2]].peek().setFaceUp();

                                if(!piles[inputs[1]].isEmpty()){
                                    piles[inputs[1]].peek().setFaceUp();
                                }
                                correctInputs.push(input.value);
                                input.value='';
                                output.innerHTML = '';
                                
                            }
                            else{
                                input.classList.add('wrong');
                                setTimeout(function (){input.classList.remove('wrong');}, 200);
                                output.innerHTML = "You cannot move this.";
                            }
                        }
                        else if(piles[inputs[2]].peek().value - 1 === piles[inputs[1]].peek().value && ((piles[inputs[2]].peek().isRed()) ^ (piles[inputs[1]].peek().isRed()))){
                            piles[inputs[2]].push(piles[inputs[1]].pop());
                            piles[inputs[2]].peek().setFaceUp();

                            if(!piles[inputs[1]].isEmpty()){
                                piles[inputs[1]].peek().setFaceUp();
                            }
                            correctInputs.push(input.value);
                            input.value='';
                            output.innerHTML = '';
                            
                        }
                        else{
                            input.classList.add('wrong');
                            setTimeout(function (){input.classList.remove('wrong');}, 200);
                            output.innerHTML = "You cannot move this.";
                        }
                    }
                }
                else{
                    input.classList.add('wrong');
                    setTimeout(function (){
                        input.classList.remove('wrong');
                    }, 200);
                    output.innerHTML = 'Input Error.';
                }
            }
            else if(inputs.length === 4){
                if(piles[inputs[1]].isEmpty()){
                    let name = inputs[1].toUpperCase();
                    output.innerHTML = "There are no cards in "+ name + ".";
                }
                else {
                    let temp = new CardStack('t');

                    if (piles[inputs[2]].isEmpty()) {

                        if (piles[inputs[1]].cardStack[piles[inputs[1]].size() - parseInt(inputs[3])].value === 13) {

                            for (let x = 0; x < parseInt(inputs[3]); x++) {
                                temp.push(piles[inputs[1]].pop());
                            }
                            for(let x = 0; x < parseInt(inputs[3]); x++){
                                piles[inputs[2]].push(temp.pop());
                            }
                            piles[inputs[2]].peek().setFaceUp();
                            if (!piles[inputs[1]].isEmpty()) {
                                piles[inputs[1]].peek().setFaceUp();
                            }
                            correctInputs.push(input.value);
                            input.value='';
                            output.innerHTML = '';
                            
                        } else {
                            input.classList.add('wrong');
                            setTimeout(function (){input.classList.remove('wrong');}, 200);
                            output.innerHTML = "You cannot move this.";
                        }
                    }
                    else if(piles[inputs[2]].peek().value - 1 === piles[inputs[1]].cardStack[piles[inputs[1]].size() - parseInt(inputs[3])].value && ((piles[inputs[2]].peek().isRed())^(piles[inputs[1]].cardStack[piles[inputs[1]].size() - parseInt(inputs[3])].isRed()))){
                        for (let x = 0; x < parseInt(inputs[3]); x++) {
                            temp.push(piles[inputs[1]].pop());
                        }
                        for(let x = 0; x < parseInt(inputs[3]); x++){
                            piles[inputs[2]].push(temp.pop());
                        }

                        piles[inputs[2]].peek().setFaceUp();
                        if(!piles[inputs[1]].isEmpty()){
                            piles[inputs[1]].peek().setFaceUp();
                        }
                        correctInputs.push(input.value);
                        input.value='';
                        output.innerHTML = '';
                        
                    }
                    else{
                        input.classList.add('wrong');
                        setTimeout(function (){input.classList.remove('wrong');}, 200);
                        output.innerHTML = "You cannot move this.";
                    }
                }
            }
            else{
                input.classList.add('wrong');
                setTimeout(function (){
                    input.classList.remove('wrong');
                }, 200);
                output.innerHTML = 'Input Error.';
            }
            break;
            
        case ('undo'):
            if(correctInputs.length !== 0){
                let goBack = correctInputs.pop().split(' ');
                if(goBack[0] == 'draw'){
                    stock.push(waste.pop());
                    input.value = '';
                }
                else if(goBack[0] == 'move'){
                    if(goBack[1].substring(0,1)==="f"){
                        piles[goBack[1]].push(piles[goBack[2]].pop());
                        input.value = '';
                    }
                    else if(goBack[1].substring(0,1)==="t"){
                        if(goBack[2].substring(0,1)==='t'){
                            if(goBack.length == 4){
                                if(piles[goBack[1]].size() > 0 && piles[goBack[1]].peek().isFaceUp){
                                    piles[goBack[1]].peek().isFaceUp = false;
                                }
                                let temp = new CardStack('f');
                                for (let x = 0; x < parseInt(goBack[3]); x++) {
                                    temp.push(piles[goBack[2]].pop());
                                }
                                for(let x = 0; x < parseInt(goBack[3]); x++){
                                    piles[goBack[1]].push(temp.pop());
                                }
                                input.value = '';
                            }
                            else{
                                if(piles[goBack[1]].size() > 0 && piles[goBack[1]].peek().isFaceUp){
                                    piles[goBack[1]].peek().isFaceUp = false;
                                }
                                piles[goBack[1]].push(piles[goBack[2]].pop());
                                input.value = '';
                            }
                        }
                        else if(goBack[2].substring(0,1)==='f'){
                            piles[goBack[1]].push(piles[goBack[2]].pop());
                            input.value = '';
                        }
                    }
                    else if(goBack[1].substring(0,1)==="w"){
                        if(goBack[2].substring(0,1)==='f'){
                            piles[goBack[2]].peek().isFaceUp = false;
                            piles[goBack[1]].push(piles[goBack[2]].pop());
                            input.value = '';
                        }
                        else if(goBack[2].substring(0,1)==='t'){
                            piles[goBack[2]].peek().isFaceUp = false;
                            piles[goBack[1]].push(piles[goBack[2]].pop());
                            input.value = '';
                        }
                    }
                }
            }
            else{
                input.classList.add('wrong');
                setTimeout(function (){
                    input.classList.remove('wrong');
                }, 200);
                output.innerHTML = 'Cant go back any further.';
                input.value='';
            }
            break;
            
        default:
            input.classList.add('wrong');
            setTimeout(function (){
            input.classList.remove('wrong');
            }, 200);
            output.innerHTML = 'Input Error.';
            input.value='';
    }
    render();
}


initialize();
let restart = false;
let correctInputs = [];
let inputList = [];
let inputCount = 0;

input.addEventListener('keydown', function(e){
    if(e.keyCode === 13){
        inputList.push(input.value.trim());
        inputCount++;
        let inputs = input.value.toLowerCase().trim().split(' ');
        window.console.log(inputs);
        
        if(inputs[0] === 'restart' || restart){
            restart = true;
            input.value = '';
            output.innerHTML = "Do you want to start a new game? (Y/N): ";
            if(inputs[0].toLowerCase() === 'y'){
                resetBoard();
                initialize();
                output.innerHTML = "Enter a command: ";
                restart = false;
            }
            else if(inputs[0].toLowerCase() === 'n'){ 
                restart = false;
                output.innerHTML = "Enter a command: ";
            }
        }
        else if(winner()){
            output.innerHTML = "YOU WON!!! If you want to play again, type 'restart'.";
            input.value = '';
        }
        else{
play(inputs);
        }

    }
    //up
    if(e.keyCode === 38){
        if(inputCount !== 0){
            inputCount--;
            input.value = inputList[inputCount];
        }
        else{
            input.classList.add('wrongNoRed');
            setTimeout(function (){
                input.classList.remove('wrongNoRed');
            }, 200);
        }
    }
    //down
    if(e.keyCode === 40){
        if(inputCount < inputList.length-1){
            inputCount++;
            input.value = inputList[inputCount];
        }
        else{
            input.classList.add('wrongNoRed');
            setTimeout(function (){
                input.classList.remove('wrongNoRed');
            }, 200);
        }
        
    }
    else{
        window.console.log('typing...');
    }
});


help.onclick = function() {
    helpbox.classList.toggle('show');
};






