AFRAME.registerComponent('game',{
    schema: {
        gameState: {type: 'string', default: 'play'},
    },
    init: function(){
        var duration = 300;
        var timerEl = document.querySelector("#timer")
        this.startTimer( duration, timerEl )
    },
    startTimer: function( duration, timerEl){
        var minutes;
        var seconds;

        setInterval(() => {
            if( duration >= 0 ){
                this.data.gameState = 'play'
                minutes = parseInt( duration / 60 ) 
                seconds = parseInt( duration % 60 )

                if( minutes < 10 ){
                    minutes = '0' + minutes
                }
                if( seconds < 10 ){
                    seconds = '0' + seconds
                }

                timerEl.setAttribute('text', {'value' : minutes + ':' + seconds})

                duration -= 1
            } else {
                this.data.gameState = 'over'
                var camera = document.querySelector("#camera-rig")
                camera.setAttribute("velocity",{x: 0,y: 0,z: 0})
                var gameovertext = document.querySelector("#over")
                gameovertext.setAttribute("visible", true)
                var speed = document.querySelector("#speed")
                speed.setAttribute("text",{value : "0"})
            }
        }, 100)
    }
})