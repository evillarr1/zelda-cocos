const { ccclass } = cc._decorator;
import user from './Storage';

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

        for (let i = 1; i <= 3; i++) {
            let profile = cc.sys.localStorage.getItem(`PROFILE_${i}`);
            if (profile) {
                let json = JSON.parse(profile);

                let childElement = this.node.getChildByName(`profile${i}`);
                let childComponent = childElement.getComponent(cc.Label);
                childComponent.string = json.name;

                cc.loader.loadRes("sprites/intro/charSelect/charSelect", cc.SpriteAtlas, (err, atlas) => {
                    let frame = atlas.getSpriteFrame('emptyHeart');

                    for (let j = 0; j < json.maxHearts; j++) {
                        let newHeart = new cc.Node("heart");
                        newHeart.scale = 2.4;
                        newHeart.x += (this.node.width / 6) + (25 * (j % 8));
                        newHeart.y =  (this.node.width / 3) - this.moveMap[i - 1] - (j > 7 ? 27 : 0);
                        let sprite = newHeart.addComponent(cc.Sprite);
                        newHeart.parent = this.node;
        
                        let spriteFrame = new cc.SpriteAtlas();
                        sprite.spriteFrame = frame;
                    }
                });
            }
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

        let profile = cc.sys.localStorage.getItem(`PROFILE_${this.currentIndex + 1}`);
        if (profile) {
            cc.director.loadScene("introDemo");
            return;
        }

        let audio = this.node.getComponent(cc.AudioSource);

        this.node.active = false;

        setTimeout(() => {
            this.node.parent.getChildByName("registerPlayerName").active = true;
            user.currentUser = this.currentIndex + 1;
        });

        audio.play();
    }

    update() {
        this.node.getChildByName("fairy").y = (this.node.width / 3) - this.moveMap[this.currentIndex];
    }
}  
