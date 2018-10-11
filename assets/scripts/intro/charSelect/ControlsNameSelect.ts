const { ccclass } = cc._decorator;
import user from './Storage';

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
    [" ", " ", " ", " ", " ", -1, -2, " ", -10, -10, " ", " ", " ", " ", " ", " ", " ", -1, -2, " ", -10, -10, " ", " ", -1, -2, " ", -10, -10]
]
@ccclass
export default class Controls extends cc.Component {
    private x: number = 6;
    private y: number = 1;
    private charIndex: number = 0;
    private charList: Array<string | number> = [];

    onLoad() {
        // Turn off player select screen. Need to figure out a better way to load this. This feels dirty.
        //this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(e: cc.Event.EventCustom) {
        if (!this.node.active) {
            return;
        }

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
                let text = this.node.getChildByName("playerNameText").getComponent(cc.Label);
                audio.play();

                let charSelected = ALPHA_MAP[this.y][this.x];

                if (charSelected === -10) {
                    this.returnToPlayerSelect();
                } else if (charSelected === -1) {
                    this.charIndex = this.charIndex <= 0 ? CHAR_LIMIT - 1 : this.charIndex - 1;
                } else if (charSelected === -2) {
                    this.charIndex = (this.charIndex + 1) % CHAR_LIMIT
                } else {
                    this.charList[this.charIndex] = charSelected;

                    let newString = this.getName();
                    text.string = newString.join("    ");

                    this.charIndex = (this.charIndex + 1) % CHAR_LIMIT
                }

                heartImage.x = HEART_LEFT_START + (this.charIndex * 60.7);

                break;
            case cc.KEY.enter:
                this.returnToPlayerSelect();
                break;
        }

        alphabetImage.x = IMAGE_LEFT_START - (this.x * 60.7);
        alphabetImage.getComponent("cc.Sprite").fillStart = SPRITE_LEFT_START + (this.x * 0.0352);
        dividerImage.y = DIVIDER_TOP_START - (this.y * 54);
    }

    getName(): Array<string> {
        let newString = [];

        for (let i = 0; i < this.charList.length; i++) {
            newString.push(this.charList[i] || " ");
        }

        return newString;
    }

    isValidName() {
        return this.charList.length > 0 && this.charList.reduce((prev, curr) => prev && curr !== " ", true);
    }

    returnToPlayerSelect() {
        if (!this.isValidName()) {
            return;
        }

        this.node.active = false;

        setTimeout(() => {
            this.node.parent.getChildByName("playerSelect").active = true;
        })

        let userProfile = {
            name: this.getName().join(""),
            maxHearts: 3,
            hearts: 3
        };

        cc.sys.localStorage.setItem(`PROFILE_${user.currentUser}`, JSON.stringify(userProfile));

        return;
    }
}  
