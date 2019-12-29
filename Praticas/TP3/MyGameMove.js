/**
* MyGameMove
* @constructor
*/
class MyGameMove extends CGFobject {
    constructor(scene) {
        super(scene);
        this.board;
        this.piece;
        this.moveAnimation = new MyAnimator(scene);
        this.position1x1 = [-0.974169 + 0.278334, 0.10101, 0.974169 - 0.278334]; //[x, y, z] coordinates of 1x1 tile
    }

    getPiece(){//(argumento: player)?
        //devolve posição inicial da peça de cada jogador?? 
    }

    set(){}

    unset(){}

    movePiece(){
      
    }

    display(){} //necessároio criar uma variável para saber se a animação ainda não acabou e de seguida passar a vez ao próximo jogador



}