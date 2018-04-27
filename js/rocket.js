//Rocket class
function Rocket(dna) {
	this.pos = createVector(rocketStartX, rocketStartY);
	this.vel = createVector();
	this.acc = createVector();
	if (dna) {
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}
	this.fitness = 0;
	this.distance = 0;
	this.reached = false;
	this.crashed = false;
	this.shortestDistanceTime = 0;
	this.shortestDistance = -1;
	this.ticker = 0;
	this.path = [];

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {

		// Check if reached target
		var d = dist(this.pos.x, this.pos.y, targetX, targetY);
		if (d < targetSize){
			this.reached = true;
		}

		// Update shortest distance values
		if (this.shortestDistance < 0 || this.shortestDistance > d){
			this.shortestDistance = d;
			this.shortestDistanceTime = this.ticker;
		}

		// Check if crashed
		if (this.pos.x <=0 || this.pos.x > canvasW || this.pos.y <=0 || this.pos.y > canvasH){
			this.crashed = true;
		}
		for (var i = 0; i < obstacles.length; i++){
			var item = obstacles[i];
			if (this.pos.x >= item.x && this.pos.x < (item.x + item.w) && this.pos.y >= item.y && this.pos.y <= (item.y + item.h)){
				this.crashed = true;
			}
		}


		// Physics
		if (!this.reached && !this.crashed) {
			this.applyForce(this.dna.genes[count]);
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(maxVel);
			this.path.push({x: this.pos.x, y: this.pos.y});
		}

		this.ticker++;
	}


	this.show = function() {
		push();
		noStroke();
		fill(0, 255, 155, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0,0,rocketH, rocketW);
		pop();
	}

	this.showPath = function() {
		push();
		for (var i = 0; i < this.path.length - 1; i++){
			stroke(255, 0, 0, 80);			
			line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y);
		}
		pop();
	}

	this.calcFitness = function() {
		this.distance = dist(this.pos.x, this.pos.y, targetX, targetY);
		this.fitness = map(this.distance, 0, canvasW, canvasW, 0);
		this.fitness *= this.fitness;
		var timeFitness = map(this.shortestDistanceTime, 0, canvasW, canvasW, 0);
		this.fitness = (this.fitness + timeFitness)/2;
		this.fitness = (this.fitness + this.shortestDistance);

		if (this.reached){
			this.fitness *= 10;
		}

		if (this.crashed){
			this.fitness /= 6;
		}
	}
}