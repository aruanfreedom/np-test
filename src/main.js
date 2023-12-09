import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")
k.loadSprite("ground", "sprites/ground.png")

k.setGravity(1200)

k.add([
	k.pos(120, 0),
	k.sprite("bean"),
	k.area(),
	k.body()
])

k.addLevel([
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
	], {
	tileWidth: 64,
	tileHeight: 64,
	tiles: {
		"=": () => [
			k.sprite("ground"),
			k.area(),
			k.body({ isStatic: true })
			],
		"^": () => [
			k.sprite("ground"),
			k.area(),
			"danger",
			],
	}
})
