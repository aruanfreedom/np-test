import Kaboom from "kaboom";

const k = Kaboom({ scale: 2, background: 1 });

const INVADER_SPEED = 100;
const BULLET_SPEED = 400;
let CURRENT_SPEED = INVADER_SPEED;
let LEVEL_DOWN = 200;
const MOVE_SPEED = 200;
const TILE_WIDTH = 32;
const TILE_HEIGHT = 24;
const TIME_LEFT = 100;

k.loadSprite("invader", "sprites/invader.png");
k.loadSprite("wall", "sprites/wall.png");
k.loadSprite("player", "sprites/player.png");

const level = k.addLevel(
  [
    "!^^^^^^^^^^^    &",
    "!^^^^^^^^^^^    &",
    "!^^^^^^^^^^^    &",
    "!               &",
    "!               &",
    "!               &",
    "!               &",
    "!               &",
    "!               &",
    "!               &",
  ],
  {
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_HEIGHT,
    tiles: {
      "^": () => [
        k.sprite("invader"),
        k.area(),
        k.body(),
        k.scale(0.7),
        "invader",
      ],
      "!": () => [
        k.sprite("wall"),
        k.area(),
        k.body({ isStatic: true }),
        "left-wall",
      ],
      "&": () => [
        k.sprite("wall"),
        k.area(),
        k.body({ isStatic: true }),
        "right-wall",
      ],
    },
  },
);

const player = level.spawn([
  k.sprite("player"),
  k.pos(k.center().x, k.height() - 14),
  k.anchor("center"),
  k.area(),
  k.body(),
  "player",
]);

k.onKeyDown("right", () => {
  player.move(MOVE_SPEED, 0);
});

k.onKeyDown("left", () => {
  player.move(-MOVE_SPEED, 0);
});

const spawnBullet = (position) => {
  k.add([
    k.rect(6, 18),
    k.pos(position),
    k.anchor("center"),
    k.area(),
    k.body(),
    k.color(255, 255, 255),
    "bullet",
  ]);
};

k.onKeyDown("space", () => {
  spawnBullet(player.pos.add(0, -25));
});

k.onUpdate("bullet", (bullet) => {
  bullet.move(0, -BULLET_SPEED);

  if (bullet.pos.y < 0) {
    k.destroy(bullet);
  }
});

const score = k.add([
  k.text("0"),
  k.pos(k.width() - 70, 50),
  k.scale(2),
  //    k.z(2),
  {
    value: 0,
  },
]);

k.onCollide("bullet", "invader", (bullet, invader) => {
  k.shake(1);
  k.destroy(bullet);
  k.destroy(invader);
  score.value++;
  score.text = score.value;
  console.log(invader);
  if (level.get("invader").length <= 0) {
    k.go("lose", { win: true, score: score.value });
  }
});

const timer = k.add([
  k.text("0", { size: 20 }),
  k.pos(k.width() - 80, 10),
  k.z(2),
  //    k.(0),
  {
    time: TIME_LEFT,
  },
]);

timer.onUpdate(() => {
  timer.time -= k.dt();
  timer.text = timer.time.toFixed(2).toString();

  if (timer.time <= 0) {
    k.go("lose", { score: score.value });
  }
});

//k.debug.inspect = true

k.scene("lose", (args) => {
  k.add([
    k.text(args.win ? "win" : "lose"),
    k.anchor("center"),
    k.scale(3),
    k.pos(k.center().x - 200),
  ]);
  k.add([
    k.text(args.score),
    k.anchor("center"),
    k.scale(3),
    k.pos(k.center()),
  ]);
});

k.onUpdate("invader", (invader) => {
  invader.move(CURRENT_SPEED, 0);

  if (invader.pos.y >= 12 * 22) {
    k.go("lose", { score: score.value });
  }
});

k.onCollide("invader", "right-wall", () => {
  CURRENT_SPEED = -INVADER_SPEED;
  level.get("invader").forEach((invader) => {
    invader.move(0, LEVEL_DOWN);
  });
});

k.onCollide("invader", "left-wall", () => {
  CURRENT_SPEED = INVADER_SPEED;
  level.get("invader").forEach((invader) => {
    invader.move(0, LEVEL_DOWN);

    if (player.isOverlapping(invader)) {
      k.go("lose", { score: score.value });
    }
  });
});
