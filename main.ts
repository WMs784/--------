let num = 0;
let list = [ArrowNames.North,ArrowNames.NorthEast,ArrowNames.East,ArrowNames.SouthEast,
ArrowNames.South,ArrowNames.SouthWest,ArrowNames.West,ArrowNames.NorthWest];
let display :grove.TM1637 = null;
display = grove.createDisplay(DigitalPin.P2, DigitalPin.P16);
led.plot(num,4);
radio.setGroup(1);
let direction = input.compassHeading();
input.onButtonPressed(Button.A, function () {
    radio.sendString("i"+num.toString());//目的地番号を送る
    basic.pause(100);
    radio.sendString("d"+direction.toString());//現在の方角を送る
    display.show(num+1);
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen();//一回全部消す
    num++;//一つ右に移動
    num %= 5;//5は範囲外なので0に戻す
    led.plot(num, 4);//新しい位置で再点灯
})
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen();
    cd = -1;
    led.plot(num,4);
})
let cd = -1;
let host_num = 1;
//パケットは、(次のホスト番号)+(現在のホスト番号)+(id)+(矢印番号/方角)
radio.onReceivedString(function (rs: string) {
    if(parseInt(rs[1]) == host_num){
        let n = parseInt(rs.substr(3));
        if(rs[2] == 'i'){//方角番号を受け取ったとき
            basic.showArrow(list[n]);//listから方角を探して矢印を出力 
        }
        else{//角度を受け取ったとき
            cd = n;
            //basic.showNumber(cd);
            host_num = parseInt(rs[0]);
        }
    }
})
basic.forever(function () {
    let dif = cd - input.compassHeading();
    if(cd >= 0){//正しい方向じゃない時
        let dif2 = ((dif+360)%360+22.5)%360;
        basic.showArrow(list[Math.floor(dif2/45)]);
        if(dif2/45 >= 1){
            basic.showIcon(IconNames.Angry);//怒る
            soundExpression.sad.play();
        }
    }
})