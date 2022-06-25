# Blinks Doumentation


## Blinks Structure
Each blink has 6 faces
              Face 1
               ____
 Face 6 ----> /    \ <---- Face 2
 Face 5 ----> \____/ <---- Face 3

              Face 4

    Each Face of the blink can connect to one other blink


## How the Blinks Communicate?
    The blinks communicate with neighboring blinks using their 6 faces. The faces are managed using the `Faces.ts` file

    Each blink has a reciever object which is a queue that recieves messages. These
    messages are handled every update cycle and appropriate actions are taken 

    There are two ways to send a message to a neighboring blink:
    1) Using the array of Face
    2) using `sendMessages()`

## How are Messages handled?


## Core Algorithm of Memory Game

    Gameplay: After clicking any random blink, the blinks start the game. One must remember the colors and exact pattern in which the blinks light up. Then after the lights switch off, the player must replicate this pattern on the exact same blinks using the same colors. If the player chooses a wrong blink, they lose. If they choose a wrong color, they lose. 

    Checking if the player has won:
    When the player clicks a blink to start the game, a random sequence of blinks light up with random colors. The game always starts at the blink that was clicked first. The blinks then randomly choose a face that has a neighboring blink. This face is added to an array and the array is cloned to be passed on as information to the chosen neighboring blink. The neighboring blink does the same and appends the array with the chosen face and clones it to pass it on along with storing which face it recieved the 'start' message from
    
    This process goes on until we reach a blink that has no neighbors apart from the one it recieved the message from. Or if a blink sends a message to another blink that has already been 'started'. In both these cases, a full path has been generated which is stored in the `options` of the messages. Each blink also has stored which face it recieved its message from. The last blink now sends back the path using the stored faceIDs to the originally pressed blink that triggered the game to begin. Every update cycle, the blinks walk along this path of stored faces and check if all conditions for winning the game have been satisfied. 

    If player loses:
    The blink that was clicked was:
    1) Not in the game
    2) Incorrect color chosen. 

    This blink sends out a 'lose' message to all neighboring blinks. The neighbors do the same process while turing into the 'LOSS' color. 

    

