// Settings
var canvasW = window.innerWidth;
var canvasH = window.innerHeight;
var canvasBackground = 0;

var rocketW = canvasW/160;
var rocketH = rocketW * 5;

var rocketStartX = canvasW/2;
var rocketStartY = canvasH;
var rocketLifeSpan = 250;
var maxForce = 0.4;
var maxVel = 15;

var populationSize = 50;

var targetX = canvasW/2;
var targetY = canvasW/20;
var targetSize = canvasW/20;

var defaultMutationRate = 0.01;
var minMutationRate = 0.01;

var obstacles = [
	{
		x: canvasW/1.8,
		y: canvasH/2,
		w: canvasW/4,
		h: canvasW/50
	},
	{
		x: canvasW/4,
		y: canvasH/2,
		w: canvasW/4,
		h: canvasW/50
	}
];