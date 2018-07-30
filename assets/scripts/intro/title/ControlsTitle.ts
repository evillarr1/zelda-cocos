const { ccclass, property } = cc._decorator;

@ccclass
export default class Controls extends cc.Component {
    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
    }

    onKeyDown(e: cc.Event.EventCustom) {
        switch (e.keyCode) {
            case cc.KEY.enter:
                cc.director.loadScene("charSelect");
                break;
        }
    }
    
    onMouseDown(e: cc.Event.EventTouch) {
        switch (e.getEventCode()) {
            case sp.AnimationEventType.START:
                cc.director.loadScene("charSelect");
                break;
        }
    }
}  
