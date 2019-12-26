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
                console.log(this.scene.pickResults.slice());
                for (let i = 0; i < this.scene.pickResults.length; i++) {
                    let obj = this.scene.pickResults[i][0];
                    if (obj) {
                        let customId = this.scene.pickResults[i][1];
                        let row = (customId - 1) % 8 + 1;
                        let col = Math.floor((customId - 1) / 8) + 1;
                        this.changeMove([row, col]);
                        this.pause = true;
                    }
                }
                this.scene.pickResults.splice(0, this.scene.pickResults.length);
            }
        }
    }

    display() {
        this.gameboard.display();
        this.sideboardBlack.display();
        this.sideboardWhite.display();

        for (let i = 0; i < this.pieces.length; i++)
            this.pieces[i].display();

        //console.log(this.move);
    }
    
    createKeyframes(turn, move){
        this.animation = new KeyFrameAnimation(this.scene);
        let frame = [];
        frame.push(0.3);

        let trans = [0, 3, 0];
        frame.push(trans);

        let rot = [0, 0, 0];
        frame.push(rot);

        let scale = [1, 1, 1];
        frame.push(scale);

        this.animation.keyFrames.push(frame);
        this.animator.animations.push(this.animation);
        console.log(this.animator.animations);
    }

    changeMove(move) {
        this.scene.setPickEnabled(false);
        let piece = new MyPiece(this.scene, move[0], move[1], this.turn);
        this.pieces.push(piece);
        this.move = move;
        console.log(move);
        this.move.push(this.turn);
        this.gameSequence.addMove(move);
        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.scene.setPickEnabled(true); }, 2000);
        this.createKeyframes(this.turn, this.move);
    }
    
   
}
