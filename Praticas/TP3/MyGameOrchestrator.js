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

        this.videoIndex = 0;
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


    //Displays the game according with it's state
    display() {
        this.gameboard.display();
        this.sideboardBlack.display();
        this.sideboardWhite.display();
        console.log(this.pieces.length);
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].display();
        }
    }


    playPiece(move) {
        this.scene.setPickEnabled(false); //Disables picking

        this.gameSequence.addMove(move);

        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.scene.setPickEnabled(true); }, 1500); //Change turn and enables picking after animation has finished
      
        let animation = new KeyFrameAnimation(this.scene); // creates an animation to be used in a piece
        this.animator.addAnimation(animation);

        let piece = new MyPiece(this.scene, move[0], move[1], move[2], animation); //Creates a piece
        this.pieces.push(piece);

    }

    //Removes previous move
    undoMove() {
        if (this.gameSequence.sequence.length > 0) {
            this.gameSequence.undoMove();
            this.pieces.pop();
            this.animator.removeAnimation();

            this.turn = Math.abs(this.turn - 1);
        }
    }

    //Clears the board to it's initial state
    clearGame() {
        this.turn = 0;
        this.gameRunning = false;
        this.pieces = [];
        this.animator.clear();
        this.gameSequence.clear();
    }


    playVideoPiece(move) {
        //setTimeout(() => { this.videoIndex = this.videoIndex + 1; console.log("Finished Timeout"); }, 1500);
        
        let animation = new KeyFrameAnimation(this.scene); // creates an animation to be used in a piece
        this.animator.addAnimation(animation);

        let piece = new MyPiece(this.scene, move[0], move[1], move[2], animation);
        this.pieces.push(piece);
        let kik = 0;
        for (let i = 0; i < 5000; i++) { kik++; };
        console.log(kik);
        this.videoIndex = this.videoIndex + 1;
       
    }

    //Plays a video of the previous game
    async playVideo() {
        this.videoIndex = 0;

        if (this.gameRunning == true)
            alert("Game still running!");
        else {
            if (this.gameSequence.oldSequence.length > 0) {
                console.log(this.gameSequence.oldSequence.length);
                let isPlayed = [];

                for (let k = 0; k < this.gameSequence.oldSequence.length; k++) {
                    // isPlayed.push(0);
                    this.playPiece(this.gameSequence.oldSequence[k]);
                    this.scene.updateCamera(this.scene.selectedCamera);
                    await new Promise(r => setTimeout(r, 2000));
                    
                    
                }
                ///
                // while (this.videoIndex < this.gameSequence.oldSequence.length) {
                //     console.log(this.videoIndex);
                //     if (isPlayed[this.videoIndex] == 0) {
                //         isPlayed[this.videoIndex] = 1;
                //         console.log("here"); console.log(this.videoIndex);
                //         this.playVideoPiece(this.gameSequence.oldSequence[this.videoIndex]);
                //         console.log("there"); console.log(this.videoIndex);
                        
                //     }
                // }
            }
        }
        console.log("Ended video");
    }
}
