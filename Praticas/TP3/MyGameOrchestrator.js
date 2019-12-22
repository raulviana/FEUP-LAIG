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
        this.pause = false;
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

        //console.log(this.move);
	}

    changeMove(move) {
        this.scene.setPickEnabled(false);
        this.move = move;
        console.log("move: " + move);
        this.move.push(this.turn);
        this.gameSequence.addMove(move);
        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.scene.setPickEnabled(true); }, 2000);
        //this.turn = Math.abs(this.turn - 1);
	}


}