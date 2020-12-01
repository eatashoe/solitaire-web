# solitaire-web
Console solitaire

Same rules are orignial Solitaire.

[Play](https://lab2-winstongong.netlify.app/)

# --------------How To Play------------------

## This is a example of a game
```
>[F1][F2][F3][F4]     W1 [  ]    [XX] 24
>
>T7 [XX][XX][XX][XX][XX][XX][7♠]
>T6 [XX][XX][XX][XX][XX][3♦]
>T5 [XX][XX][XX][XX][A♣]
>T4 [XX][XX][XX][A♥]
>T3 [XX][XX][8♥]
>T2 [XX][2♦]
>T1 [2♥]
```

T1 - T7 are the Tableau

F1 - F4 are the Foundation

W1 is the Stock

## --Controls-- (case dosent matter)

>draw :  

Draws a card from the stock, 24 indicates the number of cards left.

>move _ _ :  

Move a card from one location to the next.  
Ex. move T1 F1   
Which will move card from T1 to F1.  

>move _ _ _ :

Same as move but has one more input at the end which is the number of cards you want to move.  
Ex. move T1 F1 3  
This will move 3 cards from T1 to F1 .  

>undo :

Reverses your last move.

>restart :  

Restarts the game if you get stuck.  
