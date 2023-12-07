const fs = require("fs");

const exampleData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const limits = { red: 12, green: 13, blue: 14 };

const parse = (data) => {
  const games = data.split("\n").map((row) => {
    const splitRow = row.split(":");
    const gameId = parseInt(splitRow[0].split(" ")[1], 10);
    const rounds = splitRow[1].split(";").map((round) => {
      return round.split(",").map((lift) => ({
        amount: lift.split(" ")[1],
        color: lift.split(" ")[2],
      }));
    });
    return { gameId, rounds };
  });
  return games;
};

const check = (game) => {
  let failed = false;
  game.rounds.forEach((round) => {
    round.forEach((lift) => {
      if (lift.amount > limits[lift.color]) failed = true;
    });
  });
  return failed ? 0 : game.gameId;
};

const run = (data) => {
  const games = parse(data);
  const sum = games.reduce((sum, game) => sum + check(game), 0);
  console.log(sum)
};

const test = () => {
  run(exampleData);
};

if (process.argv[2] === "test") {
  test();
} else {
  fs.readFile('../inputs/day2', "utf8", (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    run(data)
  })
}
