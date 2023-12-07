const fs = require("fs");

const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const digits = "123456789".split("");

const getFirstDigit = (row, reverse) => {
  let builder = "";
  const reverseStr = (str) =>
    reverse ? str.split("").reverse().join("") : str;

  for (
    let i = reverse ? row.length - 1 : 0;
    reverse ? i >= 0 : i < row.length;
    reverse ? i-- : i++
  ) {
    let char = row[i];

    let temp = numberWords.filter(
      (nw) => nw.length > builder.length && reverseStr(nw).startsWith(builder)
    );

    let possibleLetters = temp.map((str) =>
      reverseStr(str).charAt(builder.length)
    );

    if (possibleLetters.includes(char)) {
      builder += char;
    } else {
      if (builder.length > 1) i += (reverse ? 1 : -1) * (builder.length - 1)
      builder = row[i]
    }

    if (numberWords.includes(reverseStr(builder)))
      return `${numberWords.indexOf(reverseStr(builder)) + 1}`;

    if (digits.includes(char)) {
      return char;
    }
  }
  return "empty";
};

const getRowNumber = (row) => {
  const first = getFirstDigit(row, false);
  const last = getFirstDigit(row, true);
  return parseInt(`${first}${last}`, 10);
};

const compute = (data) => {
  const rows = data.split("\n");
  let sum = 0;
  let i = 0;
  for (const row of rows) {
    const rowNums = getRowNumber(row);
    console.log(i++, rowNums);
    sum += rowNums;
  }
  console.log(sum);
};

const run = () => {
  fs.readFile("../inputs/day1", "utf8", (err, data) => {
    compute(data, false);
  });
};

const exampleData = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const testOne = (str) => {
  console.log(getFirstDigit(str, false, true));
  console.log(getFirstDigit(str, true, true));
  console.log(str);
};

const testExampleData = () => {
  compute(exampleData);
};

// testOne(`lhmgblplseventhreenine9vcpnpvzhjronenhczffqt`);
// testExampleData()
run()
