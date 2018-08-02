const { ccclass } = cc._decorator;

@ccclass
export default class Title extends cc.Component {
    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
    }

    onKeyDown(e: cc.Event.EventCustom) {
        if (e.keyCode === cc.KEY.enter) {
            cc.director.loadScene("charSelect");
        }
    }

    onMouseDown(e: cc.Event.EventTouch) {
        if (e.getEventCode() === sp.AnimationEventType.START) {
            cc.director.loadScene("charSelect");
        }
    }
}  
