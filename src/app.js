'use strict';

let Networking = require('./networking');
let SyncObject = require('./sync_object');
let Rocket = require('./rocket');
let Bullet = require('./bullet');
let PlayerController = require('./player_controller');
let PlayerHud = require('./player_hud');
let Field = require('./field');

global.puts = function(){ console.log.apply(console, arguments); };

var game;

function init() {
	
	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preloadGame, create: createGame, update: updateGame });

	// 素材読み込み
	function preloadGame () {
		game.load.spritesheet('gems', 'asset/gems.jpg', 141, 137);
	}

	let a = (a)=>{ return 1; }

	// Gameの初期化
    function createGame () {
		//game.time.desiredFps = 15; // 15FPSに指定
		game.time.desiredFps = 60; // 15FPSに指定
		game.stage.disableVisibilityChange = true;
		// game.physics.startSystem(Phaser.Physics.P2JS);

		// ネットワークの初期化
		var url = "http://" + window.location.hostname + ":8080";
		var playerId = Math.floor(Math.random()*10000);
		game.networking = new Networking(game, url, playerId);
		game.networking.onInitialize = function(){
			// playerの設定
			game.field = new Field(game);
			/*
			  game.player = new Rocket(game, {x: Math.floor(Math.random()*800+20), y: Math.floor(Math.random()*600+20), rotation: 0});
			game.controller = new PlayerController(game, this.game.player);
			game.hud = new PlayerHud(game, this.game.player);
			*/
		};
	}

	// Gameの更新処理
	function updateGame() {
	}
}

/*
Networking.networkingClasses = {
	Rocket: Rocket,
	Bullet: Bullet
};
*/

window.onload = init;
