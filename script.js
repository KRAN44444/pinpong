const WIDTH = 800
const HEIGHT = 600
let svg = SVG().addTo('#game').size(WIDTH,HEIGHT)
let bg = svg.rect(WIDTH,HEIGHT).fill("#00ff00")
let bat1 = svg.rect(20,100).fill("#c7c922").move(20,HEIGHT/2-50)
let bat2 = svg.rect(20,100).fill("#c7c922").move(WIDTH-40,HEIGHT/2-50)
let ball = svg.circle().radius(20).cx(300).cy(250).fill("#cc9125")
let bat1_score = svg.text("0").fill("#ffffff").move(WIDTH/2-75,50).font({size:50})
let bat2_score = svg.text("0").fill("#ffffff").move(WIDTH/2+50,50).font({size:50})
let line = svg.line(WIDTH/2,0,WIDTH/2,HEIGHT).fill("#ffffff").stroke({color:"white",width:3,dasharray:"10"})
let reset_btn = document.querySelector("#btn2")
let step_x = 3
let step_y = 2
let step_bat1 = 0
let step_bat2 = 0
let score1 = 0 
let score2 = 0
function reset(){
    score1 = 0
    score2 = 0
    bat1_score.text(score1)
    bat2_score.text(score2)
    ball.cx(WIDTH/2)
    ball.cy(HEIGHT/2)
    bat1.move(20,HEIGHT/2-50)
    bat2.move(WIDTH-40,HEIGHT/2-50)
}
reset_btn.onclick = reset
document.addEventListener("keydown",function(){
    console.log(event.keyCode)
    if (event.keyCode == 40){
        step_bat2+=3
        if (step_bat2>5){
            step_bat2 = 5
        }
        if (bat2.y()+ bat2.height()>HEIGHT){
            bat2.y(HEIGHT-bat2.height())
        }
    }

    
    if (event.keyCode == 38){
        step_bat2-=3
        if (step_bat2<-5){
            step_bat2 = -5
        }
        if (bat2.y()<0){
            bat2.y(0)
        }
    }
})
document.addEventListener("keydown",function(){

    if (event.keyCode == 83){
        step_bat1+=3
        if (step_bat1>5){
            step_bat1 = 5
        }
        if (bat1.y()+ bat1.height()>HEIGHT){
            bat1.y(HEIGHT-bat1.height())
        }
    }

    
    if (event.keyCode == 87){
        step_bat1-=3
        if (step_bat1<-5){
            step_bat1 = -5
        }
        if (bat1.y()<0){
            bat1.y(0)
        }
    }
    
})
document.addEventListener("keyup",function(){
    if (event.keyCode == 40){
        step_bat2=0
       
    }

    
    if (event.keyCode == 38){
        step_bat2=0
        
    }
})
document.addEventListener("keyup",function(){
    if (event.keyCode == 83){
        step_bat1=0
        
    }

    
    if (event.keyCode == 87){
        step_bat1=0
       
    }
    
})   

function move(){
    bat1.dy(step_bat1)
    bat2.dy(step_bat2)
    let x = ball.cx()
    let y = ball.cy()
    let r = ball.radius()
    x += step_x
    y += step_y
    if (x + r>=WIDTH){
        score1++
        x = WIDTH/2
        bat1_score.text(score1)
        if (score1>=11){
            alert("player1 win")
            reset()
        }
    }
    if (x - r<=0){
        score2++
        x = WIDTH/2
        bat2_score.text(score2)
        if (score2>=11){
            alert("player2 win")
            reset()
        }
    }
    if (y + r>=HEIGHT || y-r<=0){
        step_y =- step_y
    }
    if (x + r>=bat2.x()&&y+r>bat2.y()&&y+r<bat2.y()+bat2.height()){
        step_x =- step_x
        x = bat2.x() - r
    }
    if (x - r<=bat1.x()+bat1.width()&&y+r>bat1.y()&&y+r<bat1.y()+bat1.height()){
        step_x =- step_x
    }  
    ball.cx(x)
    ball.cy(y)
}
setInterval(move,16)

