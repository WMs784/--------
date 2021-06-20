let num = 0;
let list = [ArrowNames.North,ArrowNames.NorthEast,ArrowNames.East,ArrowNames.SouthEast,
ArrowNames.South,ArrowNames.SouthWest,ArrowNames.West,ArrowNames.NorthWest];
let display :grove.TM1637 = null;
display = grove.createDisplay(DigitalPin.P0, DigitalPin.P14);
led.plot(num,4);
radio.setGroup(1);
let direction = input.compassHeading();
input.onButtonPressed(Button.A, function () {
    radio.sendString("i"+num.toString());//目的地番号を送る
    basic.pause(100);
    radio.sendString("d"+direction.toString());//現在の方角を送る
    basic.showNumber(num+1);
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen();//一回全部消す
    num++;//一つ右に移動
    num %= 5;//5は範囲外なので0に戻す
    led.plot(num, 4);//新しい位置で再点灯
})
let cd = -1;
radio.onReceivedString(function (rs: string) {
    let n = parseInt(rs.substr(1));
    if(rs[0] == 'd'){//目的地からの角度を受け取ったとき
        cd = n;
        display.show(cd);
    }
    else{//方角番号を受け取った時
        basic.showArrow(list[n]);//listから方角を探して矢印を出力
        //display.show(n);
    }
})
basic.forever(function () {
    if((input.compassHeading() - cd)**2 <900 && cd>=0){//正しい方向に向いた時
        basic.showArrow(ArrowNames.North);//真っ直ぐの矢印を出力
        basic.clearScreen();
    }
    else if(cd >= 0){//正しい方向じゃない時
        basic.showIcon(IconNames.Angry);//怒る
        soundExpression.giggle.play();
    }
})