/**
* MyAnimator
* @constructor
*/
class MyAnimator extends Animation{
    constructor(scene){
        super(scene);
        this.animations = [];
    }

    addAnimation(animation) {
        this.animations.push(animation);
    }

    update(t) {
        //console.log(t);
        for (let i = 0; i < this.animations.length; i++)
            this.animations[i].update(t);
    }

    setKeyframes(){

    }

    display(){}
}