const {ccclass} = cc._decorator;

@ccclass
export default class IntroDemo extends cc.Component { 
    onLoad () {
        this.node.color = new cc.Color(0, 0, 0);
        this.node.runAction(
            cc.fadeIn(5.0)
        ); 
    }

    start () {

    }

    // update (dt) {}
}
