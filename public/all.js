(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var Networking = require('./networking');
var SyncObject = require('./sync_object');
var Rocket = require('./rocket');
var Bullet = require('./bullet');
var PlayerController = require('./player_controller');
var PlayerHud = require('./player_hud');
var Field = require('./field');

global.puts = function () {
	console.log.apply(console, arguments);
};

var game;

function init() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preloadGame, create: createGame, update: updateGame });

	// 素材読み込み
	function preloadGame() {
		game.load.spritesheet('gems', 'asset/gems.jpg', 141, 137);
	}

	var a = function a(_a) {
		return 1;
	};

	// Gameの初期化
	function createGame() {
		//game.time.desiredFps = 15; // 15FPSに指定
		game.time.desiredFps = 60; // 15FPSに指定
		game.stage.disableVisibilityChange = true;
		// game.physics.startSystem(Phaser.Physics.P2JS);

		// ネットワークの初期化
		var url = "http://" + window.location.hostname + ":8080";
		var playerId = Math.floor(Math.random() * 10000);
		game.networking = new Networking(game, url, playerId);
		game.networking.onInitialize = function () {
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
	function updateGame() {}
}

/*
Networking.networkingClasses = {
	Rocket: Rocket,
	Bullet: Bullet
};
*/

window.onload = init;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./bullet":2,"./field":3,"./networking":4,"./player_controller":5,"./player_hud":6,"./rocket":7,"./sync_object":8}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SyncObject = require('./sync_object');

/*******************************************************
 * 弾
 *******************************************************/

var Bullet = function (_SyncObject) {
	_inherits(Bullet, _SyncObject);

	function Bullet(game, data) {
		_classCallCheck(this, Bullet);

		// 画像の指定
		var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, game, data));

		_this.setTexture(game.cache.getPixiTexture('bullet'));
		_this.scale.setTo(0.25, 0.25);
		_this.anchor.setTo(0.5, 0.5);

		// 物理演算
		//game.physics.p2.enable(bullet);
		// あたり判定
		//bullet.body.setRectangle(10, 20);
		// 向き
		//bullet.body.rotation = rotate;
		// 発射
		//bullet.body.thrust(15000);
		return _this;
	}

	_createClass(Bullet, [{
		key: 'update',
		value: function update() {
			// this.rotation = rotation;
			this.speed = 200;
			this.vx = Math.sin(this.rotation) * this.speed;
			this.vy = -Math.cos(this.rotation) * this.speed;

			this.x += this.vx * this.game.time.physicsElapsed;
			this.y += this.vy * this.game.time.physicsElapsed;
		}
	}, {
		key: 'sendData',
		value: function sendData() {
			this.emit({ x: this.x, y: this.y, rotation: this.rotation });
		}
	}]);

	return Bullet;
}(SyncObject);

module.exports = Bullet;

},{"./sync_object":8}],3:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_Phaser$Group) {
	_inherits(Field, _Phaser$Group);

	function Field(game, data) {
		_classCallCheck(this, Field);

		var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, game, null, 'game'));

		game.add.existing(_this);

		for (var i = 0; i < 10; i++) {
			var gem = new Gem(game);
			gem.x = i * 100;
			console.log(i);
			_this.addChild(gem);
		}
		_this.x = 100;
		_this.y = 100;
		return _this;
	}

	_createClass(Field, [{
		key: 'update',
		value: function update() {
			//super.update()
			this.x = this.x + this.game.time.physicsElapsed * 10;
			this.y = this.y + this.game.time.physicsElapsed * 10;
		}
	}]);

	return Field;
}(Phaser.Group);

var Gem = function (_Phaser$Group2) {
	_inherits(Gem, _Phaser$Group2);

	function Gem(game, data) {
		_classCallCheck(this, Gem);

		var _this2 = _possibleConstructorReturn(this, (Gem.__proto__ || Object.getPrototypeOf(Gem)).call(this, game, 0, 0));

		game.add.existing(_this2);
		//this.scale.setTo(0.3, 0.3)
		var spr = game.make.sprite(0, 0, 'gems', 0);
		_this2.addChild(spr);

		var spr = game.make.sprite(30, 30, 'gems', 1);
		_this2.addChild(spr);
		return _this2;
	}

	_createClass(Gem, [{
		key: 'update',
		value: function update() {
			_get(Gem.prototype.__proto__ || Object.getPrototypeOf(Gem.prototype), 'update', this).call(this);
			puts(1);
		}
	}]);

	return Gem;
}(Phaser.Group);

Field.Gem = Gem;

module.exports = Field;

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************
 * 通信処理を行うオブジェクト
 *******************************************************/
var Networking = function (_Phaser$Sprite) {
	_inherits(Networking, _Phaser$Sprite);

	function Networking(game, url, playerId) {
		_classCallCheck(this, Networking);

		var _this = _possibleConstructorReturn(this, (Networking.__proto__ || Object.getPrototypeOf(Networking)).call(this, game, 0, 0, null));

		_this.playerId = playerId;
		_this.socket = io.connect(url);
		_this.objects = {};

		// サーバからデータを受け取る
		_this.socket.on("S2C_Start", function (data) {
			for (var i = 0; i < data.objectList.length; i++) {
				_this.updateObject(data.objectList[i]);
			}
			_this.socket.emit("C2S_Start", playerId);
			_this.onInitialize();
		});

		// サーバからデータを受け取り更新
		_this.socket.on("S2C_Update", function (data) {
			_this.updateObject(data);
		});

		// サーバからデータを受け取り更新
		_this.socket.on("S2C_Delete", function (id) {
			_this.deleteObject(id);
		});

		_this.socket.on("disconnect", function (data) {
			console.log('disconnected');
		});
		return _this;
	}

	_createClass(Networking, [{
		key: "update",
		value: function update() {}
	}, {
		key: "updateObject",
		value: function updateObject(data) {
			if (this.objects[data.id]) {
				this.objects[data.id].receiveData(data);
			} else {
				this.objects[data.id] = this.createObject(data);
			}
		}
	}, {
		key: "createObject",
		value: function createObject(data) {
			// console.log('create object: '+data.id);
			var cls = Networking.networkingClasses[data.className];
			var newObject = new cls(this.game, data);
			return newObject;
		}
	}, {
		key: "deleteObject",
		value: function deleteObject(id) {
			// console.log('delete object: '+id);
			if (this.objects[id]) {
				this.objects[id].onDelete();
				delete this.objects[id];
			}
		}
	}, {
		key: "onInitialize",
		value: function onInitialize() {}
	}]);

	return Networking;
}(Phaser.Sprite);

Networking.networkingClasses = {};

module.exports = Networking;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************
 * プレイヤーの入力を処理するクラス.
 *******************************************************/
var PlayerController = function (_Phaser$Sprite) {
	_inherits(PlayerController, _Phaser$Sprite);

	function PlayerController(game, player) {
		_classCallCheck(this, PlayerController);

		var _this = _possibleConstructorReturn(this, (PlayerController.__proto__ || Object.getPrototypeOf(PlayerController)).call(this, game, 0, 0, null));

		_this.player = player;
		_this.keys = game.input.keyboard.addKeys({
			'a': Phaser.KeyCode.Z,
			'b': Phaser.KeyCode.X,
			'up': Phaser.KeyCode.UP,
			'down': Phaser.KeyCode.DOWN,
			'left': Phaser.KeyCode.LEFT,
			'right': Phaser.KeyCode.RIGHT
		});

		game.add.existing(_this);
		return _this;
	}

	_createClass(PlayerController, [{
		key: 'update',
		value: function update() {
			var p = this.player;
			if (this.keys.left.isDown) {
				p.rotation -= 3 * this.game.time.physicsElapsed;
			} else if (this.keys.right.isDown) {
				p.rotation += 3 * this.game.time.physicsElapsed;
			}
			if (this.keys.up.isDown) {
				if (p.energy >= 1) {
					p.vx += 100 * Math.sin(p.rotation) * this.game.time.physicsElapsed;
					p.vy -= 100 * Math.cos(p.rotation) * this.game.time.physicsElapsed;
					p.energy -= 10.0 * this.game.time.physicsElapsed;
				}
			}
			if (this.keys.a.isDown) {
				if (p.reloadTime <= 0 && p.energy >= 1) {
					p.makeBullet();
					p.reloadTime = 0.06;
					p.energy -= 1;
				}
			}
			this.player.reloadTime -= this.game.time.physicsElapsed;
		}
	}]);

	return PlayerController;
}(Phaser.Sprite);

module.exports = PlayerController;

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************
 * 画面上部のHPやエナジーの表示.
 *******************************************************/
var PlayerHud = function (_Phaser$Sprite) {
	_inherits(PlayerHud, _Phaser$Sprite);

	function PlayerHud(game, player) {
		_classCallCheck(this, PlayerHud);

		var _this = _possibleConstructorReturn(this, (PlayerHud.__proto__ || Object.getPrototypeOf(PlayerHud)).call(this, game, 0, 0, null));

		_this.player = player;

		// HPゲージ
		_this.hpBarBg = game.add.graphics(50, 30).lineStyle(16, 0xff0000, 0.8).lineTo(_this.game.player.maxHealth, 0);

		_this.hpBar = game.add.graphics(50, 30);

		// powerゲージ
		_this.energyBarBg = game.add.graphics(80, 52.5).lineStyle(16, 0xff0000, 0.8).lineTo(player.maxEnergy, 0);

		_this.energyBar = game.add.graphics(80, 52.5);

		// テキスト
		_this.text = game.add.text(20, 20, "HP: \n" + "Energy: ", { font: "16px Arial", fill: "#EEE" });

		game.add.existing(_this);
		return _this;
	}

	_createClass(PlayerHud, [{
		key: "update",
		value: function update() {
			this.energyBar.clear().moveTo(0, 0).lineStyle(16, 0x00ced1, 0.9).lineTo(this.player.energy, 0);
			this.hpBar.clear().moveTo(0, 0).lineStyle(16, 0x00ff00, 0.9).lineTo(this.player.health, 0);
		}
	}]);

	return PlayerHud;
}(Phaser.Sprite);

module.exports = PlayerHud;

},{}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SyncObject = require('./sync_object');
var Bullet = require('./bullet');

/*******************************************************
 * プレイヤー/敵のロケット.
 *******************************************************/

var Rocket = function (_SyncObject) {
	_inherits(Rocket, _SyncObject);

	function Rocket(game, data) {
		_classCallCheck(this, Rocket);

		var _this = _possibleConstructorReturn(this, (Rocket.__proto__ || Object.getPrototypeOf(Rocket)).call(this, game, data));

		_this.energy = 100;
		_this.maxEnergy = 100;
		_this.health = 100;
		_this.maxHealth = 100;
		_this.vx = 0;
		_this.vy = 0;
		_this.reloadTime = 0;

		_this.setTexture(game.cache.getPixiTexture('player'));
		_this.scale.setTo(0.3, 0.3);
		_this.anchor.setTo(0.5, 0.5);
		// this.body.setRectangle(20, 80);

		// タイマー処理の登録
		_this.recovertyTimer = game.time.events.loop(0.2 * Phaser.Timer.SECOND, _this.onRecovery, _this);
		_this.networkTimer = game.time.events.loop(0.2 * Phaser.Timer.SECOND, _this.onNetwork, _this);
		return _this;
	}

	_createClass(Rocket, [{
		key: 'update',
		value: function update() {
			this.x += this.vx * this.game.time.physicsElapsed;
			this.y += this.vy * this.game.time.physicsElapsed;
		}
	}, {
		key: 'onRecovery',
		value: function onRecovery() {
			// Energyの回復
			if (this.energy < this.maxEnergy) {
				this.energy++;
			}
			if (this.health < this.game.player.maxHealth) {
				this.game.player.health += 0.2;
			}
		}
	}, {
		key: 'onNetwork',
		value: function onNetwork() {
			if (this.isOwn()) {
				this.emit({ x: this.x, y: this.y, vx: this.vx, vy: this.vy, rotation: this.rotation, energy: this.energy, health: this.health });
			}
		}
	}, {
		key: 'receiveData',
		value: function receiveData(data) {
			SyncObject.prototype.receiveData.call(this, data);
		}
	}, {
		key: 'makeBullet',
		value: function makeBullet() {
			var x = this.x + Math.sin(this.rotation) * 40;
			var y = this.y - Math.cos(this.rotation) * 40;
			var bullet = new Bullet(this.game, { x: x, y: y, rotation: this.rotation });
			bullet.sendData();
			return bullet;
		}
	}]);

	return Rocket;
}(SyncObject);

module.exports = Rocket;

},{"./bullet":2,"./sync_object":8}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************
 * ネットワークで同期されるオブジェクト
 *******************************************************/
var SyncObject = function (_Phaser$Sprite) {
	_inherits(SyncObject, _Phaser$Sprite);

	function SyncObject(game, data) {
		_classCallCheck(this, SyncObject);

		var _this = _possibleConstructorReturn(this, (SyncObject.__proto__ || Object.getPrototypeOf(SyncObject)).call(this, game, 0, 0, null));

		if (data.id) {
			_this.id = '' + data.id;
		} else {
			_this.id = '' + Math.floor(Math.random() * 1000000);
			_this.ownerId = game.networking.playerId;
		}
		_this.initializeData(data);
		game.add.existing(_this);
		return _this;
	}

	_createClass(SyncObject, [{
		key: 'initializeData',
		value: function initializeData(data) {
			this.receiveData(data);
		}
	}, {
		key: 'emit',
		value: function emit(data) {
			data.className = this.className;
			data.id = this.id;
			this.game.networking.socket.emit('C2S_Update', data);
		}
	}, {
		key: 'sendData',
		value: function sendData(data) {}
	}, {
		key: 'receiveData',
		value: function receiveData(data) {
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					this[key] = data[key];
				}
			}
		}
	}, {
		key: 'onDelete',
		value: function onDelete(data) {
			this.destroy();
		}
	}, {
		key: 'onReceiveData',
		value: function onReceiveData(data) {
			// DO NOTHING
		}
	}, {
		key: 'isOwn',
		value: function isOwn() {
			return this.ownerId == this.game.networking.playerId;
		}
	}]);

	return SyncObject;
}(Phaser.Sprite);

module.exports = SyncObject;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNyY1xcYXBwLmpzIiwic3JjXFxidWxsZXQuanMiLCJzcmNcXGZpZWxkLmpzIiwic3JjXFxuZXR3b3JraW5nLmpzIiwic3JjXFxwbGF5ZXJfY29udHJvbGxlci5qcyIsInNyY1xccGxheWVyX2h1ZC5qcyIsInNyY1xccm9ja2V0LmpzIiwic3JjXFxzeW5jX29iamVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTs7QUFFQSxJQUFJLGFBQWEsUUFBUSxjQUFSLENBQWpCO0FBQ0EsSUFBSSxhQUFhLFFBQVEsZUFBUixDQUFqQjtBQUNBLElBQUksU0FBUyxRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUksU0FBUyxRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUksbUJBQW1CLFFBQVEscUJBQVIsQ0FBdkI7QUFDQSxJQUFJLFlBQVksUUFBUSxjQUFSLENBQWhCO0FBQ0EsSUFBSSxRQUFRLFFBQVEsU0FBUixDQUFaOztBQUVBLE9BQU8sSUFBUCxHQUFjLFlBQVU7QUFBRSxTQUFRLEdBQVIsQ0FBWSxLQUFaLENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCO0FBQXdDLENBQWxFOztBQUVBLElBQUksSUFBSjs7QUFFQSxTQUFTLElBQVQsR0FBZ0I7O0FBRWYsUUFBTyxJQUFJLE9BQU8sSUFBWCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixPQUFPLElBQWpDLEVBQXVDLEVBQXZDLEVBQTJDLEVBQUUsU0FBUyxXQUFYLEVBQXdCLFFBQVEsVUFBaEMsRUFBNEMsUUFBUSxVQUFwRCxFQUEzQyxDQUFQOztBQUVBO0FBQ0EsVUFBUyxXQUFULEdBQXdCO0FBQ3ZCLE9BQUssSUFBTCxDQUFVLFdBQVYsQ0FBc0IsTUFBdEIsRUFBOEIsZ0JBQTlCLEVBQWdELEdBQWhELEVBQXFELEdBQXJEO0FBQ0E7O0FBRUQsS0FBSSxJQUFJLFdBQUMsRUFBRCxFQUFLO0FBQUUsU0FBTyxDQUFQO0FBQVcsRUFBMUI7O0FBRUE7QUFDRyxVQUFTLFVBQVQsR0FBdUI7QUFDekI7QUFDQSxPQUFLLElBQUwsQ0FBVSxVQUFWLEdBQXVCLEVBQXZCLENBRnlCLENBRUU7QUFDM0IsT0FBSyxLQUFMLENBQVcsdUJBQVgsR0FBcUMsSUFBckM7QUFDQTs7QUFFQTtBQUNBLE1BQUksTUFBTSxZQUFZLE9BQU8sUUFBUCxDQUFnQixRQUE1QixHQUF1QyxPQUFqRDtBQUNBLE1BQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBYyxLQUF6QixDQUFmO0FBQ0EsT0FBSyxVQUFMLEdBQWtCLElBQUksVUFBSixDQUFlLElBQWYsRUFBcUIsR0FBckIsRUFBMEIsUUFBMUIsQ0FBbEI7QUFDQSxPQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsR0FBK0IsWUFBVTtBQUN4QztBQUNBLFFBQUssS0FBTCxHQUFhLElBQUksS0FBSixDQUFVLElBQVYsQ0FBYjtBQUNBOzs7OztBQUtBLEdBUkQ7QUFTQTs7QUFFRDtBQUNBLFVBQVMsVUFBVCxHQUFzQixDQUNyQjtBQUNEOztBQUVEOzs7Ozs7O0FBT0EsT0FBTyxNQUFQLEdBQWdCLElBQWhCOzs7Ozs7Ozs7Ozs7Ozs7QUMzREEsSUFBSSxhQUFhLFFBQVEsZUFBUixDQUFqQjs7QUFFQTs7OztJQUdNLE07OztBQUNMLGlCQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBdUI7QUFBQTs7QUFHdEI7QUFIc0IsOEdBQ2hCLElBRGdCLEVBQ1YsSUFEVTs7QUFJdEIsUUFBSyxVQUFMLENBQWdCLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsUUFBMUIsQ0FBaEI7QUFDQSxRQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLElBQWpCLEVBQXVCLElBQXZCO0FBQ0EsUUFBSyxNQUFMLENBQVksS0FBWixDQUFrQixHQUFsQixFQUF1QixHQUF2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZnNCO0FBZ0J0Qjs7OzsyQkFDTztBQUNQO0FBQ0EsUUFBSyxLQUFMLEdBQWEsR0FBYjtBQUNBLFFBQUssRUFBTCxHQUFVLEtBQUssR0FBTCxDQUFTLEtBQUssUUFBZCxJQUEwQixLQUFLLEtBQXpDO0FBQ0EsUUFBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEdBQUwsQ0FBUyxLQUFLLFFBQWQsQ0FBRCxHQUEyQixLQUFLLEtBQTFDOztBQUVBLFFBQUssQ0FBTCxJQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxjQUFuQztBQUNBLFFBQUssQ0FBTCxJQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxjQUFuQztBQUNBOzs7NkJBQ1M7QUFDVCxRQUFLLElBQUwsQ0FBVSxFQUFDLEdBQUcsS0FBSyxDQUFULEVBQVksR0FBRyxLQUFLLENBQXBCLEVBQXVCLFVBQVUsS0FBSyxRQUF0QyxFQUFWO0FBQ0E7Ozs7RUE3Qm1CLFU7O0FBZ0NwQixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7Ozs7Ozs7Ozs7OztJQ3JDSyxLOzs7QUFFTCxnQkFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXVCO0FBQUE7O0FBQUEsNEdBQ2hCLElBRGdCLEVBQ1YsSUFEVSxFQUNKLE1BREk7O0FBRXRCLE9BQUssR0FBTCxDQUFTLFFBQVQ7O0FBRUEsT0FBSyxJQUFJLElBQUUsQ0FBWCxFQUFjLElBQUUsRUFBaEIsRUFBb0IsR0FBcEIsRUFBd0I7QUFDdkIsT0FBSSxNQUFNLElBQUksR0FBSixDQUFRLElBQVIsQ0FBVjtBQUNBLE9BQUksQ0FBSixHQUFRLElBQUUsR0FBVjtBQUNBLFdBQVEsR0FBUixDQUFZLENBQVo7QUFDQSxTQUFLLFFBQUwsQ0FBYyxHQUFkO0FBQ0E7QUFDRCxRQUFLLENBQUwsR0FBUyxHQUFUO0FBQ0EsUUFBSyxDQUFMLEdBQVMsR0FBVDtBQVhzQjtBQVl0Qjs7OzsyQkFFTztBQUNQO0FBQ0EsUUFBSyxDQUFMLEdBQVMsS0FBSyxDQUFMLEdBQVMsS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLGNBQWYsR0FBZ0MsRUFBbEQ7QUFDQSxRQUFLLENBQUwsR0FBUyxLQUFLLENBQUwsR0FBUyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsY0FBZixHQUFnQyxFQUFsRDtBQUNBOzs7O0VBcEJrQixPQUFPLEs7O0lBd0JyQixHOzs7QUFDTCxjQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBdUI7QUFBQTs7QUFBQSx5R0FDaEIsSUFEZ0IsRUFDVixDQURVLEVBQ1AsQ0FETzs7QUFFdEIsT0FBSyxHQUFMLENBQVMsUUFBVDtBQUNBO0FBQ0EsTUFBSSxNQUFNLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsTUFBdkIsRUFBK0IsQ0FBL0IsQ0FBVjtBQUNBLFNBQUssUUFBTCxDQUFjLEdBQWQ7O0FBRUEsTUFBSSxNQUFNLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsTUFBekIsRUFBaUMsQ0FBakMsQ0FBVjtBQUNBLFNBQUssUUFBTCxDQUFjLEdBQWQ7QUFSc0I7QUFTdEI7Ozs7MkJBQ087QUFDUDtBQUNBLFFBQUssQ0FBTDtBQUNBOzs7O0VBZGdCLE9BQU8sSzs7QUFnQnpCLE1BQU0sR0FBTixHQUFZLEdBQVo7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLEtBQWpCOzs7Ozs7Ozs7Ozs7O0FDMUNBOzs7SUFHTSxVOzs7QUFDTCxxQkFBWSxJQUFaLEVBQWtCLEdBQWxCLEVBQXVCLFFBQXZCLEVBQWdDO0FBQUE7O0FBQUEsc0hBQ3pCLElBRHlCLEVBQ25CLENBRG1CLEVBQ2hCLENBRGdCLEVBQ2IsSUFEYTs7QUFHL0IsUUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsUUFBSyxNQUFMLEdBQWMsR0FBRyxPQUFILENBQVcsR0FBWCxDQUFkO0FBQ0EsUUFBSyxPQUFMLEdBQWUsRUFBZjs7QUFFQTtBQUNBLFFBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxXQUFmLEVBQTRCLFVBQUMsSUFBRCxFQUFRO0FBQ25DLFFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBRyxLQUFLLFVBQUwsQ0FBZ0IsTUFBbkMsRUFBMkMsR0FBM0MsRUFBK0M7QUFDOUMsVUFBSyxZQUFMLENBQWtCLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFsQjtBQUNBO0FBQ0QsU0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixXQUFqQixFQUE4QixRQUE5QjtBQUNBLFNBQUssWUFBTDtBQUNBLEdBTkQ7O0FBUUE7QUFDQSxRQUFLLE1BQUwsQ0FBWSxFQUFaLENBQWUsWUFBZixFQUE2QixVQUFDLElBQUQsRUFBUztBQUNyQyxTQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDQSxHQUZEOztBQUlBO0FBQ0EsUUFBSyxNQUFMLENBQVksRUFBWixDQUFlLFlBQWYsRUFBNkIsVUFBQyxFQUFELEVBQU07QUFDbEMsU0FBSyxZQUFMLENBQWtCLEVBQWxCO0FBQ0EsR0FGRDs7QUFJQSxRQUFLLE1BQUwsQ0FBWSxFQUFaLENBQWUsWUFBZixFQUE2QixVQUFDLElBQUQsRUFBUTtBQUNwQyxXQUFRLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsR0FGRDtBQTFCK0I7QUE2Qi9COzs7OzJCQUNPLENBQ1A7OzsrQkFDWSxJLEVBQUs7QUFDakIsT0FBSSxLQUFLLE9BQUwsQ0FBYSxLQUFLLEVBQWxCLENBQUosRUFBMkI7QUFDMUIsU0FBSyxPQUFMLENBQWEsS0FBSyxFQUFsQixFQUFzQixXQUF0QixDQUFrQyxJQUFsQztBQUNBLElBRkQsTUFFSztBQUNKLFNBQUssT0FBTCxDQUFhLEtBQUssRUFBbEIsSUFBd0IsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXhCO0FBQ0E7QUFDRDs7OytCQUNZLEksRUFBSztBQUNqQjtBQUNBLE9BQUksTUFBTSxXQUFXLGlCQUFYLENBQTZCLEtBQUssU0FBbEMsQ0FBVjtBQUNBLE9BQUksWUFBWSxJQUFJLEdBQUosQ0FBUSxLQUFLLElBQWIsRUFBbUIsSUFBbkIsQ0FBaEI7QUFDQSxVQUFPLFNBQVA7QUFDQTs7OytCQUNZLEUsRUFBRztBQUNmO0FBQ0EsT0FBSSxLQUFLLE9BQUwsQ0FBYSxFQUFiLENBQUosRUFBc0I7QUFDckIsU0FBSyxPQUFMLENBQWEsRUFBYixFQUFpQixRQUFqQjtBQUNBLFdBQU8sS0FBSyxPQUFMLENBQWEsRUFBYixDQUFQO0FBQ0E7QUFDRDs7O2lDQUNhLENBQ2I7Ozs7RUF0RHVCLE9BQU8sTTs7QUF3RGhDLFdBQVcsaUJBQVgsR0FBK0IsRUFBL0I7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLFVBQWpCOzs7Ozs7Ozs7Ozs7O0FDN0RBOzs7SUFHTSxnQjs7O0FBQ0wsMkJBQVksSUFBWixFQUFrQixNQUFsQixFQUF5QjtBQUFBOztBQUFBLGtJQUNsQixJQURrQixFQUNaLENBRFksRUFDVCxDQURTLEVBQ04sSUFETTs7QUFFeEIsUUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLFFBQUssSUFBTCxHQUFZLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsT0FBcEIsQ0FBNEI7QUFDdkMsUUFBSyxPQUFPLE9BQVAsQ0FBZSxDQURtQjtBQUV2QyxRQUFLLE9BQU8sT0FBUCxDQUFlLENBRm1CO0FBR3ZDLFNBQU0sT0FBTyxPQUFQLENBQWUsRUFIa0I7QUFJdkMsV0FBUSxPQUFPLE9BQVAsQ0FBZSxJQUpnQjtBQUt2QyxXQUFRLE9BQU8sT0FBUCxDQUFlLElBTGdCO0FBTXZDLFlBQVMsT0FBTyxPQUFQLENBQWU7QUFOZSxHQUE1QixDQUFaOztBQVNBLE9BQUssR0FBTCxDQUFTLFFBQVQ7QUFad0I7QUFheEI7Ozs7MkJBQ087QUFDUCxPQUFJLElBQUksS0FBSyxNQUFiO0FBQ0EsT0FBSSxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsTUFBbkIsRUFBMEI7QUFDekIsTUFBRSxRQUFGLElBQWMsSUFBSSxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsY0FBakM7QUFDQSxJQUZELE1BRU0sSUFBSSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLE1BQXBCLEVBQTJCO0FBQ2hDLE1BQUUsUUFBRixJQUFjLElBQUksS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLGNBQWpDO0FBQ0E7QUFDRCxPQUFJLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFqQixFQUF3QjtBQUN2QixRQUFJLEVBQUUsTUFBRixJQUFZLENBQWhCLEVBQW1CO0FBQ2xCLE9BQUUsRUFBRixJQUFRLE1BQU0sS0FBSyxHQUFMLENBQVMsRUFBRSxRQUFYLENBQU4sR0FBNkIsS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLGNBQXBEO0FBQ0EsT0FBRSxFQUFGLElBQVEsTUFBTSxLQUFLLEdBQUwsQ0FBUyxFQUFFLFFBQVgsQ0FBTixHQUE2QixLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsY0FBcEQ7QUFDQSxPQUFFLE1BQUYsSUFBWSxPQUFPLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxjQUFsQztBQUNBO0FBQ0Q7QUFDRCxPQUFJLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxNQUFoQixFQUF1QjtBQUN0QixRQUFJLEVBQUUsVUFBRixJQUFnQixDQUFoQixJQUFxQixFQUFFLE1BQUYsSUFBWSxDQUFyQyxFQUF3QztBQUN2QyxPQUFFLFVBQUY7QUFDQSxPQUFFLFVBQUYsR0FBZSxJQUFmO0FBQ0EsT0FBRSxNQUFGLElBQVksQ0FBWjtBQUNBO0FBQ0Q7QUFDRCxRQUFLLE1BQUwsQ0FBWSxVQUFaLElBQTBCLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxjQUF6QztBQUNBOzs7O0VBckM2QixPQUFPLE07O0FBd0N0QyxPQUFPLE9BQVAsR0FBaUIsZ0JBQWpCOzs7Ozs7Ozs7Ozs7O0FDM0NBOzs7SUFHTSxTOzs7QUFDTCxvQkFBWSxJQUFaLEVBQWtCLE1BQWxCLEVBQXlCO0FBQUE7O0FBQUEsb0hBQ2xCLElBRGtCLEVBQ1osQ0FEWSxFQUNULENBRFMsRUFDTixJQURNOztBQUd4QixRQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBO0FBQ0EsUUFBSyxPQUFMLEdBQWUsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixFQUNaLFNBRFksQ0FDRixFQURFLEVBQ0UsUUFERixFQUNZLEdBRFosRUFFWixNQUZZLENBRUwsTUFBSyxJQUFMLENBQVUsTUFBVixDQUFpQixTQUZaLEVBRXVCLENBRnZCLENBQWY7O0FBSUEsUUFBSyxLQUFMLEdBQWEsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQixFQUF0QixDQUFiOztBQUVBO0FBQ0EsUUFBSyxXQUFMLEdBQW1CLEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsRUFBbEIsRUFBc0IsSUFBdEIsRUFDaEIsU0FEZ0IsQ0FDTixFQURNLEVBQ0YsUUFERSxFQUNRLEdBRFIsRUFFaEIsTUFGZ0IsQ0FFVCxPQUFPLFNBRkUsRUFFUyxDQUZULENBQW5COztBQUlBLFFBQUssU0FBTCxHQUFpQixLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLEVBQWxCLEVBQXNCLElBQXRCLENBQWpCOztBQUVBO0FBQ0EsUUFBSyxJQUFMLEdBQVksS0FBSyxHQUFMLENBQVMsSUFBVCxDQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsV0FBVyxVQUFqQyxFQUE2QyxFQUFFLE1BQU0sWUFBUixFQUFzQixNQUFNLE1BQTVCLEVBQTdDLENBQVo7O0FBR0EsT0FBSyxHQUFMLENBQVMsUUFBVDtBQXZCd0I7QUF3QnhCOzs7OzJCQUNPO0FBQ1AsUUFBSyxTQUFMLENBQWUsS0FBZixHQUF1QixNQUF2QixDQUE4QixDQUE5QixFQUFnQyxDQUFoQyxFQUFtQyxTQUFuQyxDQUE2QyxFQUE3QyxFQUFpRCxRQUFqRCxFQUEyRCxHQUEzRCxFQUFnRSxNQUFoRSxDQUF1RSxLQUFLLE1BQUwsQ0FBWSxNQUFuRixFQUEyRixDQUEzRjtBQUNBLFFBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsTUFBbkIsQ0FBMEIsQ0FBMUIsRUFBNEIsQ0FBNUIsRUFBK0IsU0FBL0IsQ0FBeUMsRUFBekMsRUFBNkMsUUFBN0MsRUFBdUQsR0FBdkQsRUFBNEQsTUFBNUQsQ0FBbUUsS0FBSyxNQUFMLENBQVksTUFBL0UsRUFBdUYsQ0FBdkY7QUFDQTs7OztFQTdCc0IsT0FBTyxNOztBQWdDL0IsT0FBTyxPQUFQLEdBQWlCLFNBQWpCOzs7Ozs7Ozs7Ozs7O0FDbkNBLElBQUksYUFBYSxRQUFRLGVBQVIsQ0FBakI7QUFDQSxJQUFJLFNBQVMsUUFBUSxVQUFSLENBQWI7O0FBRUE7Ozs7SUFHTSxNOzs7QUFDTCxpQkFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXVCO0FBQUE7O0FBQUEsOEdBQ2hCLElBRGdCLEVBQ1YsSUFEVTs7QUFHdEIsUUFBSyxNQUFMLEdBQWMsR0FBZDtBQUNBLFFBQUssU0FBTCxHQUFpQixHQUFqQjtBQUNBLFFBQUssTUFBTCxHQUFjLEdBQWQ7QUFDQSxRQUFLLFNBQUwsR0FBaUIsR0FBakI7QUFDQSxRQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsUUFBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLFFBQUssVUFBTCxHQUFrQixDQUFsQjs7QUFFQSxRQUFLLFVBQUwsQ0FBZ0IsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixRQUExQixDQUFoQjtBQUNBLFFBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsR0FBdEI7QUFDQSxRQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCO0FBQ0E7O0FBRUE7QUFDQSxRQUFLLGNBQUwsR0FBc0IsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixJQUFqQixDQUFzQixNQUFNLE9BQU8sS0FBUCxDQUFhLE1BQXpDLEVBQWlELE1BQUssVUFBdEQsUUFBdEI7QUFDQSxRQUFLLFlBQUwsR0FBb0IsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixJQUFqQixDQUFzQixNQUFNLE9BQU8sS0FBUCxDQUFhLE1BQXpDLEVBQWlELE1BQUssU0FBdEQsUUFBcEI7QUFsQnNCO0FBbUJ0Qjs7OzsyQkFDTztBQUNQLFFBQUssQ0FBTCxJQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxjQUFuQztBQUNBLFFBQUssQ0FBTCxJQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxjQUFuQztBQUNBOzs7K0JBQ1c7QUFDWDtBQUNBLE9BQUcsS0FBSyxNQUFMLEdBQWMsS0FBSyxTQUF0QixFQUFnQztBQUMvQixTQUFLLE1BQUw7QUFDQTtBQUNELE9BQUcsS0FBSyxNQUFMLEdBQWMsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixTQUFsQyxFQUE0QztBQUMzQyxTQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE1BQWpCLElBQTJCLEdBQTNCO0FBQ0E7QUFDRDs7OzhCQUNVO0FBQ1YsT0FBSSxLQUFLLEtBQUwsRUFBSixFQUFrQjtBQUNqQixTQUFLLElBQUwsQ0FBVSxFQUFDLEdBQUcsS0FBSyxDQUFULEVBQVksR0FBRyxLQUFLLENBQXBCLEVBQXVCLElBQUksS0FBSyxFQUFoQyxFQUFvQyxJQUFJLEtBQUssRUFBN0MsRUFBaUQsVUFBVSxLQUFLLFFBQWhFLEVBQTBFLFFBQVEsS0FBSyxNQUF2RixFQUErRixRQUFRLEtBQUssTUFBNUcsRUFBVjtBQUNBO0FBQ0Q7Ozs4QkFDVyxJLEVBQUs7QUFDaEIsY0FBVyxTQUFYLENBQXFCLFdBQXJCLENBQWlDLElBQWpDLENBQXNDLElBQXRDLEVBQTRDLElBQTVDO0FBQ0E7OzsrQkFDVztBQUNYLE9BQUksSUFBSSxLQUFLLENBQUwsR0FBUyxLQUFLLEdBQUwsQ0FBUyxLQUFLLFFBQWQsSUFBMEIsRUFBM0M7QUFDQSxPQUFJLElBQUksS0FBSyxDQUFMLEdBQVMsS0FBSyxHQUFMLENBQVMsS0FBSyxRQUFkLElBQTBCLEVBQTNDO0FBQ0EsT0FBSSxTQUFTLElBQUksTUFBSixDQUFXLEtBQUssSUFBaEIsRUFBc0IsRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFBYSxVQUFVLEtBQUssUUFBNUIsRUFBdEIsQ0FBYjtBQUNBLFVBQU8sUUFBUDtBQUNBLFVBQU8sTUFBUDtBQUNBOzs7O0VBaERtQixVOztBQW9EckIsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7Ozs7Ozs7Ozs7O0FDMURBOzs7SUFHTSxVOzs7QUFDTCxxQkFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXVCO0FBQUE7O0FBQUEsc0hBQ2hCLElBRGdCLEVBQ1YsQ0FEVSxFQUNQLENBRE8sRUFDSixJQURJOztBQUV0QixNQUFJLEtBQUssRUFBVCxFQUFhO0FBQ1osU0FBSyxFQUFMLEdBQVUsS0FBRyxLQUFLLEVBQWxCO0FBQ0EsR0FGRCxNQUVLO0FBQ0osU0FBSyxFQUFMLEdBQVUsS0FBRyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBYyxPQUF6QixDQUFiO0FBQ0EsU0FBSyxPQUFMLEdBQWUsS0FBSyxVQUFMLENBQWdCLFFBQS9CO0FBQ0E7QUFDRCxRQUFLLGNBQUwsQ0FBb0IsSUFBcEI7QUFDQSxPQUFLLEdBQUwsQ0FBUyxRQUFUO0FBVHNCO0FBVXRCOzs7O2lDQUNjLEksRUFBSztBQUNuQixRQUFLLFdBQUwsQ0FBaUIsSUFBakI7QUFDQTs7O3VCQUNJLEksRUFBSztBQUNULFFBQUssU0FBTCxHQUFpQixLQUFLLFNBQXRCO0FBQ0EsUUFBSyxFQUFMLEdBQVUsS0FBSyxFQUFmO0FBQ0EsUUFBSyxJQUFMLENBQVUsVUFBVixDQUFxQixNQUFyQixDQUE0QixJQUE1QixDQUFpQyxZQUFqQyxFQUErQyxJQUEvQztBQUNBOzs7MkJBQ1EsSSxFQUFLLENBQ2I7Ozs4QkFDVyxJLEVBQUs7QUFDaEIsUUFBSyxJQUFJLEdBQVQsSUFBZ0IsSUFBaEIsRUFBc0I7QUFDckIsUUFBSSxLQUFLLGNBQUwsQ0FBb0IsR0FBcEIsQ0FBSixFQUE4QjtBQUM3QixVQUFLLEdBQUwsSUFBWSxLQUFLLEdBQUwsQ0FBWjtBQUNBO0FBQ0Q7QUFDRDs7OzJCQUNRLEksRUFBSztBQUNiLFFBQUssT0FBTDtBQUNBOzs7Z0NBQ2EsSSxFQUFLO0FBQ2xCO0FBQ0E7OzswQkFDTTtBQUNOLFVBQVEsS0FBSyxPQUFMLElBQWdCLEtBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsUUFBN0M7QUFDQTs7OztFQXJDdUIsT0FBTyxNOztBQXdDaEMsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBOZXR3b3JraW5nID0gcmVxdWlyZSgnLi9uZXR3b3JraW5nJyk7XHJcbmxldCBTeW5jT2JqZWN0ID0gcmVxdWlyZSgnLi9zeW5jX29iamVjdCcpO1xyXG5sZXQgUm9ja2V0ID0gcmVxdWlyZSgnLi9yb2NrZXQnKTtcclxubGV0IEJ1bGxldCA9IHJlcXVpcmUoJy4vYnVsbGV0Jyk7XHJcbmxldCBQbGF5ZXJDb250cm9sbGVyID0gcmVxdWlyZSgnLi9wbGF5ZXJfY29udHJvbGxlcicpO1xyXG5sZXQgUGxheWVySHVkID0gcmVxdWlyZSgnLi9wbGF5ZXJfaHVkJyk7XHJcbmxldCBGaWVsZCA9IHJlcXVpcmUoJy4vZmllbGQnKTtcclxuXHJcbmdsb2JhbC5wdXRzID0gZnVuY3Rpb24oKXsgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgfTtcclxuXHJcbnZhciBnYW1lO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcclxuXHRnYW1lID0gbmV3IFBoYXNlci5HYW1lKDgwMCwgNjAwLCBQaGFzZXIuQVVUTywgJycsIHsgcHJlbG9hZDogcHJlbG9hZEdhbWUsIGNyZWF0ZTogY3JlYXRlR2FtZSwgdXBkYXRlOiB1cGRhdGVHYW1lIH0pO1xyXG5cclxuXHQvLyDntKDmnZDoqq3jgb/ovrzjgb9cclxuXHRmdW5jdGlvbiBwcmVsb2FkR2FtZSAoKSB7XHJcblx0XHRnYW1lLmxvYWQuc3ByaXRlc2hlZXQoJ2dlbXMnLCAnYXNzZXQvZ2Vtcy5qcGcnLCAxNDEsIDEzNyk7XHJcblx0fVxyXG5cclxuXHRsZXQgYSA9IChhKT0+eyByZXR1cm4gMTsgfVxyXG5cclxuXHQvLyBHYW1l44Gu5Yid5pyf5YyWXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVHYW1lICgpIHtcclxuXHRcdC8vZ2FtZS50aW1lLmRlc2lyZWRGcHMgPSAxNTsgLy8gMTVGUFPjgavmjIflrppcclxuXHRcdGdhbWUudGltZS5kZXNpcmVkRnBzID0gNjA7IC8vIDE1RlBT44Gr5oyH5a6aXHJcblx0XHRnYW1lLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcclxuXHRcdC8vIGdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5QMkpTKTtcclxuXHJcblx0XHQvLyDjg43jg4Pjg4jjg6/jg7zjgq/jga7liJ3mnJ/ljJZcclxuXHRcdHZhciB1cmwgPSBcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArIFwiOjgwODBcIjtcclxuXHRcdHZhciBwbGF5ZXJJZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XHJcblx0XHRnYW1lLm5ldHdvcmtpbmcgPSBuZXcgTmV0d29ya2luZyhnYW1lLCB1cmwsIHBsYXllcklkKTtcclxuXHRcdGdhbWUubmV0d29ya2luZy5vbkluaXRpYWxpemUgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQvLyBwbGF5ZXLjga7oqK3lrppcclxuXHRcdFx0Z2FtZS5maWVsZCA9IG5ldyBGaWVsZChnYW1lKTtcclxuXHRcdFx0LypcclxuXHRcdFx0ICBnYW1lLnBsYXllciA9IG5ldyBSb2NrZXQoZ2FtZSwge3g6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo4MDArMjApLCB5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNjAwKzIwKSwgcm90YXRpb246IDB9KTtcclxuXHRcdFx0Z2FtZS5jb250cm9sbGVyID0gbmV3IFBsYXllckNvbnRyb2xsZXIoZ2FtZSwgdGhpcy5nYW1lLnBsYXllcik7XHJcblx0XHRcdGdhbWUuaHVkID0gbmV3IFBsYXllckh1ZChnYW1lLCB0aGlzLmdhbWUucGxheWVyKTtcclxuXHRcdFx0Ki9cclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyBHYW1l44Gu5pu05paw5Yem55CGXHJcblx0ZnVuY3Rpb24gdXBkYXRlR2FtZSgpIHtcclxuXHR9XHJcbn1cclxuXHJcbi8qXHJcbk5ldHdvcmtpbmcubmV0d29ya2luZ0NsYXNzZXMgPSB7XHJcblx0Um9ja2V0OiBSb2NrZXQsXHJcblx0QnVsbGV0OiBCdWxsZXRcclxufTtcclxuKi9cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBpbml0O1xyXG4iLCJsZXQgU3luY09iamVjdCA9IHJlcXVpcmUoJy4vc3luY19vYmplY3QnKTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIOW8vlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8gXHJcbmNsYXNzIEJ1bGxldCBleHRlbmRzIFN5bmNPYmplY3Qge1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIGRhdGEpe1xyXG5cdFx0c3VwZXIoZ2FtZSwgZGF0YSk7XHJcblxyXG5cdFx0Ly8g55S75YOP44Gu5oyH5a6aXHJcblx0XHR0aGlzLnNldFRleHR1cmUoZ2FtZS5jYWNoZS5nZXRQaXhpVGV4dHVyZSgnYnVsbGV0JykpO1xyXG5cdFx0dGhpcy5zY2FsZS5zZXRUbygwLjI1LCAwLjI1KTtcclxuXHRcdHRoaXMuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuXHRcdFxyXG5cdFx0Ly8g54mp55CG5ryU566XXHJcblx0XHQvL2dhbWUucGh5c2ljcy5wMi5lbmFibGUoYnVsbGV0KTtcclxuXHRcdC8vIOOBguOBn+OCiuWIpOWumlxyXG5cdFx0Ly9idWxsZXQuYm9keS5zZXRSZWN0YW5nbGUoMTAsIDIwKTtcclxuXHRcdC8vIOWQkeOBjVxyXG5cdFx0Ly9idWxsZXQuYm9keS5yb3RhdGlvbiA9IHJvdGF0ZTtcclxuXHRcdC8vIOeZuuWwhFxyXG5cdFx0Ly9idWxsZXQuYm9keS50aHJ1c3QoMTUwMDApO1xyXG5cdH1cclxuXHR1cGRhdGUoKXtcclxuXHRcdC8vIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuXHRcdHRoaXMuc3BlZWQgPSAyMDA7XHJcblx0XHR0aGlzLnZ4ID0gTWF0aC5zaW4odGhpcy5yb3RhdGlvbikgKiB0aGlzLnNwZWVkO1xyXG5cdFx0dGhpcy52eSA9IC1NYXRoLmNvcyh0aGlzLnJvdGF0aW9uKSAqIHRoaXMuc3BlZWQ7XHJcblx0XHRcclxuXHRcdHRoaXMueCArPSB0aGlzLnZ4ICogdGhpcy5nYW1lLnRpbWUucGh5c2ljc0VsYXBzZWQ7XHJcblx0XHR0aGlzLnkgKz0gdGhpcy52eSAqIHRoaXMuZ2FtZS50aW1lLnBoeXNpY3NFbGFwc2VkO1xyXG5cdH1cclxuXHRzZW5kRGF0YSgpe1xyXG5cdFx0dGhpcy5lbWl0KHt4OiB0aGlzLngsIHk6IHRoaXMueSwgcm90YXRpb246IHRoaXMucm90YXRpb259KTtcclxuXHR9XHJcbn1cclxuXHJcbiBtb2R1bGUuZXhwb3J0cyA9IEJ1bGxldDtcclxuIiwiY2xhc3MgRmllbGQgZXh0ZW5kcyBQaGFzZXIuR3JvdXAge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihnYW1lLCBkYXRhKXtcclxuXHRcdHN1cGVyKGdhbWUsIG51bGwsICdnYW1lJyk7XHJcblx0XHRnYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuXHRcdFxyXG5cdFx0Zm9yKCB2YXIgaT0wOyBpPDEwOyBpKyspe1xyXG5cdFx0XHR2YXIgZ2VtID0gbmV3IEdlbShnYW1lKVxyXG5cdFx0XHRnZW0ueCA9IGkqMTAwXHJcblx0XHRcdGNvbnNvbGUubG9nKGkpXHJcblx0XHRcdHRoaXMuYWRkQ2hpbGQoZ2VtKVxyXG5cdFx0fVxyXG5cdFx0dGhpcy54ID0gMTAwXHJcblx0XHR0aGlzLnkgPSAxMDBcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpe1xyXG5cdFx0Ly9zdXBlci51cGRhdGUoKVxyXG5cdFx0dGhpcy54ID0gdGhpcy54ICsgdGhpcy5nYW1lLnRpbWUucGh5c2ljc0VsYXBzZWQgKiAxMFxyXG5cdFx0dGhpcy55ID0gdGhpcy55ICsgdGhpcy5nYW1lLnRpbWUucGh5c2ljc0VsYXBzZWQgKiAxMFxyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIEdlbSBleHRlbmRzIFBoYXNlci5Hcm91cCB7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgZGF0YSl7XHJcblx0XHRzdXBlcihnYW1lLCAwLCAwKVxyXG5cdFx0Z2FtZS5hZGQuZXhpc3RpbmcodGhpcylcclxuXHRcdC8vdGhpcy5zY2FsZS5zZXRUbygwLjMsIDAuMylcclxuXHRcdHZhciBzcHIgPSBnYW1lLm1ha2Uuc3ByaXRlKDAsIDAsICdnZW1zJywgMClcclxuXHRcdHRoaXMuYWRkQ2hpbGQoc3ByKVxyXG5cdFx0XHJcblx0XHR2YXIgc3ByID0gZ2FtZS5tYWtlLnNwcml0ZSgzMCwgMzAsICdnZW1zJywgMSlcclxuXHRcdHRoaXMuYWRkQ2hpbGQoc3ByKVxyXG5cdH1cclxuXHR1cGRhdGUoKXtcclxuXHRcdHN1cGVyLnVwZGF0ZSgpXHJcblx0XHRwdXRzKDEpXHJcblx0fVxyXG59XHJcbkZpZWxkLkdlbSA9IEdlbVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZDtcclxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICog6YCa5L+h5Yem55CG44KS6KGM44GG44Kq44OW44K444Kn44Kv44OIXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5jbGFzcyBOZXR3b3JraW5nIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgdXJsLCBwbGF5ZXJJZCl7XHJcblx0XHRzdXBlcihnYW1lLCAwLCAwLCBudWxsKTtcclxuXHJcblx0XHR0aGlzLnBsYXllcklkID0gcGxheWVySWQ7XHJcblx0XHR0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QodXJsKTtcclxuXHRcdHRoaXMub2JqZWN0cyA9IHt9O1xyXG5cdFx0XHJcblx0XHQvLyDjgrXjg7zjg5DjgYvjgonjg4fjg7zjgr/jgpLlj5fjgZHlj5bjgotcclxuXHRcdHRoaXMuc29ja2V0Lm9uKFwiUzJDX1N0YXJ0XCIsIChkYXRhKT0+e1xyXG5cdFx0XHRmb3IoIHZhciBpID0gMDsgaTwgZGF0YS5vYmplY3RMaXN0Lmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZU9iamVjdChkYXRhLm9iamVjdExpc3RbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc29ja2V0LmVtaXQoXCJDMlNfU3RhcnRcIiwgcGxheWVySWQpO1xyXG5cdFx0XHR0aGlzLm9uSW5pdGlhbGl6ZSgpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g44K144O844OQ44GL44KJ44OH44O844K/44KS5Y+X44GR5Y+W44KK5pu05pawXHJcblx0XHR0aGlzLnNvY2tldC5vbihcIlMyQ19VcGRhdGVcIiwgKGRhdGEpPT4ge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZU9iamVjdChkYXRhKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIOOCteODvOODkOOBi+OCieODh+ODvOOCv+OCkuWPl+OBkeWPluOCiuabtOaWsFxyXG5cdFx0dGhpcy5zb2NrZXQub24oXCJTMkNfRGVsZXRlXCIsIChpZCk9PntcclxuXHRcdFx0dGhpcy5kZWxldGVPYmplY3QoaWQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5zb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIChkYXRhKT0+e1xyXG5cdFx0XHRjb25zb2xlLmxvZygnZGlzY29ubmVjdGVkJyk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0dXBkYXRlKCl7XHJcblx0fVxyXG5cdHVwZGF0ZU9iamVjdChkYXRhKXtcclxuXHRcdGlmKCB0aGlzLm9iamVjdHNbZGF0YS5pZF0gKXtcclxuXHRcdFx0dGhpcy5vYmplY3RzW2RhdGEuaWRdLnJlY2VpdmVEYXRhKGRhdGEpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMub2JqZWN0c1tkYXRhLmlkXSA9IHRoaXMuY3JlYXRlT2JqZWN0KGRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjcmVhdGVPYmplY3QoZGF0YSl7XHJcblx0XHQvLyBjb25zb2xlLmxvZygnY3JlYXRlIG9iamVjdDogJytkYXRhLmlkKTtcclxuXHRcdHZhciBjbHMgPSBOZXR3b3JraW5nLm5ldHdvcmtpbmdDbGFzc2VzW2RhdGEuY2xhc3NOYW1lXTtcclxuXHRcdHZhciBuZXdPYmplY3QgPSBuZXcgY2xzKHRoaXMuZ2FtZSwgZGF0YSk7XHJcblx0XHRyZXR1cm4gbmV3T2JqZWN0O1xyXG5cdH1cclxuXHRkZWxldGVPYmplY3QoaWQpe1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ2RlbGV0ZSBvYmplY3Q6ICcraWQpO1xyXG5cdFx0aWYoIHRoaXMub2JqZWN0c1tpZF0gKXtcclxuXHRcdFx0dGhpcy5vYmplY3RzW2lkXS5vbkRlbGV0ZSgpO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5vYmplY3RzW2lkXTtcclxuXHRcdH1cclxuXHR9XHJcblx0b25Jbml0aWFsaXplKCl7XHJcblx0fVxyXG59XHJcbk5ldHdvcmtpbmcubmV0d29ya2luZ0NsYXNzZXMgPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTmV0d29ya2luZztcclxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICog44OX44Os44Kk44Ok44O844Gu5YWl5Yqb44KS5Yem55CG44GZ44KL44Kv44Op44K5LlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuY2xhc3MgUGxheWVyQ29udHJvbGxlciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHBsYXllcil7XHJcblx0XHRzdXBlcihnYW1lLCAwLCAwLCBudWxsKTtcclxuXHRcdHRoaXMucGxheWVyID0gcGxheWVyO1xyXG5cdFx0dGhpcy5rZXlzID0gZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXlzKHtcclxuXHRcdFx0J2EnOiBQaGFzZXIuS2V5Q29kZS5aLFxyXG5cdFx0XHQnYic6IFBoYXNlci5LZXlDb2RlLlgsXHJcblx0XHRcdCd1cCc6IFBoYXNlci5LZXlDb2RlLlVQLFxyXG5cdFx0XHQnZG93bic6IFBoYXNlci5LZXlDb2RlLkRPV04sXHJcblx0XHRcdCdsZWZ0JzogUGhhc2VyLktleUNvZGUuTEVGVCxcclxuXHRcdFx0J3JpZ2h0JzogUGhhc2VyLktleUNvZGUuUklHSFRcclxuXHRcdH0pO1xyXG5cclxuXHRcdGdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG5cdH1cclxuXHR1cGRhdGUoKXtcclxuXHRcdHZhciBwID0gdGhpcy5wbGF5ZXI7XHJcblx0XHRpZiAodGhpcy5rZXlzLmxlZnQuaXNEb3duKXtcclxuXHRcdFx0cC5yb3RhdGlvbiAtPSAzICogdGhpcy5nYW1lLnRpbWUucGh5c2ljc0VsYXBzZWQ7XHJcblx0XHR9ZWxzZSBpZiAodGhpcy5rZXlzLnJpZ2h0LmlzRG93bil7XHJcblx0XHRcdHAucm90YXRpb24gKz0gMyAqIHRoaXMuZ2FtZS50aW1lLnBoeXNpY3NFbGFwc2VkO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMua2V5cy51cC5pc0Rvd24pe1xyXG5cdFx0XHRpZiggcC5lbmVyZ3kgPj0gMSApe1xyXG5cdFx0XHRcdHAudnggKz0gMTAwICogTWF0aC5zaW4ocC5yb3RhdGlvbikgKiB0aGlzLmdhbWUudGltZS5waHlzaWNzRWxhcHNlZDtcclxuXHRcdFx0XHRwLnZ5IC09IDEwMCAqIE1hdGguY29zKHAucm90YXRpb24pICogdGhpcy5nYW1lLnRpbWUucGh5c2ljc0VsYXBzZWQ7XHJcblx0XHRcdFx0cC5lbmVyZ3kgLT0gMTAuMCAqIHRoaXMuZ2FtZS50aW1lLnBoeXNpY3NFbGFwc2VkO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5rZXlzLmEuaXNEb3duKXtcclxuXHRcdFx0aWYoIHAucmVsb2FkVGltZSA8PSAwICYmIHAuZW5lcmd5ID49IDEgKXtcclxuXHRcdFx0XHRwLm1ha2VCdWxsZXQoKTtcclxuXHRcdFx0XHRwLnJlbG9hZFRpbWUgPSAwLjA2O1xyXG5cdFx0XHRcdHAuZW5lcmd5IC09IDE7IFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLnBsYXllci5yZWxvYWRUaW1lIC09IHRoaXMuZ2FtZS50aW1lLnBoeXNpY3NFbGFwc2VkO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJDb250cm9sbGVyO1xyXG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiDnlLvpnaLkuIrpg6jjga5IUOOChOOCqOODiuOCuOODvOOBruihqOekui5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmNsYXNzIFBsYXllckh1ZCBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHBsYXllcil7XHJcblx0XHRzdXBlcihnYW1lLCAwLCAwLCBudWxsKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcblx0XHRcclxuXHRcdC8vIEhQ44Ky44O844K4XHJcblx0XHR0aGlzLmhwQmFyQmcgPSBnYW1lLmFkZC5ncmFwaGljcyg1MCwgMzApXHJcblx0XHRcdFx0LmxpbmVTdHlsZSgxNiwgMHhmZjAwMDAsIDAuOClcclxuXHRcdFx0XHQubGluZVRvKHRoaXMuZ2FtZS5wbGF5ZXIubWF4SGVhbHRoLCAwKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5ocEJhciA9IGdhbWUuYWRkLmdyYXBoaWNzKDUwLCAzMCk7XHJcblxyXG5cdFx0Ly8gcG93ZXLjgrLjg7zjgrhcclxuXHRcdHRoaXMuZW5lcmd5QmFyQmcgPSBnYW1lLmFkZC5ncmFwaGljcyg4MCwgNTIuNSlcclxuXHRcdFx0XHQubGluZVN0eWxlKDE2LCAweGZmMDAwMCwgMC44KVxyXG5cdFx0XHRcdC5saW5lVG8ocGxheWVyLm1heEVuZXJneSwgMCk7XHJcblx0XHRcclxuXHRcdHRoaXMuZW5lcmd5QmFyID0gZ2FtZS5hZGQuZ3JhcGhpY3MoODAsIDUyLjUpO1xyXG5cdFx0XHJcblx0XHQvLyDjg4bjgq3jgrnjg4hcclxuXHRcdHRoaXMudGV4dCA9IGdhbWUuYWRkLnRleHQoMjAsIDIwLCBcIkhQOiBcXG5cIiArIFwiRW5lcmd5OiBcIiwgeyBmb250OiBcIjE2cHggQXJpYWxcIiwgZmlsbDogXCIjRUVFXCIgfSk7XHJcblxyXG5cclxuXHRcdGdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG5cdH1cclxuXHR1cGRhdGUoKXtcclxuXHRcdHRoaXMuZW5lcmd5QmFyLmNsZWFyKCkubW92ZVRvKDAsMCkubGluZVN0eWxlKDE2LCAweDAwY2VkMSwgMC45KS5saW5lVG8odGhpcy5wbGF5ZXIuZW5lcmd5LCAwKTtcclxuXHRcdHRoaXMuaHBCYXIuY2xlYXIoKS5tb3ZlVG8oMCwwKS5saW5lU3R5bGUoMTYsIDB4MDBmZjAwLCAwLjkpLmxpbmVUbyh0aGlzLnBsYXllci5oZWFsdGgsIDApO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJIdWQ7XHJcbiIsImxldCBTeW5jT2JqZWN0ID0gcmVxdWlyZSgnLi9zeW5jX29iamVjdCcpO1xyXG5sZXQgQnVsbGV0ID0gcmVxdWlyZSgnLi9idWxsZXQnKTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIOODl+ODrOOCpOODpOODvC/mlbXjga7jg63jgrHjg4Pjg4guXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5jbGFzcyBSb2NrZXQgZXh0ZW5kcyBTeW5jT2JqZWN0IHtcclxuXHRjb25zdHJ1Y3RvcihnYW1lLCBkYXRhKXtcclxuXHRcdHN1cGVyKGdhbWUsIGRhdGEpO1xyXG5cclxuXHRcdHRoaXMuZW5lcmd5ID0gMTAwO1xyXG5cdFx0dGhpcy5tYXhFbmVyZ3kgPSAxMDA7XHJcblx0XHR0aGlzLmhlYWx0aCA9IDEwMDtcclxuXHRcdHRoaXMubWF4SGVhbHRoID0gMTAwO1xyXG5cdFx0dGhpcy52eCA9IDA7XHJcblx0XHR0aGlzLnZ5ID0gMDtcclxuXHRcdHRoaXMucmVsb2FkVGltZSA9IDA7XHJcblxyXG5cdFx0dGhpcy5zZXRUZXh0dXJlKGdhbWUuY2FjaGUuZ2V0UGl4aVRleHR1cmUoJ3BsYXllcicpKTtcclxuXHRcdHRoaXMuc2NhbGUuc2V0VG8oMC4zLCAwLjMpO1xyXG5cdFx0dGhpcy5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG5cdFx0Ly8gdGhpcy5ib2R5LnNldFJlY3RhbmdsZSgyMCwgODApO1xyXG5cdFx0XHJcblx0XHQvLyDjgr/jgqTjg57jg7zlh6bnkIbjga7nmbvpjLJcclxuXHRcdHRoaXMucmVjb3ZlcnR5VGltZXIgPSBnYW1lLnRpbWUuZXZlbnRzLmxvb3AoMC4yICogUGhhc2VyLlRpbWVyLlNFQ09ORCwgdGhpcy5vblJlY292ZXJ5LCB0aGlzKTtcclxuXHRcdHRoaXMubmV0d29ya1RpbWVyID0gZ2FtZS50aW1lLmV2ZW50cy5sb29wKDAuMiAqIFBoYXNlci5UaW1lci5TRUNPTkQsIHRoaXMub25OZXR3b3JrLCB0aGlzKTtcclxuXHR9XHJcblx0dXBkYXRlKCl7XHJcblx0XHR0aGlzLnggKz0gdGhpcy52eCAqIHRoaXMuZ2FtZS50aW1lLnBoeXNpY3NFbGFwc2VkO1xyXG5cdFx0dGhpcy55ICs9IHRoaXMudnkgKiB0aGlzLmdhbWUudGltZS5waHlzaWNzRWxhcHNlZDtcclxuXHR9XHJcblx0b25SZWNvdmVyeSgpe1xyXG5cdFx0Ly8gRW5lcmd544Gu5Zue5b6pXHJcblx0XHRpZih0aGlzLmVuZXJneSA8IHRoaXMubWF4RW5lcmd5KXtcclxuXHRcdFx0dGhpcy5lbmVyZ3krKztcclxuXHRcdH1cclxuXHRcdGlmKHRoaXMuaGVhbHRoIDwgdGhpcy5nYW1lLnBsYXllci5tYXhIZWFsdGgpe1xyXG5cdFx0XHR0aGlzLmdhbWUucGxheWVyLmhlYWx0aCArPSAwLjI7XHJcblx0XHR9XHJcblx0fVxyXG5cdG9uTmV0d29yaygpe1xyXG5cdFx0aWYoIHRoaXMuaXNPd24oKSApe1xyXG5cdFx0XHR0aGlzLmVtaXQoe3g6IHRoaXMueCwgeTogdGhpcy55LCB2eDogdGhpcy52eCwgdnk6IHRoaXMudnksIHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uLCBlbmVyZ3k6IHRoaXMuZW5lcmd5LCBoZWFsdGg6IHRoaXMuaGVhbHRofSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJlY2VpdmVEYXRhKGRhdGEpe1xyXG5cdFx0U3luY09iamVjdC5wcm90b3R5cGUucmVjZWl2ZURhdGEuY2FsbCh0aGlzLCBkYXRhKTtcclxuXHR9XHJcblx0bWFrZUJ1bGxldCgpe1xyXG5cdFx0dmFyIHggPSB0aGlzLnggKyBNYXRoLnNpbih0aGlzLnJvdGF0aW9uKSAqIDQwO1xyXG5cdFx0dmFyIHkgPSB0aGlzLnkgLSBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uKSAqIDQwO1xyXG5cdFx0dmFyIGJ1bGxldCA9IG5ldyBCdWxsZXQodGhpcy5nYW1lLCB7eDogeCwgeTogeSwgcm90YXRpb246IHRoaXMucm90YXRpb259KTtcclxuXHRcdGJ1bGxldC5zZW5kRGF0YSgpO1xyXG5cdFx0cmV0dXJuIGJ1bGxldDtcclxuXHR9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJvY2tldDtcclxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICog44ON44OD44OI44Ov44O844Kv44Gn5ZCM5pyf44GV44KM44KL44Kq44OW44K444Kn44Kv44OIXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5jbGFzcyBTeW5jT2JqZWN0IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgZGF0YSl7XHJcblx0XHRzdXBlcihnYW1lLCAwLCAwLCBudWxsKTtcclxuXHRcdGlmKCBkYXRhLmlkICl7XHJcblx0XHRcdHRoaXMuaWQgPSAnJytkYXRhLmlkO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuaWQgPSAnJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDAwMCk7XHJcblx0XHRcdHRoaXMub3duZXJJZCA9IGdhbWUubmV0d29ya2luZy5wbGF5ZXJJZDtcclxuXHRcdH1cclxuXHRcdHRoaXMuaW5pdGlhbGl6ZURhdGEoZGF0YSk7XHJcblx0XHRnYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuXHR9XHJcblx0aW5pdGlhbGl6ZURhdGEoZGF0YSl7XHJcblx0XHR0aGlzLnJlY2VpdmVEYXRhKGRhdGEpO1xyXG5cdH1cclxuXHRlbWl0KGRhdGEpe1xyXG5cdFx0ZGF0YS5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZTtcclxuXHRcdGRhdGEuaWQgPSB0aGlzLmlkO1xyXG5cdFx0dGhpcy5nYW1lLm5ldHdvcmtpbmcuc29ja2V0LmVtaXQoJ0MyU19VcGRhdGUnLCBkYXRhKTtcclxuXHR9XHJcblx0c2VuZERhdGEoZGF0YSl7XHJcblx0fVxyXG5cdHJlY2VpdmVEYXRhKGRhdGEpe1xyXG5cdFx0Zm9yKCB2YXIga2V5IGluIGRhdGEgKXtcclxuXHRcdFx0aWYoIGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSApe1xyXG5cdFx0XHRcdHRoaXNba2V5XSA9IGRhdGFba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRvbkRlbGV0ZShkYXRhKXtcclxuXHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cdH1cclxuXHRvblJlY2VpdmVEYXRhKGRhdGEpe1xyXG5cdFx0Ly8gRE8gTk9USElOR1xyXG5cdH1cclxuXHRpc093bigpe1xyXG5cdFx0cmV0dXJuICh0aGlzLm93bmVySWQgPT0gdGhpcy5nYW1lLm5ldHdvcmtpbmcucGxheWVySWQpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTeW5jT2JqZWN0O1xyXG4iXX0=
