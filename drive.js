AFRAME.registerComponent('drive', {
    init: function(){
        var gameStateValue = this.el.getAttribute("game")
        if (gameStateValue.gameState == 'play') {
            this.driveCar();
        }
    },
    driveCar: function(){
        var wheel = document.querySelector("#steeringwheel")

        var wheelRotation = 0
        var speedInc = 10;

        window.addEventListener('keydown',(e) => {
            if(e.code == 'ArrowLeft' && wheelRotation < 40){
                wheelRotation += 5
                wheel.setAttribute('rotation', {x: 0, y: 0, z: wheelRotation})
            }
            if(e.code == 'ArrowRight' && wheelRotation > -40) {
                wheelRotation -= 5;
                wheel.setAttribute('rotation', {x: 0, y: 0, z: wheelRotation})
            }
            var camera = document.querySelector("#camera-rig")
            var cameraPos = camera.getAttribute("position")
            var cameraRotation = camera.getAttribute("rotation")
            var movementControl = camera.getAttribute("movement-controls")
            
            var cameraDirection = new THREE.Vector3();
            camera.object3D.getWorldDirection(cameraDirection)

            console.log(movementControl.speed)

            if(e.code == 'ArrowRight'){
                cameraRotation.y -= 5
                camera.setAttribute("rotation",{x: 0,y: cameraRotation.y, z: 0})
                camera.setAttribute("movement-controls",{speed : movementControl.speed + 0.005})
            }
            if(e.code == 'ArrowLeft'){
                cameraRotation.y += 5
                camera.setAttribute("rotation", {x: 0, y: cameraRotation.y, z: 0})
                camera.setAttribute("movement-controls", {speed: movementControl.speed += 0.005})
            }
            if(e.code == 'ArrowUp'){
                movementControl.speed += 0.1
                camera.setAttribute("movement-controls", {speed: movementControl.speed})
                var acc = document.querySelector("#acceralarator")
                acc.setAttribute("material",{color: 'green'})
                speedInc += 0.5
                var speed = document.querySelector("#speed")
                speed.setAttribute("text",{value: speedInc})
            }

            if(e.code == 'Space'){
                var stop = document.querySelector("#breaks")
                stop.setAttribute("material",{color: 'red'})
                camera.setAttribute("movement-controls",{speed: 0})
                var speed = document.querySelector("#speed")
                speed.setAttribute("text",{value: 10})

            }
        })

        window.addEventListener('keyup' ,(e)=> {
            
            var camera = document.querySelector("#camera-rig")
            var movementControl = camera.getAttribute("movement-controls")
            
            var cameraDirection = new THREE.Vector3();
            camera.object3D.getWorldDirection(cameraDirection)

            if(e.code == "Space"){
                var stop = document.querySelector("#breaks")
                stop.setAttribute("material",{color: 'gray'})
            }
            if(e.code == 'ArrowUp'){
                var acc = document.querySelector("#acceralarator")
                acc.setAttribute("material",{color: 'gray'})
                speedInc -= 0.5
                var speed = document.querySelector("#speed")
                speed.setAttribute("text",{value: speedInc})
            }
        })
        
    }
})