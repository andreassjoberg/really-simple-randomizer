# really-simple-randomizer

## Description

This is a simple project for randomizing, almost like a lottery.

### Algorithm

The algorithm for randomizing is as follows:

```ts
// Get random number with max
const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

// Loop for ordering input <names>
let unrandomized = [...names];
let randomized = [];

while (unrandomized.length > 0) {
  let nextIndex = getRandomNumber(unrandomized.length);
  let pickedItem = unrandomized.splice(nextIndex, 1);
  randomized.push(pickedItem[0]);
}
```

## Set up project

To set up this project locally:

### Clone this repository

```
git clone https://github.com/andreassjoberg/really-simple-randomizer
cd really-simple-randomizer
```

### Install the dependencies

```
npm install
```

### Run the development server

```
npm run dev
```
