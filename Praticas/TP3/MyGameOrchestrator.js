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

        for (var i = 0; i < this.animator.animations.length; i++){
            let animation = this.animator.animations[i];
            // this.scene.multMatrix(currentNode.transformMatrix); ??????????????????????????????
            animation.apply();
        }

        //console.log(this.move);
    }
    
    createKeyframes(turn, move){
        this.animation = new KeyFrameAnimation(this.scene);
        let frame = [];
        frame.push(this.scene.deltaTime + 100);

        let trans = [];
        trans.push(0);
        trans.push(3);
        trans.push(0);
        frame.push(trans);

        let rot = [];
        rot.push(0);
        rot.push(0);
        rot.push(0);
        frame.push(rot);

        let scale = [];
        scale.push(1);
        scale.push(1);
        scale.push(1);
        frame.push(scale);

        this.animation.keyFrames.push(frame);
        this.animator.animations.push(this.animation);
        console.log(this.animator.animations);
    }

    changeMove(move) {
        this.scene.setPickEnabled(false);
        this.move = move;
        console.log("move: " + move);
        this.move.push(this.turn);
        this.gameSequence.addMove(move);
        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.scene.setPickEnabled(true); }, 2000);
        this.createKeyframes(this.turn, this.move);
        //this.turn = Math.abs(this.turn - 1);
    }
    
   
}
