let num = 0;
let list = [ArrowNames.North,ArrowNames.South,ArrowNames.East,ArrowNames.West];
basic.forever(function () {
    led.plot(num, 4);
    radio.setGroup(1);
    input.onButtonPressed(Button.A, function () {
        radio.sendNumber(num);
    })
    input.onButtonPressed(Button.B, function () {
        led.unplot(num,4);
        num++;
        num %= 4;
    })
    radio.onReceivedNumber(function (recievednumber: number) {
        led.unplot(num,4);
        basic.showArrow(list[recievednumber]);
        console.log(recievednumber);
        //console.log(num);
    })
})