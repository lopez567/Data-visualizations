var data = `Mad Max: Fury Road
Inside Out
Selma
Spotlight
Star Wars: Episode VII - The Force Awakens
Brooklyn
It Follows
Shaun the Sheep Movie
The Martian
Room
Mission: Impossible Rogue Nation
Creed
Carol
Son of Saul
45 Years
Paddington
Timbuktu
Sicario
Spy
Mustang
GETT: The Trial of Viviane Amsalem
Amy
Phoenix
Seymour: An Introduction
Tangerine
Ex Machina
What We Do In The Shadows
Ingrid Bergman in Her Own Words (Jag är Ingrid)
About Elly
Bridge of Spies
Iris
Kurt Cobain: Montage Of Heck
Anomalisa
'71
The Look of Silence
Red Army
Listen To Me Marlon
Wild Tales
Heart of a Dog
Finders Keepers
Jafar Panahi's Taxi
Theeb
The Gift
Hitchcock/Truffaut
The Second Mother (Que Horas Ela Volta?)
The Big Short
Girlhood
Love & Mercy
The Diary Of A Teenage Girl
The Salt of the Earth
Best Of Enemies
Grandma
Appropriate Behavior
Boy and the World (O Menino e o Mundo)
Slow West
99 Homes
Going Clear: Scientology and the Prison of Belief
The Wonders
The Forbidden Room
A Most Violent Year
Beasts of No Nation
Steve Jobs
We Are Still Here
The End Of The Tour
The Wrecking Crew
The Duke Of Burgundy
I'll See You in My Dreams
Monkey Kingdom
The Lady In The Van
Black Souls
Güeros
The Hunting Ground
When Marnie Was There
Straight Outta Compton
The Black Panthers: Vanguard Of The Revolution
Clouds of Sils Maria
Queen of Earth
Still Alice
The Revenant
Breathe
Janis: Little Girl Blue
Dope
Peggy Guggenheim: Art Addict
Mr. Holmes
Trainwreck
The Peanuts Movie
James White
Mommy
The Walk
Sunshine Superman
Mississippi Grind
Coming Home
White God
Cartel Land
Far From the Madding Crowd
The Tribe
A Pigeon Sat on a Branch Reflecting on Existence
Bone Tomahawk
Kumiko, the Treasure Hunter`;
data = data.split('\n');

var movies = {
  year: 2015,
  movies: []
}

data.forEach(function(x){
  $.get('http://www.omdbapi.com/?t='+x+'&y=2015&r=json&tomatoes=true', function(data){
    movies.movies.push(data)
  })
})

