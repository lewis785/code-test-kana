import levenshtein from "fast-levenshtein";

export const dictionaryDash = (
  start: string,
  end: string,
  dictionary: string[]
) => {
  const dictionarySet = new Set(dictionary);
  if (!dictionarySet.has(end)) {
    return -1;
  }

  return findShortestPath(new Set([start]), end, new Set(dictionary), 0);
};

const findShortestPath = (
  visit: Set<string>,
  end: string,
  dictionary: Set<string>,
  depth: number
): number => {
  if (visit.has(end)) {
    return depth;
  }
  const nextVisit = new Set<string>();

  visit.forEach((word) => {
    dictionary.forEach((dict) => {
      console.log({ word, dict });
      if (levenshtein.get(word, dict) === 1) {
        nextVisit.add(dict);
        dictionary.delete(dict);
      }
    });
  });

  if (nextVisit.size === 0) {
    return -1;
  }

  return findShortestPath(nextVisit, end, dictionary, depth + 1);
};
