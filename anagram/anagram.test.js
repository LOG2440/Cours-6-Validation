const anagram = require("./anagram");
// const anagram = require("./anagram_refactor");

describe("Anagram tests", () => {
  test("anagram function exists", () => {
    expect(typeof anagram).toEqual("function");
  });

  test("should return True if two empty strings are given as input", () => {
    const result = anagram("", "");
    expect(result).toEqual(true);
  });

  test("should return False if first input is longer than second one", () => {
    const result = anagram("MAISON", "CHAT");
    expect(result).toEqual(false);
  });

  test('"cinema" should be be an anagram of "iceman"', () => {
    expect(anagram("cinema", "iceman")).toBeTruthy();
  });

  test('"Hello" should NOT be an anagram of "Aloha"', () => {
    expect(anagram("Hello", "Aloha")).toBeFalsy();
  });

  test('"Hello" should be an anagram of itself', () => {
    expect(anagram("Hello", "Hello")).toBeTruthy();
  });
});

describe("Anagram exercice", () => {
  test("TODO : case sensative", () => { });

  test("TODO: null parameters", () => { });

});
