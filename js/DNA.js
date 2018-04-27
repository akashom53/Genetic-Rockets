//DNA class
function DNA(genes) {
	this.mutationRate = defaultMutationRate;

	if (genes){
		this.genes = genes;
	} else {
		this.genes = [];
		for (var i = 0; i < rocketLifeSpan; i++) {
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(maxForce);
		}
	}

	this.crossOver = function(partner) {
		var newGenes = [];
		var midPoint = floor(random(this.genes.length));
		for (var i = 0; i < this.genes.length; i++) {
			if (i < midPoint){
				newGenes[i] = this.genes[i];
			} else {
				newGenes[i] = partner.genes[i];
			}
		}
		return new DNA(newGenes);
	}

	this.mutate = function(){
		for (var i = 0; i < this.genes.length; i++) {
			if (random(1)<=this.mutationRate){
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxForce);
			}
		}
	}

}