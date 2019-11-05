/**
* KeyFrameAnimation
* @constructor
*/

class KeyFrameAnimation extends Animation{
    constructor(scene){
        super(scene);
        this.keyFrames = [];
        this.currentTrans = {x:0.0, y:0.0, z:0.0};
        this.currentRot = {x:0.0, y:0.0, z:0.0};
        this.currentScale = {x:1.0, y:1.0, z:1.0};
        this.startTime = 0;
        this.stage = 0;
    }


    update(t){
        this.startTime += t;
        
        if(this.stage < this.keyFrames.length) {
            var breakTime = this.keyFrames[this.stage][0];
            /*var timeDiff;

            var transX = this.keyFrames[this.stage][1][0];
            var transY = this.keyFrames[this.stage][1][1];
            var transZ = this.keyFrames[this.stage][1][2];

            var rotX = this.keyFrames[this.stage][2][0];
            var rotY = this.keyFrames[this.stage][2][1];
            var rotZ = this.keyFrames[this.stage][2][2];

            var scaleX = this.keyFrames[this.stage][3][0];
            var scaleY = this.keyFrames[this.stage][3][1];
            var scaleZ = this.keyFrames[this.stage][3][2];*/

            let timeDiff;
            let transX;
            let transY;
            let transZ;

            let rotX;
            let rotY;
            let rotZ;

            //let scaleX;
            //let scaleY;
            //let scaleZ;

            if(this.stage > 0) {
                timeDiff = breakTime - this.keyFrames[this.stage - 1][0];
                transX = this.keyFrames[this.stage][1][0] - this.keyFrames[this.stage - 1][1][0];
                transY = this.keyFrames[this.stage][1][1] - this.keyFrames[this.stage - 1][1][1];
                transZ = this.keyFrames[this.stage][1][2] - this.keyFrames[this.stage - 1][1][2];
                rotX = this.keyFrames[this.stage][2][0] - this.keyFrames[this.stage - 1][2][0];
                rotY = this.keyFrames[this.stage][2][1] - this.keyFrames[this.stage - 1][2][1];
                rotZ = this.keyFrames[this.stage][2][2] - this.keyFrames[this.stage - 1][2][2];
                //scaleX = this.keyFrames[this.stage][3][0] - this.keyFrames[this.stage - 1][3][0];
                //scaleY = this.keyFrames[this.stage][3][1] - this.keyFrames[this.stage - 1][3][1];
                //scaleZ = this.keyFrames[this.stage][3][2] - this.keyFrames[this.stage - 1][3][2];
            }
            else {
                timeDiff = breakTime;
                transX = this.keyFrames[this.stage][1][0];
                transY = this.keyFrames[this.stage][1][1];
                transZ = this.keyFrames[this.stage][1][2];
                rotX = this.keyFrames[this.stage][2][0];
                rotY = this.keyFrames[this.stage][2][1];
                rotZ = this.keyFrames[this.stage][2][2];
                //scaleX = this.keyFrames[this.stage][3][0];
                //scaleY = this.keyFrames[this.stage][3][1];
                //scaleZ = this.keyFrames[this.stage][3][2];
            }
        
            

            if(this.startTime <= breakTime) {
                this.currentTrans.x += (transX / timeDiff) * t;
                this.currentTrans.y += (transY / timeDiff) * t;
                this.currentTrans.z += (transZ / timeDiff) * t;

                this.currentRot.x += (rotX / timeDiff) * t;
                this.currentRot.y += (rotY / timeDiff) * t;
                this.currentRot.z += (rotZ / timeDiff) * t;

               // this.currentScale.x *= scaleX;
               // this.currentScale.y *= scaleY;
               // this.currentScale.z *= scaleZ;
            }

            if(this.startTime > breakTime) this.stage++;

        }

    }

    apply(){
        this.scene.translate(this.currentTrans.x, this.currentTrans.y, this.currentTrans.z);
        this.scene.rotate(this.currentRot.z * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(this.currentRot.y * Math.PI / 180, 0, 1, 0);
        this.scene.rotate(this.currentRot.x * Math.PI / 180, 1, 0, 0);
        this.scene.scale(this.currentScale.x, this.currentScale.y, this.currentScale.z);
    }
}