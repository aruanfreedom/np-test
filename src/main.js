import Kaboom from "kaboom";

const startGame = () => {
    const k = Kaboom({
        global: true,
        scale: 1,
        debug: true,
        background: 1,
    })

    const MOVE_SPEED = 120
    const SLICER_SPEED = 120
    const SKELETON_SPEED = 60

    const {
        sprite,
        wait,
        loadSprite,
        loadRoot,
        scene,
        go,
        addLevel,
        z,
        add,
        area,
        body,
        pos,
        onCollide,
        center,
        get,
        anchor,
        dt,
        rand,
        onUpdate,
        onKeyDown
    } = k;

    const layer = {
        bg: z(1),
        obj: z(3),
        ui: z(4)
    }

    loadRoot('sprites/zelda/')
    loadSprite('link-going-left', '1Xq9biB.png')
    loadSprite('link-going-right', 'yZIb8O2.png')
    loadSprite('link-going-down', 'r377FIM.png')
    loadSprite('link-going-up', 'UkV0we0.png')
    loadSprite('left-wall', 'rfDoaa1.png')
    loadSprite('right-wall', 'SmHhgUn.png')
    loadSprite('top-wall', 'QA257Bj.png')
    loadSprite('bottom-wall', 'vWJWmvb.png')
    loadSprite('bottom-left-wall', 'awnTfNC.png')
    loadSprite('bottom-right-wall', '84oyTFy.png')
    loadSprite('top-left-wall', 'xlpUxIm.png')
    loadSprite('top-right-wall', 'z0OmBd1.jpg')
    loadSprite('top-door', 'U9nre4n.png')
    loadSprite('left-door', 'okdJNls.png')
    loadSprite('fire-pot', 'I7xSp7w.png')
    loadSprite('lanterns', 'wiSiY09.png')
    loadSprite('slicer', 'c6JFi5Z.png')
    loadSprite('skeleton', 'Ei1VnX8.png')
    loadSprite('stairs', 'VghkL08.png')
    loadSprite('bg', 'u4DVsx6.png')

    scene('game', ({level = 0, score = 0}) => {
        const maps = [
            [
                'ycc)cc^ccw',
                'a        b',
                'a     *  b',
                'a    (   b',
                '%        b',
                'a    (   b',
                'a  *     b',
                'a        b',
                'xd)dd)dddz',
            ], [
                'yccccccccw',
                'a        b',
                ')        )',
                'a        b',
                'a        b',
                'a        b',
                ')   $    )',
                'a   }    b',
                'xddddddddz',
            ]
        ]

        const levelConfig = {
            tileWidth: 48,
            tileHeight: 48,
            tiles: {
                a: () => [
                    sprite('left-wall'),
                    area(),
                    body({isStatic: true}),
                    'wall'
                ],
                c: () => [
                    sprite('top-wall'),
                    area(),
                    body({isStatic: true}),
                    'wall'
                ],
                b: () => [
                    sprite('right-wall'),
                    area(),
                    body({isStatic: true}),
                    'wall'
                ],
                d: () => [
                    sprite('bottom-wall'),
                    area(),
                    body({isStatic: true}),
                    'wall'
                ],
                w: () => [sprite('top-right-wall')],
                x: () => [sprite('bottom-left-wall')],
                y: () => [sprite('top-left-wall')],
                z: () => [sprite('bottom-right-wall')],
                '%': () => [sprite('left-door')],
                '^': () => [
                    sprite('top-door'),
                    area(),
                    'next-level'
                ],
                '$': () => [
                    sprite('stairs'),
                    area(),
                    'next-level'
                ],
                '*': () => [
                    sprite('slicer'),
                    area(),
                    'slicer',
                    'danger',
                    {dir: -1}
                ],
                '}': () => [
                    sprite('skeleton'),
                    area(),
                    'skeleton',
                    'danger',
                    {dir: -1, timer: 0}
                ],
                ')': () => [
                    sprite('lanterns'),
                    area(),
                    body({isStatic: true}),
                    'wall'
                ],
                '(': () => [
                    sprite('fire-pot'),
                    area(),
                    body({isStatic: true}),
                ],
            }
        }
        add([sprite('bg')])

        const scoreLabel = add([
            text('0'),
            pos(400, 450),
            layer.ui,
            {
                value: score
            }
        ])

        const level1 = addLevel(maps[level], levelConfig)

        const player = add([
            sprite('link-going-right'),
            pos(5, 190),
            area(),
            body(),
            'player'
        ])

        onKeyDown('right', () => {
            player.use(sprite('link-going-right'))
            player.move(MOVE_SPEED, 0)
        })

        onKeyDown('up', () => {
            player.use(sprite('link-going-up'))
            player.move(0, -MOVE_SPEED)
        })

        onKeyDown('down', () => {
            player.use(sprite('link-going-down'))
            player.move(0, MOVE_SPEED)
        })

        onKeyDown('left', () => {
            player.use(sprite('link-going-left'))
            player.move(-MOVE_SPEED, 0)
        })

        onUpdate('slicer', (slicer) => {
            slicer.move(slicer.dir * SLICER_SPEED, 0)
        })

        onUpdate('skeleton', (skeleton) => {
            skeleton.move(0, skeleton.dir * SKELETON_SPEED)
            skeleton.timer -= dt()

            if (skeleton.timer <= 0) {
                skeleton.dir = -skeleton.dir
                skeleton.timer = rand(5)
            }
        })

        onCollide('danger', 'player', () => {
            go('lose', {score: scoreLabel.value})
        })

        player.onCollide('next-level', (obj) => {
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value
            })
        })

        onCollide('danger', 'wall', (slicer) => {
            slicer.dir = -slicer.dir
        })
    })

    scene('lose', ({score}) => {
        add([
            text(score, {size: 32}),
            anchor('center'),
            pos(center())
        ])

        onKeyDown('space', () => {
            go('game', {level: 0, score: 0})
        })
    })

    go('game', {level: 1, score: 0})
}

startGame()