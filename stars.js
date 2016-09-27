
//intial variables
var board = d3.select('svg');
var g = board.append('g');
var w = window.innerWidth;
var h = window.innerHeight;

//star radius
var csR = "2px";
var msR = "1.5px";
var fsR = "1px";

//create some stars
var stars = [];

//Star constructor
class Star {
	constructor (id, r, duration) {
    this.id = id
		this.randomizeStart();
    this.duration = duration;
    this.r = r;
	}
  randomizeStart () {
    this.cx = Math.round(Math.random() * w);
    this.cy = Math.round(Math.random() * h);
  }
}


//generate initial stars
for (var i = 0; i < 90; i ++) {
  if (i < 30) {
    stars.push(new Star('c' + i, csR, 45000)); //Close Star
  }
  if (i < 45) { 
    stars.push(new Star('m' + i, msR, 80000)); //Medium Star
  }
  stars.push(new Star('f' + i, fsR, 170000)); //Far Star
}

var updateStars = function updateStars(stars) {
  var starwars = g.selectAll('circle')
    .data(stars, d => d.id )

    //new stars entering
    starwars.enter().append('circle')
      .attr('cx', d => d.cx)
      .attr('cy', d => d.cy)
      .attr('r', d => d.r)
      .attr('fill', 'white')
      .transition()
      .ease(d3.easeLinear)
      .duration(d => d.duration)
      .attr('cy', d => {
        d.cy -= h;
        return d.cy;
      })

    // starwars.
    //   .transition()
    //   .ease(d3.easeLinear)
    //   .duration(d => d.duration)
    //   .attr('cy', d => {
    //     d.cy += h;
    //     return d.cy;
    //   })


    starwars.exit().remove();
}

updateStars(stars);

// d3.interval( () => {
//   updateStars(stars);    
// },1000)








