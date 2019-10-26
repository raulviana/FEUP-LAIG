/**
* Animation
* @constructor
*/


class Animation {
    constructor(scene){
        if(this.constructor == Animation){
            throw new TypeError('Abstract class "Animation" cannot be instantiated');
        }
    }


    update(){};

    apply(){};

}