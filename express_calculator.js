const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.get("/mean", (req, res, next) => {
  try {
    const nums = req.query.nums;
    if (!nums) {
      throw new ExpressError("Numbers are required", 400);
    }
    const numsString = nums.split(",");
    const numsIntegers = numsString.map(Number);
    if (numsIntegers.some(isNaN)) {
      throw new ExpressError("Invalid value", 400);
    }
    const mean =
      numsIntegers.reduce((acc, n) => {
        return acc + n;
      }, 0) / numsIntegers.length;
    console.log(mean);
    return res.json({
      Operation: "mean",
      Value: mean,
    });
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  try {
    const nums = req.query.nums;
    if (!nums) {
      throw new ExpressError("Numbers are required", 400);
    }
    const numsString = nums.split(",");
    const numsIntegers = numsString.map(Number);
    if (numsIntegers.some(isNaN)) {
      throw new ExpressError("Invalid value", 400);
    }
    numsIntegers.sort(function (a, b) {
      return a - b;
    });
    let median;
    if (numsString.length % 2 === 1) {
      median = numsIntegers[Math.floor(numsString.length / 2)];
    } else {
      let median1 = numsIntegers[numsString.length / 2 - 1];
      let median2 = numsIntegers[numsString.length / 2];
      median = (median1 + median2) / 2;
    }
    return res.json({
      Operation: "median",
      Value: median,
    });
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    const nums = req.query.nums;
    if (!nums) {
      throw new ExpressError("Numbers are required", 400);
    }
    const numsString = nums.split(",");
    const numsIntegers = numsString.map(Number);
    if (numsIntegers.some(isNaN)) {
      throw new ExpressError("Invalid value", 400);
    }
    numsIntegers.sort(function (a, b) {
      return a - b;
    });
    const accu = numsIntegers.reduce((acc, n) => {
      if (acc[n]) {
        acc[n].count++;
      } else {
        acc[n] = { count: 1 };
      }
      return acc;
    }, {});

    let mostRepeatedNumber = null;
    let highestCount = 0;

    for (let number in accu) {
      let count = accu[number].count;

      if (count > highestCount) {
        highestCount = count;
        mostRepeatedNumber = parseInt(number);
      }
    }
    res.json({
      Operation: "mode",
      Value: mostRepeatedNumber,
    });
  } catch (e) {
    next(e);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  res.send(error);
});
app.listen(3000, function () {
  console.log("App on port 3000");
});
