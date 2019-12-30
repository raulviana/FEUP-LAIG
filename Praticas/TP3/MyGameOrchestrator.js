/**
* MyGameOrchestrator
* @constructor
*/
class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        this.gameSequence = new MyGameSequence(this.scene);
        this.animator = new MyAnimator(this.scene);
        this.gameboard = new MyGameBoard(this.scene);
        this.sideboardBlack = new MySideBoard(this.scene, 1); // 1 for black
        this.sideboardWhite = new MySideBoard(this.scene, -1); // -1 for white
        /*        this.theme = new MyScenegraph(this.scene);
                this.prolog = new MyPrologInterface(this.scene);*/

        this.boardCenter = [3, 3.2, 2];
        this.turn = 0;
        this.move = [];
        this.pause = false;

        this.gameRunning = false;

        this.pieces = [];
        this.oldPieces = [];

    }

    logPicking() {
        if (this.scene.pickMode == false) {
            if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {

                for (let i = 0; i < this.scene.pickResults.length; i++) {
                    let obj = this.scene.pickResults[i][0];
                    if (obj) {
                        let customId = this.scene.pickResults[i][1];
                        let row = (customId - 1) % 8 + 1;
                        let col = Math.floor((customId - 1) / 8) + 1;
                        console.log(row + " " + col);
                        if (this.gameSequence.checkMove([row, col])) {
                            this.playPiece([row, col, this.turn]);
                        }

                        this.pause = true;
                    }
                }
                this.scene.pickResults.splice(0, this.scene.pickResults.length);
            }
        }
    }

    update(t) {
        this.animator.update(t);
    }



    display() {
        this.gameboard.display();
        this.sideboardBlack.display();
        this.sideboardWhite.display();

        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].display();
        }
    }

    createAnimation(turn, move) {
        let animation = new KeyFrameAnimation(this.scene);

        this.animator.addAnimation(animation);
    }

    playPiece(move) {
        this.scene.setPickEnabled(false);

       
        //this.move.push(this.turn);
        this.gameSequence.addMove(move);

        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.scene.setPickEnabled(true); }, 1500);
        this.createAnimation(this.turn, move);
        let piece = new MyPiece(this.scene, move[0], move[1], move[2], this.animator.animations[this.animator.animations.length - 1]);
        this.pieces.push(piece);

    }

    undoMove() {
        if (this.gameSequence.sequence.length > 0) {
            this.gameSequence.undoMove();
            this.pieces.pop();
            this.animator.removeAnimation();

            this.turn = Math.abs(this.turn - 1);
        }
    }

    clearGame() {
        this.turn = 0;
        this.gameRunning = false;
        this.pieces = [];
        this.animator.clear();
        this.gameSequence.clear();
    }

    playVideo() {
        if (this.gameRunning == true)
            alert("Game still running!");
        else {
            for (let i = 0; i < this.gameSequence.oldSequence.length; i++) {
                this.playPiece(this.gameSequence.oldSequence[i]);
            }
        }
    }

}
