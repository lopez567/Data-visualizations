//initialize graph
var graph = d3.select('svg');
var g = graph.append('g')

//define scale and axis
var xScale = d3.scaleLinear()
				.domain([0,250])
				.range([20,480])

var yScale = d3.scaleLinear()
				.domain([250,0])
				.range([0,460])

var xAxis = d3.axisBottom()
				.scale(xScale);

var yAxis = d3.axisLeft()
				.scale(yScale)

graph.append('g').attr("transform", "translate(0," + 500 + ")")
.call(xAxis).attr('class', 'axis')
graph.append('g').attr("transform", "translate(27,40)")
.call(yAxis).attr('class', 'axis')



//append animal data points to graph
var updateAnimals = function(data) {
	var animals = g.selectAll('circle')
		.data(data, d => d.id)


	animals.enter().append('circle')
		.attr('cx', d => d.brainWeight * 2)
		.attr('cy', d => 500 - d.weight * 2)
		.attr('r', 3)
		.attr('class', d => 'animals')
}

updateAnimals(animalData);

var randomCoord = function() {
	return Math.floor(Math.random() * 240);
}

var randomPoint = function(color) {
	this.weight = randomCoord();
	this.brainWeight = randomCoord();
	this.class = color;
}

// if you wanna sound smart, call this the...
//EUCLIDEAN DISTANCE FUNCTION
var getDistance = function(point1, point2) {
	return Math.sqrt(Math.pow(point2.weight - point1.weight, 2) + Math.pow(point2.brainWeight - point1.brainWeight, 2));
}

var newAnimal = new randomPoint();

//K-neighbors algorithm: Trained data set
var guessSpecies = function(animal , k) {
	var guessingAnimal = g.selectAll('circle')
		.filter('.guess')
		.data([animal])



	var kNear = [];

	for (var i = 0; i < k; i ++) {
		kNear.push({data:{}, distance: 501})
	}

	animalData.forEach((x) => {
		var distance = getDistance(animal, x);
		var added = false;
		kNear.forEach((y , index) => {
			if (!added && distance <= y.distance) {
				kNear.splice(index,0, {data: x, distance: distance});
				added = true;
			}
		})

		if (added) {
			kNear.pop();
		}
	})

	var animalCount = {};
	var animalGuess = {animal:'string', count: 0};

	g.selectAll('circle')
		.filter('.animals')
		.data(animalData, d => d.id)
		.attr('class', d => d.animal + ' animals')
		.classed('selected', d => {
			for (var i = 0; i < kNear.length; i ++) {
				if (d.weight === kNear[i].data.weight && d.brainWeight === kNear[i].data.brainWeight ) {
					return true
				}
			}
			return false;
		})

	kNear.forEach((x) => {
		var thisAnimal = x.data.animal;
		animalCount[thisAnimal] = animalCount[thisAnimal] || 0;
		animalCount[thisAnimal] ++;
		if (animalCount[thisAnimal] > animalGuess.count) {
			animalGuess = {animal: thisAnimal, count: animalCount[thisAnimal]}
		}
	})
		guessingAnimal.enter()
		.append('circle')
		.attr('class','guess')
		.attr('cx', d => d.brainWeight * 2)
		.attr('cy', d => 500 - d.weight * 2)
		.attr('r', 5)
		.attr('fill', 'white')
		.classed(animalGuess.animal, true);


	console.log(animalGuess.animal);

}


var clusterSpieces = function(k) {
	var clusterPoints = [];
	//Create k random cluster points
	for (var i = 0; i < k; i++) {
		var newCluster = new randomPoint(i);
		newCluster.xKids = [];
		newCluster.yKids = [];
		clusterPoints.push(newCluster);
	}

	var clusters = g.selectAll('circle')
		.filter('.cluster')
		.data(clusterPoints, d => d.class)


	clusters.enter().append('circle')
		.attr('cx', d => d.brainWeight * 2)
		.attr('cy', d => 500 - d.weight * 2)
		.attr('r', 7)
		.attr('class', d => 'a' + d.class + ' cluster')

	var animals = g.selectAll('circle')
		.filter('.animals')
		.data(animalData, d => d.id)

	//Assign the animals their nearest cluster >> Move to clusters to their average >> repeat until no more movement 

	var clusterThoseBadBoys = function() {
		var repeat = false;
		animals.attr('class', d => {
			var nearestCluster = {distance: 500, cluster: 'obj'};
			clusterPoints.forEach( point => {
				var distance = getDistance(d, point)
				if (distance <= nearestCluster.distance) {
					nearestCluster.distance = distance;
					nearestCluster.cluster = point;
				}
			})
			nearestCluster.cluster.xKids.push(d.brainWeight);
			nearestCluster.cluster.yKids.push(d.weight);
			return 'a' + nearestCluster.cluster.class;
		})

		//Define new cluster centers
		clusterPoints.forEach( point => {
			if (point.xKids.length === 0) {
				point.newX = randomCoord();
				point.newY = randomCoord();
			} else {
				var xSum = point.xKids.reduce( (a, b) => a + b);
				var ySum = point.yKids.reduce( (a, b) => a + b);
				point.newX = xSum / point.xKids.length;
				point.newY = ySum / point.yKids.length;
				point.xKids = [];
				point.yKids = [];
			}
			if (point.newX !== point.brainWeight || point.newY !== point.weight) {
				repeat = true;
			}
			point.brainWeight = point.newX;
			point.weight = point.newY;
		})
		

		g.selectAll('circle').filter('.cluster')
			.transition()
			.duration(500)
			.attr('cx', d => d.brainWeight * 2)
			.attr('cy', d => 500 - d.weight * 2)

		if (repeat) {
			setTimeout(()=>{clusterThoseBadBoys();},500);
		}	
	}

	clusterThoseBadBoys(); //!!!!!!!!!
}


var reset = function() {
	var data = g.selectAll('circle')
		.data(animalData, d => d.id)
		.attr('class', 'animals');

	data.exit().remove();
}
