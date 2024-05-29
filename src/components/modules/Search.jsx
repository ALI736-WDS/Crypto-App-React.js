import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

//Components
import { searchCoin } from "../services/cryptoApi";

//Style
import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  // const [coins, setCoins] = useState(""); //chun "" hast pas error mide (coins.map is not func)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log(text);
    const controller = new AbortController();

    setCoins([]); //baraye ejra shodan, agar search khali bud ya shod, chizi neshun nade

    //chun dar start yek reshte khali("") hast, dar faze mounting ham ejra miishe, pas ba in code ejra nemishe ta vaghti search konim
    if (!text) {
      setIsLoading(false); //agar yek dafe search ro pak konim, chun fetch zamab mibare, pas Loading mimune, inja false kardim ke namune
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        //vaghti darkhast haye ma bishtar az had beshe khata mide, pas inja handle kardim
        if (json.coins) {
          setIsLoading(false);
          setCoins(json.coins);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    setIsLoading(true);
    search();

    return () => controller.abort(); //darkhast ghabli ghat mishe va darkhaste jadid sabt mishe
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value)}
      >
        <option value="usd"> USD </option>
        <option value="eur"> EUR </option>
        <option value="jpy"> JPY </option>
      </select>

      {/* agar coins Search ok bud ya loading ham true bud SearchBox neshun bede */}
      {/* vaghti search mikonim, isLoading neshun dade nemishe chun dar useEffect (setCoins([])) yek array khali hast
       pas isLoading false mishe,vaghti ham coins ro gereft bazam isLoading false mishe
       va rahe hal kate zir hast ke ya coins bashe ya isLoading true bashe */}
      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading && (
            <RotatingLines
              width="50px"
              height="50px"
              strokeWidth="3"
              strokeColor="#3874ff"
            />
          )}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p> {coin.name} </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
