let num = 0;
let list = [ArrowNames.North,ArrowNames.South,ArrowNames.East,ArrowNames.West,
ArrowNames.NorthEast,ArrowNames.NorthWest,ArrowNames.SouthEast,ArrowNames.SouthWest];
    led.plot(num,4);
    radio.setGroup(1);
input.onButtonPressed(Button.A, function () {
        radio.sendNumber(num);
        //led.unplot(num,4);
        //basic.clearScreen();
        basic.showNumber(num);
    })
    input.onButtonPressed(Button.B, function () {
        basic.clearScreen();
        //led.unplot(num,4);
        led.plot(num, 4);
        num++;
        num %= 5;
    })
    radio.onReceivedNumber(function (recievednumber: number) {
        //basic.clearScreen();
        //led.unplot(num,4);
        basic.showArrow(list[recievednumber]);
        console.log(recievednumber);
        //console.log(num);
    })