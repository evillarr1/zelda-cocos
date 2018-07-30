const { ccclass, property } = cc._decorator;

@ccclass
export default class Controls extends cc.Component {
    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(e: cc.Event.EventCustom) {
        switch (e.keyCode) {
            case cc.KEY.enter:
                break;
        }
    }
}  
