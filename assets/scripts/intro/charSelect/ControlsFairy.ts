const { ccclass, property } = cc._decorator;

@ccclass
export default class ControlsFairy extends cc.Component {
    private pressed: boolean;
    private currentIndex: number;
    private moveMap: Array<number> = [215, 315, 420, 510, 555];

    onLoad() {
        this.pressed = false;
        this.currentIndex = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);


        // Turn off player select screen. Need to figure out a better way to load this. This feels dirty.
        this.node.parent.parent.children[0].active = false;
    }

    onKeyDown(e: cc.Event.EventCustom) {
        if (this.pressed) {
            return;
        }

        switch (e.keyCode) {
            case cc.KEY.down:
                this.currentIndex = (this.currentIndex + 1) % this.moveMap.length;
                break;
            case cc.KEY.up:
                this.currentIndex = this.currentIndex <= 0 ? this.moveMap.length - 1 : this.currentIndex - 1;
                break;
            case cc.KEY.enter:
                if (this.currentIndex >= 0 && this.currentIndex <= 2) {
                    let audio = this.node.getComponent(cc.AudioSource);

                    this.node.parent.active = false;
                    this.node.parent.parent.children[0].active = true;

                    audio.play();
                }
                break;
        }

        this.pressed = true;
    }

    onMouseDown(e: cc.Event.EventTouch) {
        switch (e.getEventCode()) {
            case sp.AnimationEventType.START:
                if (this.currentIndex >= 0 && this.currentIndex <= 2) {
                    let audio = this.node.getComponent(cc.AudioSource);

                    this.node.parent.active = false;
                    this.node.parent.parent.children[0].active = true;

                    audio.play();
                }
                break;
        }
    }

    onKeyUp(e: cc.Event.EventCustom) {
        switch (e.keyCode) {
            case cc.KEY.down:
            case cc.KEY.up:
                this.pressed = false;
                break;
        }
    }

    update() {
        this.node.setPositionY((this.node.parent.width / 3) - this.moveMap[this.currentIndex]);
    }
}  
