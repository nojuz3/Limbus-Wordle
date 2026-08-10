import { useState, useEffect } from "react";
import ego_json from "../../json/Ego.json";

export default function Ego() {
  const [data, setData] = useState([]);
  const [target, setTarget] = useState([]);
  const [guess, setGuess] = useState([]);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  // setData(identity_json);
  useEffect(() => {
    setData(ego_json);
    const idex = Math.floor(Math.random() * ego_json.length);
    setTarget(ego_json[idex]);
  }, []);
  console.log(data);
  console.log(target);
  //
  //
  const filtered_data = data.filter((index) =>
    index.name.toLowerCase().includes(search.toLowerCase()),
  );
  // Guess
  function handleguess(compare, target) {
    const sinnerMatch = compare.sinner === target.sinner;
    const Match = compare.id === target.id;

    // Most likley to be possible to just do this all in a loop instead of seperatly
    const targetSkillTypes = target.skill[0].type;
    const compareSkillTypes = compare.skill[0].type;

    const targetCoins = target.skill[0].coin;
    const compareCoins = compare.skill[0].coin;

    const targetAffinity = target.skill[0].affinity;
    const compareAffinity = compare.skill[0].affinity;

    const targetRisk = target.skill[0].risk;
    const compareRisk = compare.skill[0].risk;
    //skills
    const resultskill = new Array(1).fill("red");
    if (targetSkillTypes === compareSkillTypes) {
      resultskill[0] = "green";
    }

    //coins
    const resultcoin = new Array(1).fill("red");
    if (targetCoins === compareCoins) {
      resultcoin[0] = "green";
    }

    //affinities
    const resultaffinity = new Array(1).fill("red");
    if (targetAffinity === compareAffinity) {
      resultaffinity[0] = "green";
    }

    //risk
    const resultRisk = new Array(1).fill("red");
    if (targetRisk === compareRisk) {
      resultRisk[0] = "green";
    }

    console.log(targetSkillTypes);
    console.log(compareSkillTypes);
    console.log(targetCoins);
    console.log(compareCoins);
    console.log(targetAffinity);
    console.log(compareAffinity);
    return {
      correct: Match,
      sinnerMatch,
      resultskill,
      resultcoin,
      resultaffinity,
      resultRisk,
    };
  }
  //
  const redirect = (compare) => {
    const result = handleguess(compare, target);
    setGuess((prev) => [...prev, { ...compare, result }]);
    setSearch("");
    setFocus(false);
    console.log(handleguess(compare, target));
  };
  function test() {
    console.log(guess);
  }
  return (
    <div class="content">
      <button onClick={() => test()}>TEST</button>
      <div class="box">
        <div class="guess-input">
          <input
            type="text"
            placeholder="Take a guess..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            class="search-input"
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 100)}
          />

          {focus && (
            <div class="guessField">
              {filtered_data.length > 0 ? (
                filtered_data.map((index) => (
                  <div key={index.id} onClick={() => redirect(index)}>
                    {index.name}
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>

      <div class="guessbox">
        <div className="guesses">
          {guess.reverse().map((item, index) => (
            <div class="guessidentity" key={index}>
              <h3>{item.name}</h3>
              <div class={item.result.correct ? "green" : "red"}>{item.sinner}</div>
              <div class={item.result.resultskill[0]}>{item.skill[0].type}</div>
              <div class={item.result.resultcoin[0]}>{item.skill[0].coin}</div>
              <div class={item.result.resultaffinity[0]}>{item.skill[0].affinity}</div>
              <div class={item.result.resultRisk[0]}>{item.skill[0].risk}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
