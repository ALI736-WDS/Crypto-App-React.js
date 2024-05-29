import { RotatingLines } from "react-loader-spinner";

//Components
import { marketChart } from "../services/cryptoApi";

//Image
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

//Style
import styles from "./TableCoin.module.css";

function TableCoin({ coins, isLoading, currency, setChart }) {
  // console.log(coins);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th> Coin </th>
              <th> Name </th>
              <th> Price </th>
              <th> 24h </th>
              <th> Total Volume </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                key={coin.id}
                coin={coin}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    current_price,
    price_change_percentage_24h: price_change, // : ydni ba in name azesh estefade mikonim
  } = coin;

  const showHandler = async () => {
    // setChart(true);  //test
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      // console.log(json);
      // setChart(json);
      // setChart({ ...json, coin: coin });
      setChart({ ...json, coin });
    } catch (error) {
      // console.log(error);
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span> {symbol.toUpperCase()} </span>
        </div>
      </td>
      <td> {name} </td>
      {currency === "usd" && <td> ${current_price.toLocaleString()} </td>}
      {currency === "eur" && <td> €{current_price.toLocaleString()} </td>}
      {currency === "jpy" && <td> ¥{current_price.toLocaleString()} </td>}
      {/* toLocaleString() : numbers EN ro 3ta 3ta joda mikone */}
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td> {total_volume.toLocaleString()} </td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};

export default TableCoin;
