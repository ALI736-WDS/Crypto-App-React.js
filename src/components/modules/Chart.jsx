import { useState } from "react";
import { convertData } from "../helpers/convertData";

//Style
import styles from "./Chart.module.css";
import {
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ chart, setChart }) {
  //   console.log(chart);

  const [type, setType] = useState("prices");
  // console.log(chart);
  // console.log(convertData(chart, type));

  const typeHandler = (event) => {
    // console.log(event.target);
    // console.log(event.target.tagName);
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      // console.log(type);
      setType(type);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt={chart.coin.name} />
          <p> {chart.coin.name} </p>
        </div>

        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market Caps
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p> Prices: </p>
            <span> ${chart.coin.current_price} </span>
          </div>
          <div>
            <p> ATH: </p> {/* bishtarin price */}
            <span> ${chart.coin.ath} </span>
          </div>
          <div>
            <p> MArket Caps: </p>
            <span> ${chart.coin.market_caps} </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* <LineChart width="400px" height="400px" data={convertData(chart, type)}> */}
      {/* agar dar component bala bud khat bala hast vali dar inja khat zir hast */}
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        {/* ya auto ya neveshtane adad */}
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        {/* hide beshe ke karbar gij nashe */}
        <XAxis dataKey="date" hide />
        {/* neveshtane {type} ya price va... dar paeene nemudar */}
        <Legend />
        {/* mouse harjaye nemudar bud, gheimat neshun bede */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
