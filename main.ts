input.onButtonPressed(Button.A, function () {
    pos += -1
    if (pos < 0) {
        pos = 26
    }
})
radio.onReceivedString(function (receivedString) {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    control.waitMicros(500)
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    pos += 1
    if (pos > 26) {
        pos = 0
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    texto = "" + texto + abc.substr(pos, 1)
})
let pos = 0
let texto = ""
let abc = ""
radio.setGroup(1)
abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
texto = ""
pos = 0
basic.forever(function () {
    basic.showString(abc.substr(pos, 1))
    if (input.buttonIsPressed(Button.AB)) {
        basic.showString(texto)
        radio.sendString(texto)
        texto = ""
        pos = 0
    }
    if (radio.receivedPacket(RadioPacketProperty.Time) > 0) {
        control.waitMicros(5000)
    }
})
