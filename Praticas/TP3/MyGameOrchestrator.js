/**
* MyGameOrchestrator
* @constructor
*/
class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        this.gameSequence = new MyGameSequence(this.scene);
        /*this.animator = new MyAnimator(this.scene);*/
        this.gameboard = new MyGameBoard(this.scene);
        this.sideboardBlack = new MySideBoard(this.scene, 1); // 1 for black
        this.sideboardWhite = new MySideBoard(this.scene, -1); // -1 for white
/*        this.theme = new MyScenegraph(this.scene);
        this.prolog = new MyPrologInterface(this.scene);*/

        this.turn = 0;
        this.move = [];
    }

    display() {
        this.gameboard.display();
        this.sideboardBlack.display();
        this.sideboardWhite.display();

        //console.log(this.move);
	}

    changeMove(move) {
        this.move = move;
        this.move.push(this.turn);
        this.gameSequence.addMove(move);
        this.turn = Math.abs(this.turn - 1);
	}


}