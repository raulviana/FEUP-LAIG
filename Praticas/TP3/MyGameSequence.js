/**
* MyGameSequence
* @constructor
*/
class MyGameSequence extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sequence = [];


    }

    undoMove(){}

    addMove(move){
        this.sequence.push(move);
        console.log("Player " + move[2] + " played in position " + move[0] + ", " + move[1]);
        console.log(this.sequence);
    }

}