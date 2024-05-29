import { useEffect, useState } from "react";

//components
import { getCoinList } from "../services/cryptoApi";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true); //vaghti page avaz shod loading true false beshe
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        // console.log(json);
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();

    // fetch(GetCoinList)
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
  }, [page, currency]); // har vaght page taghir kard, dobare useEffect beshe

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
      {/* component chart neshun nade ta vaghti ke rush click beshhe va true beshe | !!: tabdil be boolean */}
    </div>
  );
}

export default HomePage;
