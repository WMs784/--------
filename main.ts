let num = 0;
let list = [ArrowNames.North,ArrowNames.NorthEast,ArrowNames.East,ArrowNames.SouthEast,
ArrowNames.South,ArrowNames.SouthWest,ArrowNames.West,ArrowNames.NorthWest];
let display :grove.TM1637 = null;
display = grove.createDisplay(DigitalPin.P0, DigitalPin.P14);
led.plot(num,4);
radio.setGroup(1);
let direction = input.compassHeading();
input.onButtonPressed(Button.A, function () {
    radio.sendString("i"+num.toString());
    basic.pause(100);
    radio.sendString("d"+direction.toString());
    //basic.showNumber(num);
    display.show(num+1);
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen();
    num++;
    num %= 5;
    led.plot(num, 4);
})
let cd = 0;
radio.onReceivedString(function (rs: string) {
    //basic.clearScreen();
    //basic.showString(rs[0]);
    let n = parseInt(rs.substr(1));
    if(rs[0] == 'd'){//目的地からの角度を受け取ったとき
        cd = n;
    }
    else{//方角番号を受け取った時
        basic.showArrow(list[n]);
    }
})
if((input.compassHeading() - cd)**2 <400 && cd != 0){
    basic.showArrow(ArrowNames.North);
}
else{
    basic.showIcon(IconNames.Angry);
}