var images = {}; // Cache Images
var messages = {
    en: {
        basic: {
            h: "Ham | ham",
            b: "Bur | bur",
            g: "Ger | ger",
            and: "-"
        },
        tooltip: "Keyboard shortcuts: <br>h/b/g : Input 'Ham' or 'Bur' or 'Ger'<br>-/Space : Input Space<br>Enter : Generate<br>Backspace : Back",
        input: {
            meta: "I'd like:",
            placeholder: "Hamburger...",
            generate: "Generate",
            btn: {
                h: "Ham",
                b: "Bur",
                g: "Ger",
                and: "and"
            },
        },
        output: {
            meta: "Here's your",
            save: "Save Image",
            show: "Show Image",
            back: "Back"
        }
    },
    zh_cn: {
        basic: {
            h: "汉",
            b: "堡",
            g: "包",
            and: "与"
        },
        tooltip: "键盘快捷键: <br>h/b/g : 输入汉/堡/包<br>-/空格 : 输入与<br>回车 : 生成<br>退格 : 返回",
        input: {
            meta: "我想要：",
            placeholder: "汉堡包...",
            generate: "生成",
            btn: {
                h: "+汉",
                b: "+堡",
                g: "+包",
                and: "+与"
            },
        },
        output: {
            meta: "这是你的",
            save: "保存图片",
            show: "查看图片",
            back: "返回"
        }
    },
    ja: {
        basic: {
            h: "ハン",
            b: "バー",
            g: "ガー",
            and: "と"
        },
        tooltip: "キーボード・ショートカット: <br>h/b/g : 'ハン'と'バー'と'ガー'入力  -/Space : 'と' 入力<br><br>Enter : 実行<br>Backspace : 元に戻す",
        input: {
            meta: "私は...したい",
            placeholder: "ハンバーガー...",
            generate: "実行",
            btn: {
                h: "+ハン",
                b: "+バー",
                g: "+ガー",
                and: "+と"
            },
        },
        output: {
            meta: "結果",
            save: "画像を保存する",
            show: "写真を表示",
            back: "元に戻す"
        }
    },
    de_de: {
        basic: {
            h: "Ham | ham",
            b: "Bur | bur",
            g: "Ger | ger",
            and: "-"
        },
        tooltip: "Tastaturkürzel: <br>h/b/g :<br>'Ham' oder 'Bur' oder 'Ger' <br>-/Leerzeichen :<br>Leerzeichen<br>Enter :<br>Generieren<br>Rücktaste :<br>Zurück",
        input: {
            meta: "Ich möchte ein:",
            placeholder: "Hamburger...",
            generate: "Generieren",
            btn: {
                h: "Ham",
                b: "Bur",
                g: "Ger",
                and: "und"
            },
        },
        output: {
            meta: "Hier ist dein",
            save: "Bild sichern",
            show: "Bild anzeigen",
            back: "Zurück"
        }
    },
    ko_kr: {
        basic: {
            h: "햄",
            b: "버",
            g: "거",
            and: "과"
        },
        tooltip: "키보드 단축키: <br>h/b/g : '햄','버','거' 입력 <br>Enter : 실행<br>Backspace : 지우기",
        input: {
            meta: "저는 ...를 원합니다.",
            placeholder: "햄버거...",
            generate: "생성",
            btn: {
                h: "+햄",
                b: "+버",
                g: "+거",
                and: "+과"
            },
        },
        output: {
            meta: "결과",
            save: "이미지 저장",
            show: "이미지 보기",
            back: "다시하기"
        }
    }
}

// Set Language
var lang = "";

if (location.hash.length > 1) {
    lang = location.hash.substring(1);
    localStorage.lang =  lang;
} else if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
} else {
    localStorage.lang = "zh_cn";
    lang = "zh_cn";
}

var i18n = new VueI18n({
    locale: lang, // set locale
    messages, // set locale messages
})

var app = new Vue({
    el: '#app',
    i18n,
    data: {
        languages: {
            "中": "zh_cn",
            "En": "en",
            "日": "ja",
            "De": "de_de",
            "한": "ko_kr"
        },
        output: false,
        loading: true,
        hamburgerArr: [],
        imgUrl: ""
    },
    computed: {
        hamburgerStr: function () {
            var str = "";
            for (let index = 0; index < this.hamburgerArr.length; index++) {
                const item = this.hamburgerArr[index];
                switch (item) {
                    case "H":
                        str += this.$i18n.tc("basic.h", index + 1);
                        break;
                    case "B":
                        str += this.$i18n.tc("basic.b", index + 1);
                        break;
                    case "G":
                        str += this.$i18n.tc("basic.g", index + 1);
                        break;
                    case "-":
                        str += this.$i18n.t("basic.and");
                        break;
                    default:
                        break;
                }
            }
            return str;
        }
    },
    created: function () {
        var that = this;
        var sources = {
            H: "assets/image/ham.png",
            B: "assets/image/bur.png",
            G: "assets/image/ger.png"
        };
        // Set background color
        var bgColorArr = ['#caad9f', '#f0c869', '#6abce0', '#9ac4bd', '#fad0c4', '#9ec6cd'];
        document.body.style.backgroundColor = bgColorArr[Math.floor((Math.random() * bgColorArr.length))];
        this.loadImages(sources, function () {
            setTimeout(() => {
                that.loading = false;
            }, 1000)
        });
    },
    methods: {
        changeLang: function (lang) {
            localStorage.lang = lang;
            this.$i18n.locale = lang;
        },
        loadImages: function (sources, callback) {
            var cacheImages = {};
            var index = 0;
            var attCount = Object.getOwnPropertyNames(sources).length;
            for (imgItem in sources) {
                cacheImages[imgItem] = new Image();
                cacheImages[imgItem].onload = function () {
                    index++;
                    if (index == attCount) {
                        images = cacheImages;
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                }
                cacheImages[imgItem].src = sources[imgItem];
            }
        },
        keyEvent: function (ev) {
            if (!this.loading && !this.output) {
                // input Page
                switch (ev.keyCode) {
                    case 72:
                        this.strAdd('h');
                        break;
                    case 66:
                        this.strAdd('b');
                        break;
                    case 71:
                        this.strAdd('g');
                        break;
                    case 8:
                        this.strAdd('-1');
                        break;
                    case 32:
                    case 189:
                        this.strAdd('-');
                        break;
                    case 13:
                        this.generateImage();
                        break;
                    default:
                        break;
                }
            } else if (!this.loading && this.output) {
                // output Page
                if (ev.keyCode == 8) {
                    this.backToInput();
                }
            }
        },
        strAdd: function (str) {
            switch (str) {
                case 'h':
                    this.hamburgerArr.push("H");
                    break;
                case 'b':
                    this.hamburgerArr.push("B");
                    break;
                case 'g':
                    this.hamburgerArr.push("G");
                    break;
                case '-':
                    if (this.hamburgerArr.length > 0 && this.hamburgerArr[this.hamburgerArr.length - 1] != '-') {
                        this.hamburgerArr.push("-");
                    }
                    break;
                case '-1':
                    if (this.hamburgerArr.length > 0) {
                        this.hamburgerArr.pop();
                    }
                    break;
                default:
                    break;
            }
        },
        getRandom: function () {
            var str = '';
            for (let i = 0; i < Math.floor(Math.random() * 8) + 1; i++) {
                var random = Math.random() * 8;
                if (random < 2) {
                    str = '-';
                } else if (random < 4) {
                    str = 'h';
                } else if (random < 6) {
                    str = 'b';
                } else {
                    str = 'g';
                }
                for (let j = 0; j < Math.floor(Math.random() * 4) + 1; j++) {
                    this.strAdd(str);
                }
            }
            if (this.hamburgerArr[this.hamburgerArr.length - 1] === '-') {
                this.hamburgerArr.pop();
            }
            if (this.hamburgerArr.length === 0) {
                this.getRandom();
            }
        },
        generateImage: function () {
            if (this.hamburgerArr.length > 0) {
                var that = this;
                this.loading = true;
                this.output = true;
                var hamburgerArr = this.hamburgerArr;
                var drawArr = [];

                // Delete '-' at the end
                if (hamburgerArr[hamburgerArr.length - 1] === '-') {
                    hamburgerArr.pop();
                }

                // Canvas height calculation
                var height = 0;
                for (let index = 0; index < hamburgerArr.length; index++) {
                    const thisLayer = hamburgerArr[index];
                    if (thisLayer != "-") {
                        var drawItem = {
                            image: images[thisLayer],
                            x: thisLayer == "B" ? 0 : 0,
                            y: height,
                            width: thisLayer == "B" ? 240 : 240,
                            height: thisLayer == "H" ? 80 : (thisLayer == "B" ? 90 : 90)
                        };
                        drawArr.splice(0, 0, drawItem);
                        height += thisLayer == "H" ? 46 : (thisLayer == "B" ? 40 : 45);
                    } else {
                        height += 48;
                    }
                }
                height += 50; // Add the last image's height.

                var canvas = this.$refs.hamburger_canvas;
                canvas.height = height;
                var ctx = canvas.getContext("2d");

                drawArr.forEach(item => {
                    ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
                });

                this.imgUrl = canvas.toDataURL("image/png");
                setTimeout(() => {
                    that.loading = false;
                }, 1000)
            }
        },
        downloadImage: function () {
            var a = document.createElement("a");
            a.href = this.imgUrl;
            a.download = "humburger.png";
            a.dispatchEvent(new MouseEvent('click', {}))
        },
        showImage: function () {
            window.open(this.imgUrl);
        },
        backToInput: function () {
            this.output = false;
            this.hamburgerArr = [];
            this.imgUrl = "";
        },
        isIOS: function(){
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            return isiOS;
        }
    }
})
