/**
* Animation
* @constructor
*/


class Animation extends CGFobject {
    constructor(scene){
        super(scene);
      /*  if(this.constructor == Animation){
            throw new TypeError('Abstract class "Animation" cannot be instantiated');
        }*/
        this.keyFrames = [];
    }


    update(){};

    apply(){};

}