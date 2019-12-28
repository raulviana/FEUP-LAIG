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

        this.pieces = [];
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

                        if (this.gameSequence.checkMove([row, col])) {
                            this.changeMove([row, col]);
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

    changeMove(move) {
        this.scene.setPickEnabled(false);

        this.move = move;
        this.move.push(this.turn);
        this.gameSequence.addMove(move);

        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.scene.setPickEnabled(true); }, 1500);
        this.createAnimation(this.turn, this.move);
        let piece = new MyPiece(this.scene, move[0], move[1], this.turn, this.animator.animations[this.animator.animations.length - 1]);
        this.pieces.push(piece);
    }


}
