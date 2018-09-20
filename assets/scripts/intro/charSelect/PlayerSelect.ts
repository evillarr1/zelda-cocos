const { ccclass } = cc._decorator;

@ccclass
export default class ControlsFairy extends cc.Component {
    private currentIndex: number;
    private moveMap: Array<number> = [215, 315, 420, 510, 555];

    onLoad() {
        // Turn off player select screen. Need to figure out a better way to load this. This feels dirty.
        //this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onEnable() {
        this.currentIndex = 0;

        let profile = cc.sys.localStorage.getItem('PROFILE_1');
        if (profile) {
            let json = JSON.parse(profile);

            let text = this.node.getChildByName("profile1").getComponent(cc.Label);
            text.string = json.name;
        }
    }

    onKeyDown(e: cc.Event.EventCustom) {
        if (!this.node.active) {
            return;
        }

        switch (e.keyCode) {
            case cc.KEY.down:
                this.currentIndex = (this.currentIndex + 1) % this.moveMap.length;
                break;
            case cc.KEY.up:
                this.currentIndex = this.currentIndex <= 0 ? this.moveMap.length - 1 : this.currentIndex - 1;
                break;
            case cc.KEY.a:
            case cc.KEY.s:
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

        setTimeout(() => {
            this.node.parent.getChildByName("registerPlayerName").active = true;
        });

        audio.play();
    }

    update() {
        this.node.getChildByName("fairy").y = (this.node.width / 3) - this.moveMap[this.currentIndex];
    }
}  
