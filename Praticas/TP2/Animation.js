/**
* Animation
* @constructor
*/


class Animation {
    constructor(){
        if(this.constructor == Animation){
            throw new TypeError('Abstract class "Animation" cannot be instantiated');
        }
    }


    update(){};

    apply(){};

}