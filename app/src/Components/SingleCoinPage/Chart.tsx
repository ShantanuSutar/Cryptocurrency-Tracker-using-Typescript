import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../Context/CryptoContext";
import { HistoricalChart } from "../../Config/api";
import axios from "axios";
import { CoinObj } from "../../Pages/SingleCoinPage";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

type Props = {
  coin: CoinObj;
};

type CoinChartInfo = {
  prices: [number, number][];
};

const temp: CoinChartInfo = {
  prices: [
    [1672099200000, 1401071.6110492614],
    [1672185600000, 1382485.5038111976],
    [1672272000000, 1370289.7171533045],
    [1672358400000, 1378747.1283022363],
    [1672444800000, 1373982.4988126538],
    [1672531200000, 1369066.595045325],
    [1672617600000, 1374956.772548686],
    [1672704000000, 1379072.3257186178],
    [1672790400000, 1380618.1126177597],
    [1672876800000, 1393357.4597835515],
    [1672963200000, 1391096.378516845],
    [1673049600000, 1395379.3486152496],
    [1673136000000, 1394609.2480474745],
    [1673222400000, 1404794.0897564783],
    [1673308800000, 1413085.3348189374],
    [1673395200000, 1423507.746919764],
    [1673481600000, 1469118.370862329],
    [1673568000000, 1530397.4699576462],
    [1673654400000, 1620969.645581668],
    [1673740800000, 1708538.8528985113],
    [1673827200000, 1695050.2382770604],
    [1673913600000, 1729026.675908004],
    [1674000000000, 1724820.4349572577],
    [1674086400000, 1687916.4457340785],
    [1674172800000, 1712675.9868457587],
    [1674259200000, 1838633.2644409537],
    [1674345600000, 1843912.0744457026],
    [1674432000000, 1841079.5593792237],
    [1674518400000, 1873001.674379534],
    [1674604800000, 1845025.4763418552],
    [1674691200000, 1889272.785762859],
    [1674777600000, 1875256.2088831975],
    [1674864000000, 1881595.6231757018],
    [1674950400000, 1876669.9845183194],
    [1675036800000, 1939811.6871367441],
    [1675123200000, 1863320.9623992594],
    [1675209600000, 1891907.7810429765],
    [1675296000000, 1938596.1615527326],
    [1675382400000, 1931339.6393819707],
    [1675468800000, 1934558.1629366423],
    [1675555200000, 1925360.6085383664],
    [1675641600000, 1889749.7147893412],
    [1675728000000, 1885705.655110971],
    [1675814400000, 1927471.122854481],
    [1675900800000, 1896835.3749700442],
    [1675987200000, 1800915.9500642836],
    [1676073600000, 1784376.6737531049],
    [1676160000000, 1805639.551794425],
    [1676246400000, 1797107.4218729378],
    [1676332800000, 1801288.9473821477],
    [1676419200000, 1841305.157210805],
    [1676505600000, 2011259.984261354],
    [1676592000000, 1964400.458690801],
    [1676678400000, 2039639.8242407232],
    [1676764800000, 2040771.7795879638],
    [1676851200000, 2009917.3041991428],
    [1676937600000, 2049696.0608326558],
    [1677024000000, 2023260.3636310636],
    [1677110400000, 2000155.2971346404],
    [1677196800000, 1978796.7194731412],
    [1677283200000, 1921758.8256007936],
    [1677369600000, 1920472.2206987918],
    [1677456000000, 1952324.7676585752],
    [1677542400000, 1943823.4107476098],
    [1677628800000, 1913475.7241767636],
    [1677715200000, 1947945.3349579389],
    [1677801600000, 1932404.3330804694],
    [1677888000000, 1827688.9620757217],
    [1677974400000, 1826143.4952936303],
    [1678060800000, 1832153.949382238],
    [1678147200000, 1834781.4178152257],
    [1678233600000, 1823474.190939338],
    [1678320000000, 1779672.1355095156],
    [1678406400000, 1671240.2354803404],
    [1678492800000, 1656379.2553975086],
    [1678579200000, 1682059.6107563623],
    [1678665600000, 1811522.3217423407],
    [1678752000000, 1992772.5566918782],
    [1678838400000, 2037774.121791452],
    [1678924800000, 2024132.4032971014],
    [1679011200000, 2078895.9533902158],
    [1679097600000, 2266903.44852778],
    [1679184000000, 2237277.9245539065],
    [1679270400000, 2326419.0978918397],
    [1679356800000, 2304976.198702885],
    [1679443200000, 2336812.543819979],
    [1679529600000, 2265278.6589777167],
    [1679616000000, 2341255.9042693865],
    [1679702400000, 2272418.789590086],
    [1679788800000, 2278570.3696924923],
    [1679875200000, 2309484.428083031],
    [1679961600000, 2234796.672572458],
    [1680048000000, 2242375.898645279],
    [1680134400000, 2335674.696631818],
    [1680220800000, 2302200.208076602],
    [1680307200000, 2343527.904995882],
    [1680393600000, 2342061.794257951],
    [1680480000000, 2320618.713116153],
    [1680566400000, 2284763.2519598315],
    [1680652800000, 2313618.7155112745],
    [1680739200000, 2310764.7975451234],
    [1680825600000, 2294800.8532265625],
    [1680912000000, 2287138.9856175524],
    [1680998400000, 2288925.527498754],
    [1681084800000, 2321542.600559456],
    [1681171200000, 2431483.770675589],
    [1681257600000, 2483525.4665221255],
    [1681344000000, 2450971.3472136725],
    [1681430400000, 2483511.698114073],
    [1681516800000, 2493723.472190294],
    [1681603200000, 2480814.014987451],
    [1681689600000, 2480298.4862880283],
    [1681776000000, 2416451.0197441946],
    [1681862400000, 2493266.7455798737],
    [1681948800000, 2374128.397712121],
    [1682035200000, 2320945.804282627],
    [1682121600000, 2239728.0686568217],
    [1682208000000, 2285792.6545645413],
    [1682294400000, 2265259.1942521725],
    [1682380800000, 2251897.562767527],
    [1682467200000, 2324548.9880850906],
    [1682553600000, 2318277.908892118],
    [1682640000000, 2410494.7212017034],
    [1682726400000, 2398417.1381113916],
    [1682812800000, 2388417.9143120754],
    [1682899200000, 2400202.900095905],
    [1682985600000, 2299961.3382251407],
    [1683072000000, 2343323.1298635844],
    [1683158400000, 2370678.051770997],
    [1683244800000, 2357227.3677343624],
    [1683331200000, 2412688.7360843252],
    [1683417600000, 2360988.0270418096],
    [1683504000000, 2338409.5494712126],
    [1683590400000, 2265269.623021702],
    [1683676800000, 2266708.952248432],
    [1683763200000, 2264251.009122563],
    [1683849600000, 2218748.265120487],
    [1683936000000, 2203456.297513777],
    [1684022400000, 2202818.9230102086],
    [1684108800000, 2212165.0873038624],
    [1684195200000, 2239950.242883315],
    [1684281600000, 2223867.6888121753],
    [1684368000000, 2258331.9105884964],
    [1684454400000, 2220592.4522582507],
    [1684540800000, 2227069.0373311583],
    [1684627200000, 2244444.2360898177],
    [1684713600000, 2219685.413756571],
    [1684800000000, 2225488.2740885243],
    [1684886400000, 2256535.0082692304],
    [1684972800000, 2178595.872359711],
    [1685059200000, 2190651.288546645],
    [1685145600000, 2205965.1651732],
    [1685232000000, 2216719.4267232697],
    [1685318400000, 2321210.5963241346],
    [1685404800000, 2292398.685837462],
    [1685491200000, 2291473.0358103993],
    [1685577600000, 2252308.339999727],
    [1685664000000, 2207000.053994982],
    [1685750400000, 2245275.0901272446],
    [1685836800000, 2230221.6313207312],
    [1685923200000, 2250907.360249828],
    [1686009600000, 2128193.8906833124],
    [1686096000000, 2245848.3540408784],
    [1686182400000, 2176677.983766859],
    [1686268800000, 2186599.024030577],
    [1686355200000, 2181748.652908852],
    [1686441600000, 2131342.850326955],
    [1686528000000, 2136693.803135768],
    [1686614400000, 2133393.352289176],
    [1686700800000, 2129017.5566758686],
    [1686787200000, 2059967.0647345192],
    [1686873600000, 2094069.3684263374],
    [1686960000000, 2156385.6817765366],
    [1687046400000, 2170614.4218689273],
    [1687132800000, 2157076.591222086],
    [1687219200000, 2195421.2087000236],
    [1687305600000, 2322905.0327482843],
    [1687392000000, 2466579.306894936],
    [1687478400000, 2452313.331536682],
    [1687564800000, 2510305.482861818],
    [1687651200000, 2503658.687301294],
    [1687737600000, 2496834.8341948236],
    [1687824000000, 2483618.68925046],
    [1687910400000, 2516856.866327527],
    [1687996800000, 2467649.86712795],
    [1688083200000, 2500567.008879379],
    [1688169600000, 2502357.795775521],
    [1688256000000, 2510800.4193944354],
    [1688342400000, 2509846.4251004555],
    [1688428800000, 2551500.66957532],
    [1688515200000, 2523827.247568844],
    [1688601600000, 2511780.8648864306],
    [1688688000000, 2482233.259326311],
    [1688774400000, 2505856.8066318473],
    [1688860800000, 2501332.8841657774],
    [1688947200000, 2492500.3371170303],
    [1689033600000, 2508304.707670713],
    [1689120000000, 2523159.7176939403],
    [1689206400000, 2492740.9382487405],
    [1689292800000, 2579546.5761292763],
    [1689379200000, 2489624.087236037],
    [1689465600000, 2487955.793985559],
    [1689552000000, 2481791.118077841],
    [1689638400000, 2473781.1815545587],
    [1689724800000, 2449795.1575852367],
    [1689811200000, 2455280.3408354167],
    [1689897600000, 2445005.0533706634],
    [1689984000000, 2453095.223507758],
    [1690070400000, 2436353.1128828623],
    [1690156800000, 2464874.1856593033],
    [1690243200000, 2387740.8321554842],
    [1690329600000, 2394833.028224021],
    [1690416000000, 2407109.050658884],
    [1690502400000, 2405374.304441513],
    [1690588800000, 2411566.726990857],
    [1690675200000, 2415075.4206020744],
    [1690761600000, 2408184.5954391323],
    [1690848000000, 2404289.239653529],
    [1690934400000, 2431162.7295679585],
    [1691020800000, 2409393.4547564187],
    [1691107200000, 2415451.2024729415],
    [1691193600000, 2404893.2763585197],
    [1691280000000, 2401492.155005148],
    [1691366400000, 2401826.3680181787],
    [1691452800000, 2414659.238213743],
    [1691539200000, 2467311.1333673103],
    [1691625600000, 2451588.156062397],
    [1691712000000, 2436469.955533021],
    [1691798400000, 2438687.5457467195],
    [1691884800000, 2439956.322136694],
    [1691971200000, 2427652.0068137976],
    [1692057600000, 2448542.610285324],
    [1692144000000, 2426822.6714498103],
    [1692230400000, 2393419.9984536325],
    [1692316800000, 2202317.5732667907],
    [1692403200000, 2165644.3009247975],
    [1692489600000, 2170795.0766012617],
    [1692576000000, 2175721.386360952],
    [1692662400000, 2170848.4008961627],
    [1692748800000, 2162858.2275226014],
    [1692835200000, 2183309.4287665947],
    [1692921600000, 2159815.6643060762],
    [1693008000000, 2149889.7943216995],
    [1693094400000, 2146421.075951313],
    [1693180800000, 2156115.973983835],
    [1693267200000, 2159026.4870353565],
    [1693353600000, 2286949.950305201],
    [1693440000000, 2257501.1003986946],
    [1693526400000, 2143744.978878616],
    [1693612800000, 2135295.355971279],
    [1693699200000, 2138714.030613405],
    [1693785600000, 2147481.775067486],
    [1693872000000, 2137350.231191411],
    [1693958400000, 2143294.616446472],
    [1694044800000, 2144131.0817620084],
    [1694131200000, 2180306.1222950104],
    [1694217600000, 2151465.6829362125],
    [1694304000000, 2149978.9177428656],
    [1694390400000, 2145085.2033482553],
    [1694476800000, 2084618.5907835427],
    [1694563200000, 2127506.513437282],
    [1694649600000, 2175468.6697820765],
    [1694736000000, 2202863.303343263],
    [1694822400000, 2213445.708433196],
    [1694908800000, 2207058.1372679626],
    [1694995200000, 2203524.129665394],
    [1695081600000, 2226364.249045383],
    [1695168000000, 2264713.5209924625],
    [1695254400000, 2252241.012788149],
    [1695340800000, 2201959.186232191],
    [1695427200000, 2208119.09524525],
    [1695513600000, 2208275.7681153077],
    [1695600000000, 2178058.846425977],
    [1695686400000, 2181538.7554845912],
    [1695772800000, 2182852.376602991],
    [1695859200000, 2193284.7795098773],
    [1695945600000, 2250458.548244775],
    [1696032000000, 2238906.674136451],
    [1696118400000, 2243288.221467407],
    [1696204800000, 2322283.835082606],
    [1696291200000, 2302017.987903053],
    [1696377600000, 2283523.323057771],
    [1696464000000, 2313833.4472402805],
    [1696550400000, 2283384.959687888],
    [1696636800000, 2323460.323286724],
    [1696723200000, 2325493.331014359],
    [1696809600000, 2323182.119472775],
    [1696896000000, 2296783.8865847434],
    [1696982400000, 2280419.467850733],
    [1697068800000, 2233760.1145079993],
    [1697155200000, 2225509.447377109],
    [1697241600000, 2235317.7191028283],
    [1697328000000, 2237153.8123371834],
    [1697414400000, 2261146.1847369107],
    [1697500800000, 2372300.4576478037],
    [1697587200000, 2365335.9694330087],
    [1697673600000, 2358227.5471689864],
    [1697760000000, 2386926.182038966],
    [1697846400000, 2470715.667578222],
    [1697932800000, 2490919.5056957398],
    [1698019200000, 2496413.153401455],
    [1698105600000, 2736083.1103281155],
    [1698192000000, 2809839.9689812474],
    [1698278400000, 2867619.516305341],
    [1698364800000, 2845981.821843834],
    [1698451200000, 2827745.390897204],
    [1698537600000, 2843889.6528406786],
    [1698624000000, 2882402.6302779624],
    [1698710400000, 2873629.950202318],
    [1698796800000, 2887430.169591752],
    [1698883200000, 2952389.8034749026],
    [1698969600000, 2909322.1764094764],
    [1699056000000, 2888217.9825656037],
    [1699142400000, 2914581.504653316],
    [1699228800000, 2915734.9181537614],
    [1699315200000, 2915408.656393422],
    [1699401600000, 2949473.4255174035],
    [1699488000000, 2978825.839490866],
    [1699574400000, 3063620.197912316],
    [1699660800000, 3110561.2123282515],
    [1699747200000, 3092109.355608493],
    [1699833600000, 3087775.262547459],
    [1699920000000, 3040811.2265809127],
    [1700006400000, 2951079.9221700868],
    [1700092800000, 3153086.39652811],
    [1700179200000, 3009966.006708437],
    [1700265600000, 3042461.182329538],
    [1700352000000, 3047009.5964196203],
    [1700438400000, 3116295.605310324],
    [1700524800000, 3123700.4972828673],
    [1700611200000, 2997565.328085264],
    [1700697600000, 3122078.0154407155],
    [1700784000000, 3108183.872879769],
    [1700870400000, 3144243.624680418],
    [1700956800000, 3150152.467956248],
    [1701043200000, 3123790.0766631598],
    [1701129600000, 3105351.36568598],
    [1701216000000, 3152035.4963610363],
    [1701302400000, 3150692.7606126964],
    [1701388800000, 3143402.323342496],
    [1701475200000, 3220822.6876222533],
    [1701561600000, 3286874.3922204063],
    [1701648000000, 3326108.3498800467],
    [1701734400000, 3502084.84406011],
    [1701820800000, 3674715.7663348312],
    [1701907200000, 3648994.6708164774],
    [1701993600000, 3606757.017333664],
    [1702080000000, 3687803.1561784274],
    [1702166400000, 3649701.839042509],
    [1702252800000, 3651004.8544628094],
    [1702339200000, 3433830.1297089434],
    [1702425600000, 3456604.3883198216],
    [1702512000000, 3575556.6717009465],
    [1702598400000, 3582628.292673839],
    [1702684800000, 3487094.5433333325],
    [1702771200000, 3508274.673973795],
    [1702857600000, 3438832.1905636364],
    [1702944000000, 3547522.7913564327],
    [1703030400000, 3510647.7523598806],
    [1703116800000, 3633302.2088599433],
    [1703203200000, 3651327.1256976645],
    [1703289600000, 3667059.008887695],
    [1703376000000, 3646042.679760295],
    [1703462400000, 3579326.130744974],
    [1703548800000, 3629501.208844804],
    [1703593732000, 3551926.581928939],
  ],
};
registerables.forEach((module) => ChartJS.register(module));

const ChartComponent = ({ coin }: Props) => {
  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  const [historicaldata, setHistoricaldata] = useState<CoinChartInfo>(
    // {} as CoinChartInfo,
    temp,
  );
  const [days, setDays] = useState(1);

  const { currency } = useContext(CryptoContext);

  const fetchCoinChart = async () => {
    try {
      if (coin.id) {
        const { data } = await axios.get(
          HistoricalChart(coin.id, days, currency),
        );
        setHistoricaldata(data);
        // console.log(historicaldata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoinChart();
  }, [currency, days]);
  // console.log(historicaldata.prices);

  return (
    <div className=" w-full px-4 py-4">
      {/* Chart */}

      {!historicaldata ? (
        <div className=" flex justify-center text-3xl">Loading . . .</div>
      ) : (
        <div className=" w-full text-white">
          <Line
            data={{
              labels: historicaldata?.prices?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicaldata.prices.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </div>
      )}
      {/* Buttons */}
      <div className=" mx-auto mt-6 flex items-center justify-around gap-4 ">
        {chartDays.map((day) => {
          return (
            <div>
              <button
                className={` w-52 rounded-md border-2 border-yellow-400  bg-gray-800 py-1 font-semibold transition-all duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900 ${
                  day.value === days ? "bg-yellow-400 text-gray-900" : ""
                }`}
                value={day.value}
                onClick={() => setDays(day.value)}
              >
                {day.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartComponent;
