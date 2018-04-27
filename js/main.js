// P5 Sketch
var population;
var lifeP;
var infoP;
var count = 0;
var generationCounter = 0;
var shouldStop = false;
var delayCounter = 0;
var shouldPause = false;
var bestRockets = [];

function setup(){
	console.log("Setup start");
	createCanvas(canvasW, canvasH);
	population = new Population();
	lifeP = createP();
	infoP = createP();
}


function draw(){
	if (!shouldStop){
		background(canvasBackground);
		//Draw target
		ellipse(targetX, targetY, targetSize, targetSize);

		//Draw obstacles
		obstacles.forEach(function(item, index){
			push();
			noStroke();
			fill( 255, 155, 0, 150);
			rect(item.x, item.y, item.w, item.h);
			pop();
		});

		//DrawPaths
		bestRockets.forEach(function(item, index) {
			item.showPath();
		});

		population.run();
		lifeP.html("Life: "+count);
		count++;
		if (count >= rocketLifeSpan){
			population.evaluate();
			bestRockets.unshift(population.getBestRockets());
			if (bestRockets.length > 5){
				bestRockets.length = 5;
			}
			// console.log(bestR)
			shouldStop = population.reachedCount() >= populationSize;
			infoP.html("<br>Genration: "+generationCounter+" Reached: "+population.reachedCount()+" Avg dist: "+population.avgDistance(), true);
			population.selection();
	
			count = 0;
			generationCounter++;
		}
	}
}