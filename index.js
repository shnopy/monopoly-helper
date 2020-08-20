const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let
  opts = ["Money", "Owned", "Dice", "AddP", "AddM", "Exit"],
  owned = [],
  money = 1500,
  funcs = {
    0: {
      "roll": () => {
        return `${Math.floor(Math.random() * 6) + 1}, ${Math.floor(Math.random() * 6) + 1}`;
      }
    },
    "money": () => {
      console.log(`You own: $${money}`);
    },
    "addm": () => {
      rl.question("How much to add? ", ans => {
        if (isNaN(parseInt(ans))) {
          console.log(`'${ans}' Is not a valid int!`);
          return run();
        }
        money += parseInt(ans);
        console.log(`Added: '${ans}' to balance`);

      });
    },
    "addp": () => {
      rl.question("What property do you want to add? ", ans => {
        if (ans.trim().length <= 0) {
          console.log("You must provide a property name");
          return run();
        }
        owned.push(`${ans[0].toUpperCase()}${ans.slice(1).toLowerCase()}`);
        console.log(`Added: ${ans} to your owned list`);

      });

    },
    "dice": () => {
      console.log(`Rolled: ${funcs[0].roll()}`);

    },
    "owned": () => {
      console.log(`You own:\n${owned.join(", ")}\n`);

    },
    "exit": () => rl.close()
  };


const run = () => {
  rl.question(`Select Option: ${opts.join(", ")}: `, ans => {
    try {
      let answer = opts.find(e => e.toLowerCase() === ans.toLowerCase()).toLowerCase();
      funcs[answer]();
      return run();
    } catch {
      console.log(`Option: '${ans}' Does not exist!`);
      return run();
    }
  });
};

rl.on("close", () => {
  console.log("\n");
  process.exit(0);
});


run();