class Field extends Phaser.Group {

	constructor(game, data){
		super(game, null, 'game');
		game.add.existing(this);
		
		for( var i=0; i<10; i++){
			var gem = new Gem(game)
			gem.x = i*100
			console.log(i)
			this.addChild(gem)
		}
		this.x = 100
		this.y = 100
	}

	update(){
		//super.update()
		this.x = this.x + this.game.time.physicsElapsed * 10
		this.y = this.y + this.game.time.physicsElapsed * 10
	}

}

class Gem extends Phaser.Group {
	constructor(game, data){
		super(game, 0, 0)
		game.add.existing(this)
		//this.scale.setTo(0.3, 0.3)
		var spr = game.make.sprite(0, 0, 'gems', 0)
		this.addChild(spr)
		
		var spr = game.make.sprite(30, 30, 'gems', 1)
		this.addChild(spr)
	}
	update(){
		super.update()
		puts(1)
	}
}
Field.Gem = Gem

module.exports = Field;
