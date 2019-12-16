/**
* MyPiece
* @constructor
*/
class MyPiece extends CGFobject {
    constructor(scene) {
        super(scene);
        this.octoPiece = new MyOctoPiece(this.scene);

    }

    get(){}

    set(){}

    display(){
        this.octoPiece.display();
    }

}