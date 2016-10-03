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
		.attr('class', d => d.animal + ' animals')
}

updateAnimals(animalData);

var randomPoint = function() {
	this.weight = Math.floor(Math.random() * 240);
	this.brainWeight = Math.floor(Math.random() * 240);
}

var getDistance = function(point1, point2) {
	return Math.sqrt(Math.pow(point2.weight - point1.weight, 2) + Math.pow(point2.brainWeight - point1.brainWeight, 2));
}

var newAnimal = new randomPoint();

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