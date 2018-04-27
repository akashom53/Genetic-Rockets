//Pupulation class
function Population() {
	this.rockets = [];
	this.matingPool = [];

	for (var i = 0; i < populationSize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.run = function() {
		for (var i = 0; i < populationSize; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}

	this.evaluate = function() {
		var maxFitness = 0;
		for (var i = 0; i < populationSize; i++) {
			this.rockets[i].calcFitness();
			if (maxFitness < this.rockets[i].fitness){
				maxFitness = this.rockets[i].fitness;
			}
		}



		for (var i = 0; i < populationSize; i++) {
			this.rockets[i].fitness /= maxFitness;
		}

		this.matingPool = [];

		for (var i = 0; i < populationSize; i++) {
			var n = this.rockets[i].fitness * 100;
			for (var j = 0; j < n; j++) {
				this.matingPool.push(this.rockets[i]);
			}
		}


	}

	this.selection = function() {
		var newRockets = [];
		for (var i = 0; i < populationSize; i++) {
			var parentA = random(this.matingPool);
			var parentB = random(this.matingPool);
			var childDna = parentA.dna.crossOver(parentB.dna);
			if (!parentA.reached && !parentB.reached) {
				childDna.mutate();
			}
			newRockets[i] = new Rocket(childDna);
		}
		this.rockets = newRockets;
	}

	this.avgDistance = function(){
		var totalDist = 0;
		for (var i = 0; i < populationSize; i++) {
			totalDist += this.rockets[i].distance;
		}
		return totalDist/populationSize;
	}

	this.avgFitness = function(){
		var totalFitness = 0;
		for (var i = 0; i < populationSize; i++) {
			totalFitness += this.rockets[i].fitness;
		}
		return totalFitness/populationSize;
	}

	this.reachedCount = function() {
		var reachedCount = 0;
		for (var i = 0; i < populationSize; i++) {
			if (this.rockets[i].reached)
			reachedCount ++;
		}
		return reachedCount;
	}

	this.getBestRockets = function() {
		var maxFitness = 0;
		var bestRocket = this.rockets[0];
		for (var i = 0; i < populationSize; i++) {
			this.rockets[i].calcFitness();
			if (maxFitness < this.rockets[i].fitness){
				maxFitness = this.rockets[i].fitness;
				bestRocket = this.rockets[i];
			}
		}
		return bestRocket;
		// bestRocket.showPath();
	}
}














