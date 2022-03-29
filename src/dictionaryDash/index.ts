import levenshtein from "fast-levenshtein";

export const dictionaryDash = (
  start: string,
  end: string,
  dictionary: string[]
) => {
  if (isInvalidInput(start, end, dictionary)) {
    return -1;
  }

  return shortestPath(new Set([start]), end, new Set(dictionary), 0);
};

const shortestPath = (
  visits: Set<string>,
  end: string,
  dictionary: Set<string>,
  depth: number
): number => {
  if (visits.has(end)) {
    return depth;
  }

  const nextVisit = findVisitNext(visits, dictionary);

  if (nextVisit.size === 0) {
    return -1;
  }

  return shortestPath(nextVisit, end, dictionary, depth + 1);
};

const findVisitNext = (visits: Set<string>, dictionary: Set<string>) => {
  const visitNext = new Set<string>();

  visits.forEach((visitWord) => {
    dictionary.forEach((dictionaryWord) => {
      if (levenshtein.get(visitWord, dictionaryWord) === 1) {
        visitNext.add(dictionaryWord);
        dictionary.delete(dictionaryWord);
      }
    });
  });

  return visitNext;
};

const isInvalidInput = (start: string, end: string, dictionary: string[]) => {
  if (!dictionary.find((ele) => ele === end)) {
    return true;
  }

  if (!isNaN(Number(start)) || !isNaN(Number(end))) {
    return true;
  }

  return start.length !== dictionary[0].length;
};
