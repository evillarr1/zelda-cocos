const { ccclass } = cc._decorator;

@ccclass
export default class ControlsFairy extends cc.Component {
    private currentIndex: number;
    private moveMap: Array<number> = [215, 315, 420, 510, 555];

    onLoad() {
        this.currentIndex = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);

        // Turn off player select screen. Need to figure out a better way to load this. This feels dirty.
        this.node.parent.getChildByName("registerPlayerName").active = false;
    }

    onKeyDown(e: cc.Event.EventCustom) {
        switch (e.keyCode) {
            case cc.KEY.down:
                this.currentIndex = (this.currentIndex + 1) % this.moveMap.length;
                break;
            case cc.KEY.up:
                this.currentIndex = this.currentIndex <= 0 ? this.moveMap.length - 1 : this.currentIndex - 1;
                break;
            case cc.KEY.enter:
                this.selectMenuItem();
                break;
        }
    }

    onMouseDown(e: cc.Event.EventTouch) {
        if (e.getEventCode() === sp.AnimationEventType.START) {
            this.selectMenuItem();
        }
    }

    private selectMenuItem() {
        if (this.currentIndex > 2) {
            return;
        }

        let audio = this.node.getComponent(cc.AudioSource);

        this.node.active = false;
        this.node.parent.getChildByName("registerPlayerName").active = true;

        audio.play();
    }

    update() {
        this.node.getChildByName("fairy").setPositionY((this.node.width / 3) - this.moveMap[this.currentIndex]);
    }
}  
