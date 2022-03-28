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

## Task 2 - Rainforest Robot

### Specify any assumptions that you have made

- Input is a text file only
- Should throw an error if an unexpected instruction is provided.
- There are no walls the robot can run into or has to navigate around.
- Picking up an item from an empty crate does not cause an error.
- Robot will drop all bags even if its not on the conveyor belt.

## Task 3 - Dictionary Dash

### How did you approach solving this problem?

### How did you check that your solution is correct?

### Specify any assumptions that you have made
