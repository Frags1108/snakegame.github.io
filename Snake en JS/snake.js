// variables globales
var speed = 80
var size = 10

class object {
    constructor() {
        this.size = size
    }
    crash(obj) {
        var difx = Math.abs(this.x - obj.x)
        var dify = Math.abs(this.y - obj.y)
        if(difx >= 0 && difx < size && dify >= 0 && dify < size){
            return true
        }
        else {
            return false
        }
    }
}

class tail extends object {
    constructor(x,y){
        super()
        this.x = x
        this.y = y
        this.next = null
    }
    draw(ctx) {
        if(this.next != null){
            this.next.draw(ctx);
        }
        ctx.fillStyle = '#00FF00'
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }
    setxy(x,y) {
        if(this.next != null){
            this.next.setxy(this.x, this.y)
        }
        this.x = x
        this.y = y
    }
    addNext() {
        if(this.next == null){
            this.next = new tail(this.x, this.y)
        } else {
            this.next.addNext()
        }
    }
    seeNext() {
        return this.next
    }
}
class food extends object {
    constructor(){
        super()
        this.x = this.generate()
        this.y = this.generate()
    }
    generate(){
        var num = (Math.floor(Math.random() * 49))*10
        return num
    }
    colocate(){
        this.x = this.generate()
        this.y = this.generate()
    }
    draw(ctx) {
        ctx.fillStyle = '#FF0000'
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }
}
// objetos del juego
var head = new tail(20,20)
var point = new food()
var ejex = true
var ejey = true
var xdir = 0
var ydir = 0
function move() {
    var nx = head.x+xdir
    var ny = head.y+ydir
    head.setxy(nx, ny)
}
function control(event){
    var code = event.keyCode;
    if(ejex){
        if(code == 38) {
            ydir = -size
            xdir = 0 
            ejex = false
            ejey = true
        }
        if(code == 40) {
            ydir = size
            xdir = 0 
            ejex = false
            ejey = true
        }
    }
    if(ejey){
        if(code == 37) {
            ydir = 0
            xdir = -size
            ejex = true
            ejey = false
        }
        if(code == 39){
            ydir = 0
            xdir = size
            ejex = true
            ejey = false
        }
    }
}
function gameOver() {
    head = new tail(20,20)
    point = new food()
    ejex = true
    ejey = true
    xdir = 0
    ydir = 0
    alert ('GAME OVER')
}
function crashWall() {
    if(head.x <0 || head.x > 490 || head.y <0 || head.y > 490){
        gameOver()
    }
}
function crashBody() {
    var temp = null
    try{
        temp = head.seeNext().seeNext()
    }catch(err){
        temp = null
    }
    while(temp != null){
        if(head.crash (temp)){
            // GAME OVER
            gameOver()
        } else {
            temp = temp.seeNext()
        }
    }
}
function draw() {
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0,0, canvas.width, canvas.height)

// Dibujo aca abajo
    head.draw(ctx)
    point.draw(ctx)
}
function main() {
    crashBody()
    crashWall()
    draw()
    move()
    if(head.crash(point)){
        point.colocate()
        head.addNext()
    }
}
setInterval('main()', speed)
