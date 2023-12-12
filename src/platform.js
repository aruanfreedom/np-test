import kaboom from "kaboom";

const k = kaboom();

k.loadSprite("bean", "sprites/bean.png");
k.loadSprite("ground", "sprites/ground.png");
k.loadSprite("bee", "sprites/bee.png");

k.setGravity(1200);

const player = k.add([k.pos(120, 0), k.sprite("bean"), k.area(), k.body()]);

const MOVE_SPEED = 200;

k.onKeyDown("left", () => {
  player.move(-MOVE_SPEED, 0);
});
k.onKeyDown("right", () => {
  player.move(MOVE_SPEED, 0);
});

k.addLevel(
  [
    "                          $",
    "                          $",
    "                          $",
    "                          $",
    "                          $",
    "           $$         =   $",
    "  %      ====         =   $",
    "                      =    ",
    "       ^^      = >    =   &",
    "===========================",
  ],
  {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
      "=": () => [k.sprite("ground"), k.area(), k.body({ isStatic: true })],
      "^": () => [k.sprite("bee"), k.area(), k.body(), "danger"],
    },
  },
);

player.onCollide("danger", () => {
  k.destroy(player);
});
