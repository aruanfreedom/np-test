import Kaboom from "kaboom";

const k = Kaboom({ scale: 2 });

k.scene("lose", (args) => {
  k.add([
    k.text(args.score),
    k.anchor("center"),
    k.scale(5),
    k.pos(k.center()),
  ]);
});
