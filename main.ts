namespace SpriteKind {
    export const Pacman = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 0
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 3
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 1
})
function turn (sprite: Sprite, direction: number, speed: number) {
    if (direction == 0) {
        sprite.vx = 0
        sprite.vy = 0 - speed
    } else if (direction == 1) {
        sprite.vx = speed
        sprite.vy = 0
    } else if (direction == 2) {
        sprite.vx = 0
        sprite.vy = speed
    } else {
        sprite.vx = 0 - speed
        sprite.vy = 0
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 2
})
let PACMAN_SPEED = 0
let pacmanSprite: Sprite = null
let direction = -1
tiles.setTilemap(tilemap`level`)
pacmanSprite = sprites.create(img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    `, SpriteKind.Pacman)
tiles.placeOnTile(pacmanSprite, tiles.getTileLocation(10, 15))
scene.cameraFollowSprite(pacmanSprite)
let EPSILON = 2
PACMAN_SPEED = 50
function alignIfSuitable(sprite:Sprite, direction:CollisionDirection):boolean {
    let currentLocation = tiles.locationOfSprite(sprite)
    let targetLocation = tiles.locationInDirection(currentLocation, direction)
    if (tiles.tileIsWall(targetLocation)) {
        return false;
    }

    if (Math.sqrt(Math.pow(sprite.x - currentLocation.x, 2) + Math.pow(sprite.y - currentLocation.y, 2)) >= EPSILON) {
        return false;
    }

    sprite.x = currentLocation.x
    sprite.y = currentLocation.y
    return true;
}

function directionToCollisionDirection(direction:number) :CollisionDirection{
    switch (direction) {
        case 0:return CollisionDirection.Top;
        case 1:return CollisionDirection.Right;
        case 2:return CollisionDirection.Bottom;
        case 3:return CollisionDirection.Left;
    }
    //TODO: should not be here, programming error instead.
    return CollisionDirection.Top
}

game.onUpdate(function(){
    if (direction != -1) {
        if (alignIfSuitable(pacmanSprite, directionToCollisionDirection(direction))) {
            turn(pacmanSprite, direction, PACMAN_SPEED)
            direction = -1
        }
        
    }
}) 
