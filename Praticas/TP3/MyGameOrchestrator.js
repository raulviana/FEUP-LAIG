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
        this.sideboardBlack = new MySideBoard(this.scene, 1);   // 1 for black
        this.sideboardWhite = new MySideBoard(this.scene, -1);  // -1 for white

//      this.prolog = new MyPrologInterface(this.scene);

        this.boardCenter = [3, 3.2, 2];
        this.turn = 0;
        this.move = [];
        this.pause = false;

        this.gameRunning = false;
        this.videoRunning = false;

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

        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].display();
        }
    }


    playPiece(move) {
        this.scene.setPickEnabled(false);                   //Disables picking

        this.gameSequence.addMove(move);                    // adds new move to game sequence

        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.scene.setPickEnabled(true); }, 3500); //Change turn and enables picking after animation has finished
      
        let animation = new KeyFrameAnimation(this.scene);  // creates an animation to be used in a piece
        this.animator.addAnimation(animation);              // adds animation to array of animations

        let piece = new MyPiece(this.scene, move[0], move[1], move[2], animation);  //Creates a piece
        this.pieces.push(piece);                                                    // adds piece to array of pieces

    }

    //Removes previous move
    undoMove() {
        if (this.gameSequence.sequence.length > 0) {    // only removes move if game sequence has moves to be removed
            this.gameSequence.undoMove();               // removes move from game sequence
            this.pieces.pop();                          // removes piece from array of pieces
            this.animator.removeAnimation();            // removes animation from array of animations

            this.turn = Math.abs(this.turn - 1);        // corrects the turn
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
        this.gameSequence.addMove(move);    // adds new move to game sequence
      
        let animation = new KeyFrameAnimation(this.scene);  // creates an animation to be used in a piece
        this.animator.addAnimation(animation);  // adds animation to array of animations

        let piece = new MyPiece(this.scene, move[0], move[1], move[2], animation);  //Creates a piece
        this.pieces.push(piece);    // adds piece to array of pieces
       
    }

    //Plays a video of the previous game
    async playVideo() {
        this.videoRunning = true;

        this.pieces = [];
        this.animator.clear();

        if (this.gameRunning == true)
            alert("Game still running!");
        else {
            console.log(this.gameSequence.oldSequence);
            if (this.gameSequence.oldSequence.length > 0) {
                console.log(this.gameSequence.oldSequence.length);
                let isPlayed = [];

                for (let k = 0; k < this.gameSequence.oldSequence.length; k++) {
                    await new Promise(r => setTimeout(r, 600));
                    this.playVideoPiece(this.gameSequence.oldSequence[k]);
                    await new Promise(r => setTimeout(r, 3500));
                }
               
            }
        }
        console.log("Ended video");
        this.videoRunning = false;
    }
}
