/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        var f0 = this.gui.addFolder('Lights');

        //Dropbox
        this.gui.add(this.scene, 'selectedCamera', this.scene.view).name('Select View');

        //Checkbox
        f0.add(this.scene, 'light1').name('light 1');
        f0.add(this.scene, 'light2').name('light 2');
        f0.add(this.scene, 'spotRed').name('Spot Red');
        f0.add(this.scene, 'spotGreen').name('Spot Green');
        f0.add(this.scene, 'spotBlue').name('Spot Blue');

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}