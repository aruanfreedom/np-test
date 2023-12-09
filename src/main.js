import Kaboom from "kaboom";

const k = Kaboom({scale: 2})

const MOVE_SPEED = 200
const TILE_WIDTH = 32
const TILE_HEIGHT = TILE_WIDTH

k.loadSprite('invader', 'sprites/invader.png')
k.loadSprite('wall', 'sprites/wall.png')
k.loadSprite('player', 'sprites/player.png')

const level = k.addLevel([
    '!^^^^^^^^^^^    &',
    '!^^^^^^^^^^^    &',
    '!^^^^^^^^^^^    &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
], {
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_HEIGHT,
    tiles: {
        '^': () => [k.sprite('invader'), k.scale(0.7), 'invader'],
        '!': () => [k.sprite('wall'), 'left-wall'],
        '&': () => [k.sprite('wall'), 'rightWall'],
    }
})

const player = level.spawn([
    k.sprite('player'),
    k.pos(k.center()),
    k.anchor('center'),
    k.tile({isObstacle: true}),
    k.agent({speed: 640, allowDiagonals: true})
])


k.onKeyDown('right', () => {
    player.move(MOVE_SPEED, 0)
})

k.onKeyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
})

k.onClick(() => {
    const pos = k.mousePos()
    player.setTarget(vec2(
        Math.floor(pos.x / TILE_WIDTH) * TILE_WIDTH + TILE_WIDTH / 2,
        Math.floor(pos.y / TILE_HEIGHT) * TILE_HEIGHT + TILE_HEIGHT / 2,
    ))
})

const score = k.add([
    k.text('0'),
    k.pos(50, 50),
    k.scale(2),
//    k.z(2),
    {
        value: 0
    }
])

const TIME_LEFT = 100

const timer = k.add([
    k.text('0'),
    k.pos(90, 50),
//    k.z(2),
    k.scale(1),
    {
        time: TIME_LEFT
    }
])

timer.onUpdate(() => {
    timer.time -= k.dt();
    timer.text = timer.time.toFixed(2).toString()

    if (timer.time <= 0) {
        k.go('lose', score.value)
    }
})

k.debug.inspect = true

k.scene('lose', (args) => {
    k.add([
        k.text(args.score),
        k.anchor('center'),
        k.scale(5),
        k.pos(k.center())
    ])
})

const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
let LEVEL_DOWN = 50

k.onUpdate('invader', (invader) => {
    invader.move(CURRENT_SPEED, 0)
})

const invaders = level.get('invader', {recursive: true})

invaders.forEach(invader => {
    console.log(invader)
    invader.onColide('rightWall', () => {
        console.log('cool')
        //    CURRENT_SPEED = -INVADER_SPEED
        //    k.onUpdate('invader', (invader) => {
        //        invader.move(0, LEVEL_DOWN)
        //    })
    })
})
