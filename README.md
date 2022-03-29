# code-test-kana

## Setup

### With Docker

This project with build with docker and is the preferred way to develop with it.

To initialise the docker image run:

```
make setup
```

To compile the project into javascript run:

```
make build
```

To run the test suite run:

```
make test
```

### Without Docker

Make sure you have at lease `Node 16` installed or are using [Volta](https://volta.sh/).

To setup the project run:

```
yarn install
```

To compile the project into javascript run:

```
yarn build
```

To run the test suite run:

```
yarn test
or
yarn test:watch
```

## Task 1 - Flatten

### Specify any assumptions that you have made

- Could contain empty nested arrays

## Task 2 - Rainforest Robot

### Specify any assumptions that you have made

- Input is a text file only
- Should throw an error if an unexpected instruction is provided.
- There are no walls the robot can run into or has to navigate around.
- Picking up an item from an empty crate does not cause an error.
- Robot will drop all bags even if its not on the conveyor belt.

## Task 3 - Dictionary Dash

### How did you approach solving this problem?

I looked up how to easily compare two words for being one character apart, learned about the Levenshtein algorithm. Then I looked for an npm package which implemented the algorithm and installed it.

To start writing the code I added a test for if start and end were the same, then implemented the code to make the test pass. After that I iteratively added functionality using TDD.

### How did you check that your solution is correct?

I wrote a test first using the example provided in the task. Then I started by adding simple test cases such as, returning 0 if end word is not in the dictionary.

### Specify any assumptions that you have made

- Using packages to implement complex algorithms is fine.
- Should return -1 if no valid path exists
- Start/End word could be bigger/smaller than the dictionary words
- Start/End word could be a number string
- End word might not be in the dictionary
