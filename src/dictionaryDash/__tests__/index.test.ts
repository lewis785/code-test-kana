import { dictionaryDash } from "./../index";
describe("#dictionaryDash", () => {
  const dictionary = ["hit", "dot", "dog", "cog", "hot", "log"];

  it("should return 0 if start and end are the same", () => {
    expect(dictionaryDash("hit", "hit", dictionary)).toBe(0);
  });

  it("should return -1 if end word is not in dictionary", () => {
    expect(dictionaryDash("hit", "sit", dictionary)).toBe(-1);
  });

  it("should return -1 if no path from start to end", () => {
    expect(dictionaryDash("ask", "cog", dictionary)).toBe(-1);
  });

  it("should return -1 if start word is too long", () => {
    expect(dictionaryDash("shark", "cog", dictionary)).toBe(-1);
  });

  it("should return -1 if start word is too short", () => {
    expect(dictionaryDash("a", "cog", dictionary)).toBe(-1);
  });

  it("should return -1 if start word is a number", () => {
    expect(dictionaryDash("1", "cog", dictionary)).toBe(-1);
  });

  it("should return -1 if end word is a number", () => {
    expect(dictionaryDash("hit", "1", dictionary)).toBe(-1);
  });

  it.each([
    ["cog", "log", 1],
    ["hit", "dot", 2],
    ["hit", "cog", 4],
  ])(
    "should return shortest path length for %s -> %s",
    (start, end, expectLength) => {
      expect(dictionaryDash(start, end, dictionary)).toBe(expectLength);
    }
  );
});
