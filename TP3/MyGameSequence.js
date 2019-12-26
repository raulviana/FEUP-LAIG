/**
* MyGameSequence
* @constructor
*/
class MyGameSequence extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sequence = [];


    }

    undoMove() {
        this.sequence.pop();
    }

    addMove(move){
        this.sequence.push(move);
    }

}