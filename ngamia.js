// import './currencies.json'

data = [
  {
    "id": 657164,
    "name": "EUR/USD",
    "score": "100"
  },
  {
    "id": 693284,
    "name": "GBP/USD",
    "score": "70"
  },
  {
    "id": 653242,
    "name": "EUR/GBP",
    "score": "95"
  },
  {
    "id": 653242,
    "name": "EUR/USD",
    "score": "65"
  }
]

empty = []
potatot= []

for (i=0; i < data.length; i++) {
  potatot.push( parseInt(data[i]["id"]) );
  if (potatot.includes(653242)){
    console.log('duplicate')
  }
// if the id already exists, alert the user

}
console.log(empty)





























Arr_EUR_USD = [
  {
    id: 1,
    name: "EUR/USD",
    score: 23
  },
  {
    id: 2,
    name: "EUR/USD",
    score: 25
  },
  {
    id: 3,
    name: "EUR/USD",
    score: 23
  }
]
