import { useState, useEffect } from "react";
import identity_json from "../../json/identity.json";

export default function Identity() {
  const [data, setData] = useState([]);
  const [target, setTarget] = useState([]);
  const [guess, setGuess] = useState([]);
  const [search, setSearch] = useState("");
  const [focus,setFocus] = useState(false);
  // setData(identity_json);
  useEffect(() => {
    setData(identity_json);
    const idex = Math.floor(Math.random() * identity_json.length);
    setTarget(identity_json[idex]);
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

    const targetSkillTypes = target.skills.map((i) => i.type);
    const compareSkillTypes = compare.skills.map((i) => i.type);

    const targetCoins = target.skills.map((i) => i.coin);
    const compareCoins = compare.skills.map((i) => i.coin);

    const targetAffinity = target.skills.map((i) => i.affinity);
    const compareAffinity = compare.skills.map((i) => i.affinity);
    //skills
    const resultskill = new Array(compareSkillTypes.length).fill("red");
    for (let i = 0; i < 4; i++) {
      for (let y = 0; y < 4; y++) {
        if (compareSkillTypes[i] == targetSkillTypes[y] && i == y) {
          resultskill[i] = "green";
          break;
        }
        if (compareSkillTypes[i] == targetSkillTypes[y] && i !== y) {
          resultskill[i] = "yellow";
        }
      }
    }
    //coins
    const resultcoin = new Array(compareCoins.length).fill("red");
    for (let i = 0; i < 4; i++) {
      for (let y = 0; y < 4; y++) {
        if (compareCoins[i] == targetCoins[y] && i == y) {
          resultcoin[i] = "green";
          break;
        }
        if (compareCoins[i] == targetCoins[y] && i !== y) {
          resultcoin[i] = "yellow";
        }
      }
    }
    //affinities
    const resultaffinity = new Array(compareAffinity.length).fill("red");
    for (let i = 0; i < 4; i++) {
      for (let y = 0; y < 4; y++) {
        if (compareAffinity[i] == targetAffinity[y] && i == y) {
          resultaffinity[i] = "green";
          break;
        }
        if (compareAffinity[i] == targetAffinity[y] && i !== y) {
          resultaffinity[i] = "yellow";
        }
      }
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
              <div class={item.result.resultskill[0]} >{item.skills[0].type}</div>
              <div class={item.result.resultskill[1]}>{item.skills[1].type}</div>
              <div class={item.result.resultskill[2]}>{item.skills[2].type}</div>
              <div class={item.result.resultcoin[0]}>{item.skills[0].coin}</div>
              <div class={item.result.resultcoin[1]}>{item.skills[1].coin}</div>
              <div class={item.result.resultcoin[2]}>{item.skills[2].coin}</div>
              <div class={item.result.resultaffinity[0]}>{item.skills[0].affinity}</div>
              <div class={item.result.resultaffinity[1]}>{item.skills[1].affinity}</div>
              <div class={item.result.resultaffinity[2]}>{item.skills[2].affinity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
