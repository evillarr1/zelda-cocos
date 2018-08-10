const { ccclass, property } = cc._decorator;

@ccclass
export default class Controls extends cc.Component {
    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(e: cc.Event.EventCustom) {
        let image = this.node.getChildByName("alphabet");
        let sprite = image.getComponent("cc.Sprite");

        switch (e.keyCode) {
            case cc.KEY.left:
                image.setPositionX(image.getPositionX() + 55);
                sprite.fillStart -= 0.035
                break;
            case cc.KEY.right:
                image.setPositionX(image.getPositionX() - 55);
                sprite.fillStart += 0.035
                break;
        }
    }
}  
