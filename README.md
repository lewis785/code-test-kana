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

I then started following TDD adding small tests one at a time. Once I had it working on the provided example, I went back and started refactoring the implementation. Thanks to the test that were create I could refactor without fearing that I would break functionality.

### How did you check that your solution is correct?

I wrote a test first using the example provided in the task, if this case pass then I have a valid solution. While adding functionality I fold TDD and added failing test first, then added the code to make it pass. I repeated this until the first test passed, after that I added a few more possible paths and tests that the lengths were correct.

### Specify any assumptions that you have made

- Using packages to implement complex algorithms is fine.
- Should return -1 if no valid path exists
- Start/End word could be bigger/smaller than the dictionary words
- Start/End word could be a number string
- End word might not be in the dictionary
- It is better to fail quickly. Without the input validation the test still pass, but would waste resource as failing inputs have to run through the whole dictionary to check they don't work. We can quickly check for failing cases and prevent wasting time searching.
