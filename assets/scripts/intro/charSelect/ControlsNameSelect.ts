const { ccclass, property } = cc._decorator;

const LEFT_LIMIT = 0;
const RIGHT_LIMIT = 28;
const UP_LIMIT = 0;
const DOWN_LIMIT = 3
const CHAR_LIMIT = 6;
const IMAGE_LEFT_START = 860;
const SPRITE_LEFT_START = -0.21;
const DIVIDER_TOP_START = -52;
const HEART_LEFT_START = -355;
const ALPHA_MAP = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", " ", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", " ", " ", "0", "1", "2", "3", "4"],
    ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", " ", " ", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", " ", " ", "5", "6", "7", "8", "9"],
    ["U", "V", "W", "X", "Y", "Z", "-", ".", ",", " ", " ", " ", "u", "v", "w", "x", "y", "z", " ", " ", " ", " ", " ", " ", "!", "?", "(", ")", " "],
    [" ", " ", " ", " ", " ",  -1, " ", " ", -10, -10, " ", " ", " ", " ", " ", " ", " ",  -1, " ", " ", -10, -10, " ", " ",  -1, " ", " ", -10, -10]
]
@ccclass
export default class Controls extends cc.Component {
    private x: number = 6;
    private y: number = 1;
    private charIndex: number = 0;
    private charList: Array<string|number> = [];

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(e: cc.Event.EventCustom) {
        let alphabetImage = this.node.getChildByName("alphabet");
        let dividerImage = this.node.getChildByName("divider");
        let heartImage = this.node.getChildByName("fullHeart");

        switch (e.keyCode) {
            case cc.KEY.left:
                this.x = this.x <= LEFT_LIMIT ? LEFT_LIMIT : this.x - 1;
                break;
            case cc.KEY.right:
                this.x = this.x >= RIGHT_LIMIT ? RIGHT_LIMIT : this.x + 1;
                break;
            case cc.KEY.up:
                this.y = this.y <= UP_LIMIT ? UP_LIMIT : this.y - 1;
                break;
            case cc.KEY.down:
                this.y = this.y >= DOWN_LIMIT ? DOWN_LIMIT : this.y + 1;
                break;
            case cc.KEY.down:
                this.y = this.y >= DOWN_LIMIT ? DOWN_LIMIT : this.y + 1;
                break;
            case cc.KEY.a:
            case cc.KEY.s:
                let audio = this.node.getComponent(cc.AudioSource);
                audio.play();

                this.charIndex = (this.charIndex + 1) % CHAR_LIMIT
                heartImage.x = HEART_LEFT_START + (this.charIndex * 60.7);

                this.charList[this.charIndex - 1] = ALPHA_MAP[this.y][this.x];

                break;

            case cc.KEY.enter:
                this.node.active = false;
                this.node.parent.getChildByName("playerSelectBackground").active = true;
                break;
        }

        console.error(this.charList);

        alphabetImage.x = IMAGE_LEFT_START - (this.x * 60.7);
        alphabetImage.getComponent("cc.Sprite").fillStart = SPRITE_LEFT_START + (this.x * 0.0352);
        dividerImage.y = DIVIDER_TOP_START - (this.y * 54);
    }
}  
