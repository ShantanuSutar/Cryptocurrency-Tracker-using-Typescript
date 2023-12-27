import { useEffect, useState } from "react";
import { TrendingNews } from "../Config/api";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import PaginationComponent from "../Components/PaginationComponent";

type News = {
  id: string;
  published_on: number;
  imageurl: string;
  title?: string;
  url: string;
  body?: string;
  tags: string;
};

export type NewsArray = News[];

const temp: NewsArray = [
  {
    id: "21788332",
    published_on: 1703619106,
    imageurl: "https://resources.cryptocompare.com/news/73/21788332.jpeg",
    title: "Binance debuts new web3 AI gaming platform",
    url: "https://crypto.news/binance-debuts-new-web3-ai-gaming-platform/",
    body: "Binance has introduced Sleepless AI as the 42nd project on its Launchpool.",
    tags: "News|Binance|Gaming|Web3",
  },
  {
    id: "21788238",
    published_on: 1703619031,
    imageurl: "https://images.cryptocompare.com/news/default/ambcrypto.png",
    title:
      "SAND’s price rises 16% in 24 hours: Does its prediction have more gains?",
    url: "https://ambcrypto.com/sand-price-rises-16-in-24-hours-does-its-prediction-have-more-gains/",
    body: "SAND can continue its bull run with ease, as it will not face any key resistance levels soon.",
    tags: "Altcoin|News|News 1|Social|Trading View|SAND|The Sandbox",
  },
  {
    id: "21788240",
    published_on: 1703619014,
    imageurl: "https://images.cryptocompare.com/news/default/zycrypto.png",
    title:
      "BTC Price ‘Correction to $36,000 is Inevitable Before Bitcoin Goes Up’ – Says QPC Capital",
    url: "https://zycrypto.com/btc-price-correction-to-36000-is-inevitable-before-bitcoin-goes-up-says-qpc-capital/",
    body: "In a recent market analysis, Singapore-based investment fund QCP Capital has offered a unique perspective on the current state of the crypto market, predicting an inevitable correction for Bitcoin before a potential upward trajectory.",
    tags: "Bitcoin|News|Bitcoin News|BTCUSD|BTCUSDC|BTCUSDT|Cryptocurrency News|XBTUSD",
  },
  {
    id: "21788151",
    published_on: 1703618806,
    imageurl: "https://resources.cryptocompare.com/news/79/21788151.jpeg",
    title:
      "Expectations for Cardano (ADA) Amidst Bitcoin’s Stability and Market Fluctuations",
    url: "https://en.coin-turk.com/expectations-for-cardano-ada-amidst-bitcoins-stability-and-market-fluctuations/",
    body: "Bitcoin's calm trading gives altcoins a chance to rise. ADA Coin's price movements and analyst predictions are discussed. The post Expectations for Cardano (ADA) Amidst Bitcoin’s Stability and Market Fluctuations appeared first on COINTURK NEWS.",
    tags: "Cardano (ADA)",
  },
  {
    id: "21788162",
    published_on: 1703618770,
    imageurl: "https://resources.cryptocompare.com/news/43/21788162.jpeg",
    title: "Expert warns against sharing private information with Chatbots",
    url: "https://www.cryptopolitan.com/sharing-private-information-with-chatbots/",
    body: "In a stern warning to users of chatbot technology, Professor Michael Wooldridge, a distinguished computer scientist from Oxford University, has cautioned against divulging private information to artificial intelligence (AI) systems. The professor emphasized that sharing personal issues with AI, such as complaints about relationships or expressing political opinions, is “extremely unwise.” His warning comes when",
    tags: "AI in Daily Life|Chatbot",
  },
  {
    id: "21788061",
    published_on: 1703618536,
    imageurl: "https://resources.cryptocompare.com/news/43/21788061.jpeg",
    title: "Changpeng Zhao’s crypto wealth soars despite legal woes",
    url: "https://www.cryptopolitan.com/changpeng-zhaos-crypto-wealth-soars/",
    body: "Changpeng Zhao, the former CEO of Binance Holdings Ltd., has witnessed a remarkable surge in his estimated wealth, defying legal challenges. In a year marked by significant rebounds in the crypto market, Zhao’s fortune has expanded by almost $25 billion, according to the Bloomberg Billionaires Index. Legal troubles and financial triumph Despite pleading guilty to",
    tags: 'Industry News|brian armstrong|Changpeng "CZ" Zhao',
  },
  {
    id: "21788002",
    published_on: 1703618347,
    imageurl: "https://resources.cryptocompare.com/news/73/21788002.jpeg",
    title: "Today’s top cryptocurrency gainers: PancakeSwap, Sei, BNB",
    url: "https://crypto.news/todays-top-cryptocurrency-gainers-pancakeswap-sei-bnb/",
    body: "PancakeSwap, Sei, and Binance Coin have seen significant value surges in cryptocurrency, propelled by strategic decisions and innovative developments.",
    tags: "Markets|BNB|Market Sentiment|PancakeSwap|Price Analysis|Sei",
  },
  {
    id: "21787961",
    published_on: 1703618270,
    imageurl: "https://resources.cryptocompare.com/news/43/21787961.jpeg",
    url: "https://www.cryptopolitan.com/aleksa-gordic-launches-yugogpt/",
    tags: "Trending News|YugoGPT",
  },
  {
    id: "21787867",
    published_on: 1703618023,
    imageurl: "https://resources.cryptocompare.com/news/43/21787867.jpeg",
    title: "Shiba Inu team confirms manual Shibarium burns pre-upgrade",
    url: "https://www.cryptopolitan.com/shiba-inu-team-confirm-manual-shibarium-burn/",
    body: "The Shiba Inu (SHIB) development team has announced a significant change in their token burn strategy. According to Lucie, the project’s content marketing specialist, burning SHIB tokens, which has been manual until now, is set to become automated. This transition aims to enhance efficiency and transparency in the burn mechanism. Lucie’s announcement, made via a",
    tags: "Industry News|News|SHIB|Shiba Inu|Shibarium",
  },
  {
    id: "21787866",
    published_on: 1703618019,
    imageurl: "https://resources.cryptocompare.com/news/43/21787866.jpeg",
    title: "Tim Draper shares his optimistic outlook on Bitcoin",
    url: "https://www.cryptopolitan.com/tim-draper-optimistic-outlook-bitcoin/",
    body: "Venture capitalist Tim Draper has maintained his optimistic outlook on Bitcoin, doubling down on his prediction that the cryptocurrency’s price will reach $250,000. In a recent interview with Coin Bureau, Draper expressed confidence in his earlier forecast, emphasizing that he expects the $250,000 milestone to be achieved soon and believes the price could surpass that",
    tags: "Bitcoin News|News|Bitcoin Industry|cryptomarket",
  },
  {
    id: "21787833",
    published_on: 1703617926,
    imageurl: "https://resources.cryptocompare.com/news/81/21787833.jpeg",
    title:
      "This Country Became the Center of Attraction in the Cryptocurrency Industry in 2023!",
    url: "https://en.bitcoinsistemi.com/this-country-became-the-center-of-attraction-in-the-cryptocurrency-industry-in-2023/",
    body: "As the end of 2023 approaches, this country, which stands out in the field of crypto and Web3 innovation, has become the center of attraction of the sector. Continue Reading: This Country Became the Center of Attraction in the Cryptocurrency Industry in 2023!",
    tags: "News",
  },
  {
    id: "21787737",
    published_on: 1703617600,
    imageurl: "https://resources.cryptocompare.com/news/79/21787737.jpeg",
    title:
      "Artificial Intelligence Altcoins Gain Momentum: Fetch (FET) Coin in Focus",
    url: "https://en.coin-turk.com/artificial-intelligence-altcoins-gain-momentum-fetch-fet-coin-in-focus/",
    body: "AI altcoins like Fetch (FET) Coin attracted significant interest throughout the year. After ChatGPT's launch, FET Coin surged, pleasing investors with a substantial rise. The post Artificial Intelligence Altcoins Gain Momentum: Fetch (FET) Coin in Focus appeared first on COINTURK NEWS.",
    tags: "Technical Analysis",
  },
  {
    id: "21787697",
    published_on: 1703617524,
    imageurl: "https://images.cryptocompare.com/news/default/dailyhodl.png",
    title:
      "Top Trader Reveals 141% Price Target for Under-the-Radar Ethereum Altcoin on the Move",
    url: "https://dailyhodl.com/2023/12/26/top-trader-reveals-141-price-target-for-under-the-radar-ethereum-altcoin-on-the-move/",
    body: "A widely followed crypto strategist believes that one under-the-radar Ethereum (ETH) scaling solution is on track to more than double in price. Pseudonymous crypto strategist Pentoshi tells his 727,200 followers on the social media platform X that layer-2 rollup platform Metis (METIS) could be setting up to soar more than 141% from its current value. The post Top Trader Reveals 141% Price Target for Under-the-Radar Ethereum Altcoin on the Move appeared first on The Daily Hodl .",
    tags: "Altcoins|Bitcoin|BTC|ETH|Ethereum|METIS|News",
  },
  {
    id: "21787711",
    published_on: 1703617520,
    imageurl: "https://resources.cryptocompare.com/news/43/21787711.jpeg",
    title: "Spot Bitcoin ETF could dwarf all the crypto ETPs in the market",
    url: "https://www.cryptopolitan.com/spot-bitcoin-etf-could-dwarf-etps-market/",
    body: "The market for cryptocurrency exchange-traded products (ETPs) has reached approximately $50.3 billion in assets under management, encompassing around 150 products globally, as per data from BitMEX research. This has created a case for spot Bitcoin ETFs dwarfing ETPs. These ETPs include both spot and futures funds, typically tracking the performance of major cryptocurrencies like Bitcoin",
    tags: "Bitcoin News|News|Bitcoin Industry|cryptomarket",
  },
  {
    id: "21787602",
    published_on: 1703617259,
    imageurl: "https://resources.cryptocompare.com/news/21/21787602.jpeg",
    title:
      "A Crypto Christmas Special With Material Indicators: Past, Present, And Future",
    url: "https://www.newsbtc.com/news/a-crypto-christmas-special-with-material-indicators-past-present-and-future/",
    body: "Another year, another Crypto Christmas special for our team at NewsBTC. In the coming week, we’ll be unpacking 2023, its downs and ups, to reveal what the next months could bring for crypto and DeFi investors. Related Reading: A Crypto Christmas Special With Jlabs Digital: Past, Present, And Future Like last year, we paid homage to Charles Dicke’s classic “A Christmas Carol” and gathered a group of experts to discuss the crypto market’s past, present, and future. In that way, our readers might discover clues that will allow them to transverse 2024 and its potential trends. Crypto Christmas: A Deep Look Into The Bull Market And A Secret Pattern Once again, the crypto analytics firm Material Indicators joined us to discuss the current market structure. This year, we spoke with Keith Alan, one of the co-founders and analysts at the firm. Alan gave us his perspective on the bull market or what looks like the beginning of a bullish trend. Material Indicators is well known for their reliance on hard data, and for sharing views that often questioned the general beliefs in the crypto market. This time was no difference as Alan pointed to the evidence favoring both sides, bulls and bears. This is what he told us. Q: In light of the prolonged bearish trends observed in 2022 and 2023, how do these periods compare to previous downturns in severity and impact? With Bitcoin now crossing the $40,000 threshold, does this signify a conclusive end to the bear market, or are there potential market twists investors should brace for? MI: Nobody could argue that 2022 was anything but a bear market. After Bitcoin reached an ATH in November of 2021 we saw the bear market develop in classic fashion by losing support at key technical levels. While the bear was playing out in somewhat predictable fashion, the market was caught off guard by the events that led to the FTX crash in November 2022. Because the contagion from FTX had a devastating ripple effect that was felt by the largest institutions with crypto exposure as well as banks, I actually expected prices to fall even lower. At the time, fear and fighting among institutional players like Galaxy, Gemini and Grayscale (under DCG) who were among SBF’s largest institutional victims added to the concern that price would grind down towards the lower teens, yet somewhat remarkably and perhaps not so coincidentally on January 1, 2023 Bitcoin started to rally. What was first considered weekend whale games evolved long past the weekend, and in fact, through Q1/2023 I identified an entity on FireCharts which I nicknamed “Notorious B.I.D.” that was double stacking large blocks of bid liquidity to push price higher. There was a pattern to the behavior that made it somewhat predictable and tradable. Those moves were well documented in my X feed during that period of time. Once price reached $25k that entity disappeared. Even without the help of that manipulation pushing price up, and despite the fact that the macroeconomic situation was horrible, the geopolitical situation went from bad to worse and the US political situation evolved from a dysfunctional sh*t show to a full blown circus, the market continued to rally. Now, nearly 12 months and > 150% from the day the rally began, the debate between bulls and bears over whether this is a confirmed bull market or a sequence of bear market distribution rallies literally continues today. While it’s understandable that someone could look at 150% and immediately assume bull market, it does require a deeper understanding of what distribution and accumulation look like. From my view, that still isn’t as clear as one would expect. Historically, the Purple Class of Whales with orders in the $100k – $1M range have had the most influence over BTC price direction. The order flow data I’ve been monitoring on Binance shows that through most of the year they (along with larger MegaWhales) have been buying dips and distributing significantly more than they bought on those dips on the uptrends that followed. Only recently have we seen an uptick that could be an indication that the trend is shifting. Parallel to that, some on-chain data providers are showing an increase in the number of wallets holding BTC which is also an indication that we could be transitioning from a distribution phase to an accumulation phase and I’m looking for more clear evidence of that. One of the things I look for to get a sense of that is bid liquidity. I believe that “Liquidity = Sentiment,” and it’s no secret that order books have been thin on both sides of price through most of the year, however in the last 3 weeks or so, we’ve started seeing more institutional sized bid ladders coming into the order book and that fact supports a bullish thesis, as long as they don’t dump through the next pump. With all of the above in mind, there are most certainly turns and twists that investors should look out for. Sure we are starting to see some improvements on the U.S. inflation and unemployment numbers, but something in those reports doesn’t jive with reality. For most middle and lower income Americans, credit card debt is climbing to new highs, rents have soared, home ownership is unattainable, grocery prices are high and a Metallica “Standing Room Only” Field ticket is $575. So in my mind, we still have a percolating macroeconomic problem and the geopolitical and U.S. political issues seem to get worse by the day. Aside from that, the RSI has been over cooked for an extended period of time and we just had 8 consecutive green weekly candles. Both of those factors have historically led to corrections. I could give you the “History doesn’t have to repeat itself…” spiel or I can show you what historically happens after moves like this and let you decide. Another potential twist to consider is that the current PA has a striking resemblance to the first leg of the 2019 rally that turned out to be a Fib retracement, that ultimately got rejected from the top of the Golden Pocket at .618 Fib. That led to a 53% correction before the Covid Crash took it down more than 70% from the .618 Fib. At this stage, I’d be surprised to see a downside move that deep without the aid of a Black Swan, but we are currently having some interaction with the Golden Pocket that seems familiar. While it is reasonable to expect some resistance entering and exiting the Golden Pocket, there is one very weird twist to what we are seeing and that is a strange pattern I’ve noticed occurring on or around December 17th. Every year since 2017 there has been a move on December 17th that had Macro implications. The only exception to that is last year when it happened on December 20th. On each occasion the price action led to a macro breakout or breakdown. It’s too soon to tell if this move will validate the pattern on the day of writing (Dec 19th), but on the 17th we saw BTC get rejected from the lower end of the Golden Pocket and also lose the 21-Day moving average. Price has been flirting with both of those levels ever since so we’ll have to wait to see how it plays out over time. Aside from those things I’m watching the upcoming ETF window very closely. I think that the market is numb to SEC delays on these decisions, but there is so much anticipation that this time we’ll see an approval, that a flat out rejection has the potential to be the catalyst that triggers a correction. Regardless of where you side on whether we are or are not in a confirmed bull market, we’re seeing a lot of evidence that if we are not in it, we’re close to it. If you’re a long term investor and you haven’t already started building a position, it’s a good time to identify some targets to start scaling into one. This of course depends on your time horizon and risk appetite, but if you have a long term outlook and 6 figure targets for BTC it’s still early enough to get in, but it’s also a good idea to save some dry powder for a correction because in my opinion, it’s not a matter of if it will come, but when. Q: Right now, we are seeing Bitcoin reach new highs. Do you think we are in the early days of a full bull run? What has changed in the market that enabled the current price action; is it the Bitcoin spot ETF or the US Fed hinting at a loser policy or the upcoming Halving? What is the big narrative that will go on in 2024? MI: Despite the ongoing debate between bulls and bears over whether or not we’ve been in a bull market, I can say that despite the uptrend, there has been no clear confirmation that we’ve been in a bull market through most of the year. However, the fact that we’ve recently started to see more institutional sized bid ladders coming into the order book along with the on-chain data that indicates more wallets holding for longer and the recent buying after the R/S flip at $40k are indications that we may be on the verge of a breakout. There’s no doubt in my mind that a lot of the momentum we’ve been seeing is related to the next ETF decision window opening January 5-10 and the April 2024 Halving. The FED’s recent decision to pause rate hikes and hint at a pivot to cuts in 2024 certainly added fuel to that momentum that pushed price above $40k. In typical crypto form, we also had some help in late October through early December when I noticed some familiar patterns in the order book. I can’t confirm with absolute certainty if it was the Notorious B.I.D. spoofer we saw in Q1 returned, but it was the same game I identified through Q1 being executed and there is no question that it helped push price up through the $35k – $40k range before it disappeared. (…) As much as I’d like to see a correction come before we get there (the Bitcoin spot ETF decision), the market doesn’t care what I want. I would expect it to come before the Halving. Whether it comes before or after the ETF decision window closes remains to be seen. In the meantime, I’ll continue to watch order book and order flow data and trade what’s in front of me. Q: Last year, we spoke about the most resilient sectors during the Crypto Winter. Which sectors and coins will likely benefit from a new Bull Run? We are seeing the Solana ecosystem bloom along with the NFT market; what trends could benefit in the coming months? MI: The vast majority of my focus is on Bitcoin and to be honest, after seeing so many ponzi’s in the space, it’s the only digital asset I truly trust. There are certainly some great opportunities with certain alts, but with that comes increased risk. As for sectors, it’s no secret that AI and Gaming have been hot. According to some research I’ve been reviewing Memes, DePin and GambleFi are dominant narratives right now. The fact that Memes are more dominant than something that’s actually physical like DePin speaks to the immaturity of this market. Perhaps a better way of stating that is, “We are still early.” That said, if I’ve learned anything in crypto there is an opportunity cost associated with having high standards and principles for projects you invest in. As ridiculous as that may sound, the biggest upside potential seems to come from some of the most meaningless projects because they have large communities of “Crypto Bros” pumping them and thin liquidity makes them easy to pump. Just know that they also come with a huge risk and like every other ponzi, you don’t want to be the last guy holding the bag. I personally tend to avoid memes for all the reasons I mentioned above, but I do trade DOGE on occasion because it’s been a relatively easy scalp lately. Elon Musk playing kingmaker with that coin doesn’t make me like it any more or less (okay maybe less), but the results have been predictable. The fact he has obtained a money transfer license for X (Twitter) and that he has a DOGE logo on his X profile has me considering taking a flier on DOGE, but that’s not something I’m recommending to anyone who isn’t willing to lose that money. The fact he has SpaceX launching a DOGE sponsored satellite next month should at the very least bring a short term pump. Of the leading narratives mentioned, Memes may be the most dominant, but DePin is the most interesting to me, because it’s associated with something very real and very hot right now. For those who may not be familiar, DePin stands for Decentralized Physical Infrastructure Networks which are blockchain protocols that build, maintain and operate infrastructure for the AI industry. (Do Your Own Research). The fact that you mentioned Solana is proof that nothing changes sentiment like price. Solana has been through the ringer since falling from it’s ATH in November 2021 and the FTX crash of 2022 delivered another 80% correction that took it to single digit levels. There is no denying that it has been on an epic run recently. It’s somewhat puzzling to me how that is happening at the exact same time FTX liquidators have started the long process of distributing over $1B worth of $SOL back into the market. Related Reading: Shiba Inu Climbs 12% On Christmas Day – Brewing Bull Run Or False Dawn? Rather than speculate on what may be behind that, I’ll say that it is apparent that they have a very strong community and despite the network issues they’ve had in the past, they seem to be growing in popularity in staking pools. Then again, nothing influences sentiment like price, so I expect we’ll see a number of coins filter their way in and out of the leading narratives through the year. I’m just hoping more of them do so for legitimate reasons rather than fake news or P&D groups. IMO, until we see the projects with real teams, real use cases, real adoption and real revenue establishing themselves as the best projects to invest in for their fundamentals, “We’re still early.” Keith Alan is President at Keith Alan Productions, Inc., Co-Founder at Blacknox, LLC and Material Indicators, LLC. Nothing written should be taken as financial advice. For more insight and analysis follow @KAProductions and @MI_Algos. Find premium tools for traders at Material Indicators. Cover image from Unsplash, chart from Tradingview",
    tags: "Cryptocurrency Market News|bitcoin|btc|BTC price analysis|BTCUSDT|crypto|Crypto Christmas|ETH|ethereum|ETHUSDT",
  },
  {
    id: "21787631",
    published_on: 1703617163,
    imageurl: "https://resources.cryptocompare.com/news/44/21787631.jpeg",
    title: "Solana Cools Slightly as Bitcoin and Ethereum See Prices Slump",
    url: "https://decrypt.co/210911/solana-cools-slightly-as-bitcoin-and-ethereum-see-prices-slump",
    body: "Solana, which soared past the $100 mark over the weekend, has cooled slightly. SOL is trading for $109.20—down 11% in the past day.",
    tags: "Coins",
  },
  {
    id: "21787575",
    published_on: 1703616951,
    imageurl: "https://images.cryptocompare.com/news/default/zycrypto.png",
    title:
      "Ripple’s CLO Exposes SEC’s Failed Arm-Twisting Attempt In XRP Lawsuit",
    url: "https://zycrypto.com/ripples-clo-exposes-secs-failed-arm-twisting-attempt-in-xrp-lawsuit/",
    body: "In a startling revelation to the crypto community, Ripple's Chief Legal Officer, Stuart Alderoty, has revealed an alleged attempt to coerce Ripple executives into accepting an unfavourable resolution ahead of the XRP lawsuit by the U.S. Securities and Exchange Commission (SEC).",
    tags: "Cryptocurrency|News|Cryptocurrency News|Ripple|XRP News|XRPUSD|XRPUSDT",
  },
  {
    id: "21787479",
    published_on: 1703616892,
    imageurl: "https://resources.cryptocompare.com/news/36/21787479.jpeg",
    title:
      "PancakeSwap Price Prediction: What’s Next For $CAKE After 68% Weekly Surge?",
    url: "https://coingape.com/markets/pancakeswap-price-prediction-whats-next-for-cake-after-68-weekly-surge/",
    body: "PancakeSwap Price Prediction: Defying the current market consolidation, the Panckswap token price managed to sustain above the $2.1 level and prolong its recovery trend. Within a week, the coin price surged 57% to reach the current trading price of $3.37 and provided a decisive breakout from a falling wedge pattern. Here’s how this pattern could The post PancakeSwap Price Prediction: What’s Next For $CAKE After 68% Weekly Surge? appeared first on CoinGape .",
    tags: "Price Analysis|CAKE|PancakeSwap price analysis",
  },
  {
    id: "21787291",
    published_on: 1703616407,
    imageurl: "https://resources.cryptocompare.com/news/79/21787291.jpeg",
    title: "Solana’s Impressive Rally and Ecosystem Growth",
    url: "https://en.coin-turk.com/solanas-impressive-rally-and-ecosystem-growth/",
    body: "Solana's (SOL) price surged 7.37% in the last 24 hours. Year-to-date returns for SOL increased thirteenfold. The post Solana’s Impressive Rally and Ecosystem Growth appeared first on COINTURK NEWS.",
    tags: "Solana (SOL)",
  },
  {
    id: "21787283",
    published_on: 1703616406,
    imageurl: "https://resources.cryptocompare.com/news/85/default.png",
    title: "Changpeng Zhao Tops List of Crypto Billionaires Despite Legal Woes",
    url: "https://btc-pulse.com/changpeng-zhao-tops-list-of-crypto-billionaires-despite-legal-woes/",
    body: "Binance CEO, Changpeng Zhao, despite facing legal challenges, now leads cryptocurrency billionaires with a fortune of over 37 billion dollars.",
    tags: "Blockchain|Binance|Cryptocurrency|CZ",
  },
  {
    id: "21787064",
    published_on: 1703615809,
    imageurl: "https://resources.cryptocompare.com/news/34/21787064.jpeg",
    title: "Japan considers tax relief for domestic firms holding crypto",
    url: "https://cryptobriefing.com/japan-considers-tax-relief-domestic-firms-holding-crypto/?utm_source=feed&#038;utm_medium=rss",
    body: "If approved, these reforms to Japan's Corporate Tax Law are slated to take effect in the 2024 fiscal year.",
    tags: "Regulation",
  },
  {
    id: "21786960",
    published_on: 1703615587,
    imageurl: "https://resources.cryptocompare.com/news/81/21786960.jpeg",
    title:
      "Bitcoin's Share in Futures Has Declined! Which Area Did Investors Focus On?",
    url: "https://en.bitcoinsistemi.com/bitcoins-share-in-futures-has-declined-which-area-did-investors-focus-on/",
    body: "The share of the largest cryptocurrency Bitcoin (BTC) in futures transactions has decreased rapidly recently, falling from . Continue Reading: Bitcoin's Share in Futures Has Declined! Which Area Did Investors Focus On?",
    tags: "Altcoin|Bitcoin|News",
  },
  {
    id: "21786919",
    published_on: 1703615440,
    imageurl: "https://images.cryptocompare.com/news/default/ambcrypto.png",
    title: "MakerDAO closes the year with this milestone",
    url: "https://ambcrypto.com/makerdao-closes-the-year-with-this-milestone/",
    body: "MakerDAO is the most successful DeFi protocol in 2023 in terms of revenue.",
    tags: "Altcoin|Analysis|DeFi|Ethereum|News|News 1|Social|Trading View|DAI|ETH|LDO|LIDO|MakerDAO|MKR",
  },
  {
    id: "21786832",
    published_on: 1703615197,
    imageurl: "https://resources.cryptocompare.com/news/79/21786832.jpeg",
    title: "XRP Price Analysis and Future Predictions",
    url: "https://en.coin-turk.com/xrp-price-analysis-and-future-predictions/",
    body: "XRP price surged after a July court decision, then retracted. Technical analysis shows XRP following an ascending support trend. The post XRP Price Analysis and Future Predictions appeared first on COINTURK NEWS.",
    tags: "Ripple (XRP)",
  },
  {
    id: "21787368",
    published_on: 1703615113,
    imageurl: "https://images.cryptocompare.com/news/default/tipranks.png",
    title: "MicroStrategy’s (NASDAQ:MSTR) Bitcoin Bet Pays Off Big",
    url: "https://www.tipranks.com/news/microstrategys-nasdaqmstr-bitcoin-bet-pays-off-big?utm_source=cryptocompare.com&utm_medium=referral",
    body: "MicroStrategy (NASDAQ:MSTR) isn’t much by itself. A cloud computing stock that few have actually heard of, it wouldn’t be nearly the forc...",
    tags: "Market News|BITCOIN|MSTR",
  },
  {
    id: "21786736",
    published_on: 1703614986,
    imageurl: "https://resources.cryptocompare.com/news/75/21786736.jpeg",
    title:
      "While Bitcoin Stumbles, Get Ready for Polygon (MATIC), Avalanche (AVAX) and Aave (AAVE) as 2024's Top Altcoins",
    url: "https://cryptodaily.co.uk/2023/12/while-bitcoin-stumbles-get-ready-for-polygon-matic-avalanche-avax-and-aave-aave-as-2024s-top-altcoins",
    body: "Embark on the dramatic shift in the crypto landscape as 2023 ends. Find out how Bitcoin's dominance is fading and making way for rising stars like Polygon (MATIC), Avalanche (AVAX), and Aave (AAVE). Dive into our article to see how these altcoins are redefining the market with groundbreaking technology and what this means for the future of cryptocurrency. Don't miss out on the thrilling evolution of the crypto world!",
    tags: "Breaking News",
  },
  {
    id: "21786731",
    published_on: 1703614901,
    imageurl: "https://resources.cryptocompare.com/news/52/21786731.jpeg",
    title:
      "As KEX Shoots Up 167% to a New ATH, This Other Coin Just Hit $6 Million",
    url: "https://cryptonews.com/news/as-kex-shoots-up-167-to-a-new-ath-this-other-coin-just-hit-6-million.htm",
    body: "KIRA, an emerging force in the decentralized finance (DeFi) sector, has seen its native coin, KEX, soar to unprecedented heights, achieving a remarkable 45.67% surge in just 24 hours. From an initial value of $0.02634, KEX has risen to an impressive $0.1370, setting a new all-time high (ATH) and propelling KIRA to the #1702 position The post As KEX Shoots Up 167% to a New ATH, This Other Coin Just Hit $6 Million appeared first on Cryptonews .",
    tags: "Price Predictions",
  },
  {
    id: "21786713",
    published_on: 1703614881,
    imageurl: "https://resources.cryptocompare.com/news/73/21786713.jpeg",
    title: "FTX saga: what happened to FTX and Sam Bankman-Fried in 2023",
    url: "https://crypto.news/ftx-saga-what-happened-to-ftx/",
    body: "Explore the comprehensive breakdown of what happened to FTX in 2023: from Sam Bankman-Fried going to jail to his ex-girlfriend’s confessions. The crypto industry has always been filled with captivating stories of massive success, overnight failures, notorious scams, and overwhelming…",
    tags: "Features|Alameda Research|Court|FTX|Sam Bankman-Fried",
  },
  {
    id: "21786360",
    published_on: 1703613883,
    imageurl: "https://resources.cryptocompare.com/news/75/21786360.jpeg",
    title:
      "Why Are Inscriptions Breaking Blockchains Like Avalanche (AVAX) and Ethereum (ETH)? Everlodge (ELDG) Becomes Top Altcoin",
    url: "https://cryptodaily.co.uk/2023/12/why-are-inscriptions-breaking-blockchains-like-avalanche-avax-and-ethereum-eth-everlodge-eldg-becomes-top-altcoin",
    body: "The blockchain ecosystem has been experiencing some turbulence as leading platforms like Avalanche (AVAX) and Ethereum (ETH)",
    tags: "More News",
  },
  {
    id: "21786271",
    published_on: 1703613627,
    imageurl: "https://resources.cryptocompare.com/news/79/21786271.jpeg",
    title: "How to Buy Graph Coin?",
    url: "https://en.coin-turk.com/how-to-buy-graph-coin/",
    body: "The Graph (GRT) is an indexing protocol for networks like Ethereum and IPFS. Assisting numerous applications in the DeFi sector and the Web3 ecosystem, The Graph has achieved an incredible rise in a short period, proving to fill an important gap in the ecosystem. The post How to Buy Graph Coin? appeared first on COINTURK NEWS.",
    tags: "Altcoin News",
  },
  {
    id: "21786325",
    published_on: 1703613600,
    imageurl: "https://resources.cryptocompare.com/news/64/21786325.jpeg",
    title: "NEAR Price Analysis for December 26",
    url: "https://u.today/near-price-analysis-for-december-26",
    body: "Does NEAR have enough power to keep rising?",
    tags: "NEARUSD",
  },
  {
    id: "21786175",
    published_on: 1703613381,
    imageurl: "https://resources.cryptocompare.com/news/75/21786175.jpeg",
    title:
      "Michaël Van De Poppe Chainlink Price Prediction, Toncoin Experiences Price Correction, Meme Moguls Combines P2E with Memes",
    url: "https://cryptodaily.co.uk/2023/12/michael-van-de-poppe-chainlink-price-prediction-toncoin-experiences-price-correction-meme-moguls-combines-p2e-with-memes",
    body: "Toncoin (TON) recently experienced a price correction, which left many worried about its future, but a break above the $2 price barrier indicates that it can still move forward with its value.",
    tags: "More News",
  },
  {
    id: "21786170",
    published_on: 1703613343,
    imageurl: "https://images.cryptocompare.com/news/default/dailyhodl.png",
    title:
      "U.S. SEC Asks Firms Applying for Spot Bitcoin ETFs To Complete Last-Minute Corrections Before New Year: Report",
    url: "https://dailyhodl.com/2023/12/26/u-s-sec-asks-firms-applying-for-spot-bitcoin-etfs-to-complete-last-minute-corrections-before-new-year-report/",
    body: "The U.S. Securities and Exchange Commission (SEC) is reportedly asking firms that have bid to create Bitcoin (BTC) exchange-traded funds (ETFs) to complete last-minute corrections before the start of 2024. According to a new report by Reuters, anonymous sources familiar with the matter say the regulatory agency met with representatives of companies that applied to The post U.S. SEC Asks Firms Applying for Spot Bitcoin ETFs To Complete Last-Minute Corrections Before New Year: Report appeared first on The Daily Hodl .",
    tags: "Regulators|Trading|Bitcoin|blackrock|BTC|BTC ETF|cboe|Crypto|ETF|grayscale|nasdaq|News|regulators|Reuters|SEC",
  },
  {
    id: "21785996",
    published_on: 1703612872,
    imageurl: "https://resources.cryptocompare.com/news/79/21785996.jpeg",
    title: "Significant Events in the Cryptocurrency World in 2023",
    url: "https://en.coin-turk.com/significant-events-in-the-cryptocurrency-world-in-2023/",
    body: "Cryptocurrency market experienced a quiet final week of the year. Notable events included regulatory decisions and potential bank failures. The post Significant Events in the Cryptocurrency World in 2023 appeared first on COINTURK NEWS.",
    tags: "Cryptocurrency News",
  },
  {
    id: "21785995",
    published_on: 1703612828,
    imageurl: "https://resources.cryptocompare.com/news/79/21785995.jpeg",
    title: "Popular Altcoin Surges After Announcement, Similar to Amazon Hype",
    url: "https://en.coin-turk.com/popular-altcoin-surges-after-announcement-similar-to-amazon-hype/",
    body: "Popular altcoin's price surges after a risky announcement. LEVER Coin's rise linked to a new BRC-20 launchpad initiative. The post Popular Altcoin Surges After Announcement, Similar to Amazon Hype appeared first on COINTURK NEWS.",
    tags: "Altcoin News",
  },
  {
    id: "21785964",
    published_on: 1703612795,
    imageurl: "https://resources.cryptocompare.com/news/79/21785964.jpeg",
    title: "Will Bitcoin Climb in January?",
    url: "https://en.coin-turk.com/will-bitcoin-climb-in-january/",
    body: "Leading cryptocurrency enjoys calm week amidst altcoin gains. Bitcoin price maintains critical threshold, resistance at $44,179. The post Will Bitcoin Climb in January? appeared first on COINTURK NEWS.",
    tags: "Bitcoin (BTC)",
  },
  {
    id: "21785930",
    published_on: 1703612700,
    imageurl: "https://images.cryptocompare.com/news/default/coinpedia.png",
    title:
      "Top 10 Altcoins to Invest in 2024 : Here’s Our Picks Ready For Moonshot",
    url: "https://coinpedia.org/top-10/top-10-altcoins-to-invest-in-2024-heres-our-picks-ready-for-moonshot/",
    body: "The post Top 10 Altcoins to Invest in 2024 : Here’s Our Picks Ready For Moonshot appeared first on Coinpedia Fintech News As the year 2024 dawns, the cryptocurrency market is witnessing a remarkable resurgence. After weathering uncertainty and volatility, the crypto landscape rebounded strongly in late 2023, ushering in what many call an “Altcoin Season.” This resurgence is not just a mere recovery but a powerful affirmation of cryptocurrencies’ enduring appeal and potential. In this context, …",
    tags: "Top 10s in Crypto Market|Altcoins",
  },
  {
    id: "21785874",
    published_on: 1703612525,
    imageurl: "https://resources.cryptocompare.com/news/81/21785874.jpeg",
    title:
      "Binance-Listed Altcoin Introduces New BRC20 Launchpad Program: Price Suddenly Jumps 30 Percent",
    url: "https://en.bitcoinsistemi.com/binance-listed-altcoin-introduces-new-brc20-launchpad-program-price-suddenly-jumps-30-percent/",
    body: "The altcoin, which surprised with a last-minute announcement made during the holiday period, experienced a sudden increase in its price as a result of the announcement. Continue Reading: Binance-Listed Altcoin Introduces New BRC20 Launchpad Program: Price Suddenly Jumps 30 Percent",
    tags: "Altcoin|News",
  },
  {
    id: "21785842",
    published_on: 1703612406,
    imageurl: "https://resources.cryptocompare.com/news/81/21785842.jpeg",
    title:
      "A First Happened in BNB Six Months After the Binance Announcement! Big Bear il Capo Commented!",
    url: "https://en.bitcoinsistemi.com/a-first-happened-in-bnb-six-months-after-the-binance-announcement-big-bear-il-capo-commented/",
    body: "Binance Coin (BNB), which generally rose after Binance's Launchpool announcements, exceeded $ 300 for the first time since June. Continue Reading: A First Happened in BNB Six Months After the Binance Announcement! Big Bear il Capo Commented!",
    tags: "Altcoin|Analysis|Binance Coin|News",
  },
  {
    id: "21785808",
    published_on: 1703612346,
    imageurl: "https://images.cryptocompare.com/news/default/coinpedia.png",
    title:
      "Altcoins May Soon Fall Into the ‘Sell the News’ Trap: Did the Bears Diffuse the Santa Rally?",
    url: "https://coinpedia.org/price-analysis/altcoins-may-soon-fall-into-the-sell-the-news-trap-did-the-bears-diffuse-the-santa-rally/",
    body: "The post Altcoins May Soon Fall Into the ‘Sell the News’ Trap: Did the Bears Diffuse the Santa Rally? appeared first on Coinpedia Fintech News The altcoins have gained extreme strength since the middle of October, which has lifted the markets close to the crucial resistance levels. With a nice push beyond the levels, the altcoins are expected to trigger a fresh upswing, which may even trigger a strong AltSeason. The markets appear to be allowing reloading and accumulating, as …",
    tags: "Price Analysis|Altcoins",
  },
  {
    id: "21785774",
    published_on: 1703612189,
    imageurl: "https://resources.cryptocompare.com/news/75/21785774.jpeg",
    title: "7 Hottest Trending Altcoins to Buy This Week",
    url: "https://cryptodaily.co.uk/2023/12/7-hottest-trending-altcoins-to-buy-this-week",
    tags: "More News",
  },
  {
    id: "21785745",
    published_on: 1703612106,
    imageurl: "https://images.cryptocompare.com/news/default/coinpedia.png",
    title:
      "Bitcoin Flashes Red As It Heads Toward Key Support! Here’s The Next Level For BTC Price",
    url: "https://coinpedia.org/price-analysis/bitcoin-flashes-red-as-it-heads-toward-key-support-heres-the-next-level-for-btc-price/",
    body: "The post Bitcoin Flashes Red As It Heads Toward Key Support! Here’s The Next Level For BTC Price appeared first on Coinpedia Fintech News The upward momentum of Bitcoin’s price has paused after a steady increase over recent months. As it approaches key resistance levels, notably around the $45K mark, there’s a noticeable decline in buyer confidence, challenging BTC’s ability to break through these levels. This has prompted sellers to capitalize on short-selling opportunities. Amidst this, both investors and …",
    tags: "Price Analysis|Bitcoin|Cryptocurrency",
  },
  {
    id: "21785674",
    published_on: 1703611944,
    imageurl: "https://resources.cryptocompare.com/news/27/21785674.jpeg",
    title: "Here’s Why Telcoin (TEL) Crashed 40% on Christmas Day",
    url: "https://cryptopotato.com/heres-why-telcoin-tel-crashed-40-on-christmas-day/",
    body: "On-chain data shows the stolen assets include 37 Ether (ETH) and over 1.3 million Polygon (MATIC) worth $85,000 and $1.19 million, respectively.",
    tags: "AA News|Crypto News|Hacking",
  },
  {
    id: "21785642",
    published_on: 1703611845,
    imageurl: "https://resources.cryptocompare.com/news/82/default.png",
    title:
      "Fwd: Proposal for Collaboration with BitcoinWorld – Boost Your Crypto Project’s Visibility",
    url: "https://bitcoinworld.co.in/fwd-proposal-for-collaboration-with-bitcoinworld-boost-your-crypto-projects-visibility/",
    body: "Dear Team,I hope this message finds you well. I am writing on behalf of BitcoinWorld, a rapidly growing crypto news and media platform established in 2020. We are keen to The post Fwd: Proposal for Collaboration with BitcoinWorld – Boost Your Crypto Project’s Visibility appeared first on BitcoinWorld .",
    tags: "Press Release",
  },
  {
    id: "21785641",
    published_on: 1703611824,
    imageurl: "https://resources.cryptocompare.com/news/21/21785641.jpeg",
    title:
      "Bitcoin Millionaires Rise By 246% In 2023, Here’s How Many There Are",
    url: "https://www.newsbtc.com/news/bitcoin/bitcoin-millionaires-246-2023/",
    body: "Bitcoin’s resurgence in 2023 has created wealth for many crypto investors, as there has been a significant rise in the number of Bitcoin millionaires. These Bitcoin millionaires happen to be wallet addresses whose BTC holdings equal $1 million or above. Number Of Bitcoin Millionaires According to data from BitInfoCharts, there are currently 97,497 Bitcoin millionaires. This represents a significant increase from the beginning of the year when the number of wallet addresses equal to $1 million and above stood at 23,795, according to data from Glassnode. Related Reading: Why Did The XRP Price Surge To $0.64 Today? This development is attributed to the resurgence in Bitcoin’s price this year, with the crypto token seeing over 158% gain year-to-date. At the beginning of the year, Bitcoin’s price stood at just over $16,000. However, as the flagship cryptocurrency’s price began to rise, so did its number of millionaires. Further data from BitInfoCharts breaks down these Bitcoin millionaires into two categories. The number of addresses that are greater than $1 million stands at 90,040, while 7,457 wallet addresses hold $10 million or more. Meanwhile, other addresses below $1 million have also seen enormous profits. Market intelligence platform Santiment recently reported that 89% of the total Bitcoin supply is in profits. 2024 could be a better year for these addresses, considering that the Bull market is expected to kickstart next year. In the meantime, some of these Bitcoin millionaires and persons with significant holdings seem to be taking profits. NewsBTC recently reported how Bitcoin whales had sold around 50,000 BTC which equals to about $2.2 billion. BTC price retraces to $42,600 | Source: BTCUSD on Tradingview.com About Two Weeks To Go For Spot ETFs One of the biggest moments for Bitcoin and the crypto industry could come as early as January 10. This is around the period when experts are predicting that the Securities and Exchange Commission (SEC) will approve the pending Spot Bitcoin ETFs, and there is optimism in the air as many actions point to an approval happening. Related Reading: Crypto Analyst Predicts XRP Price Will Hit $1.33 ‘Pretty Fast’ Crypto stakeholders have had their eyes fixed on developments revolving around these Spot Bitcoin ETFs. The reason isn’t farfetched, as these funds could unlock fresh liquidity into the Bitcoin ecosystem. Trading firm QCP Capital had highlighted this as the catalyst to Bitcoin hitting its all-time high (ATH) and possibly new ATHs. At the same time, people like the former CEO of crypto exchange BitMEX, Arthur Hayes, will be hoping that these ETFs don’t achieve much success as he says they could lead to Bitcoin’s downfall. At the time of writing, Bitcoin is trading at around $42,678.76, down over 1% in the last 24 hours according to data from CoinMarketCap. Featured image from Crypto News, chart from Tradingview.com",
    tags: "Bitcoin|bitcoin|Bitcoin millionaires|Bitcoin news|bitcoin price|btc|BTC millionaires|BTC news|btcusd|BTCUSDT",
  },
  {
    id: "21785647",
    published_on: 1703611819,
    imageurl: "https://resources.cryptocompare.com/news/14/21785647.jpeg",
    title:
      "ORDI’s Record Rally — Leading the Charge in Bitcoin’s BRC20 Token Boom",
    url: "https://news.bitcoin.com/ordis-record-rally-leading-the-charge-in-bitcoins-brc20-token-boom/",
    body: "On Dec. 26, 2023, the Bitcoin-based BRC20 token, ORDI, soared to a record $81.34 per coin before declining over 14% from its peak. BRC20s have emerged as significant players in the crypto asset arena, with several tokens mirroring ORDI’s trajectory. Bitcoin’s BRC20 Token ORDI Peaks and Dips as a New Era of Crypto Assets Is",
    tags: "Market Updates|Bitcoin|BRC20|BRC20s|Crypto|Cryptocurrency|Doge|DSPW|ordi|sats",
  },
  {
    id: "21785610",
    published_on: 1703611808,
    imageurl: "https://images.cryptocompare.com/news/default/ambcrypto.png",
    title: "Is Uniswap on the verge of a breakout?",
    url: "https://ambcrypto.com/is-uniswap-on-the-verge-of-a-breakout/",
    body: "Uniswap's daily volume outpaces that of NYSE and NASDAQ combined, signaling its dominance.",
    tags: "Altcoin|News|News 1|Social|Trading View|UNI|uniswap",
  },
  {
    id: "21785345",
    published_on: 1703611001,
    imageurl: "https://resources.cryptocompare.com/news/79/21785345.jpeg",
    title:
      "Tether Issues 1 Billion USDT: Inventory Replenishment or Market Manipulation?",
    url: "https://en.coin-turk.com/tether-issues-1-billion-usdt-inventory-replenishment-or-market-manipulation/",
    body: "Tether prints 1 billion USDT, considered inventory replenishment by CEO. Whale Alert's report on Tether's action raises questions in the community. The post Tether Issues 1 Billion USDT: Inventory Replenishment or Market Manipulation? appeared first on COINTURK NEWS.",
    tags: "Tether (USDT)",
  },
  {
    id: "21785250",
    published_on: 1703610703,
    imageurl: "https://resources.cryptocompare.com/news/75/21785250.jpeg",
    title: "10 Cryptos Under $1 That Will Explode in 2024 – A Must-Buy Now",
    url: "https://cryptodaily.co.uk/2023/12/10-cryptos-under-1-that-will-explode-in-2024-a-must-buy-now",
    body: "Explore our expert-picked list of 10 promising cryptocurrencies under $1 set to skyrocket in 2024. Get insights on the most underrated crypto gems and make informed investment decisions today!",
    tags: "Breaking News",
  },
  {
    id: "21785157",
    published_on: 1703610436,
    imageurl: "https://resources.cryptocompare.com/news/75/21785157.jpeg",
    title: "Retik Finance (RETIK) to Pump Like Solana (SOL) in 2024",
    url: "https://cryptodaily.co.uk/2023/12/retik-finance-retik-to-pump-like-solana-sol-in-2024",
    body: "Retik Finance (RETIK) a decentralized finance (DeFi) based project that emerges as a beacon of potential, poised to embark on a trajectory reminiscent of Solana's (SOL) meteoric rise.",
    tags: "More News",
  },
];

const News = () => {
  const [news, setNews] = useState<NewsArray>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchLatestNews = async () => {
    setError(false);
    setLoading(true);
    try {
      const { data } = await axios.get(TrendingNews());
      setNews(data?.Data);
      // console.log(news);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestNews();
    const total = parseInt((news.length / 10).toFixed(0));
    if (total > 0) setPage(1);
  }, []);
  const pageNumArr: number[] = [];

  for (let i: number = 1; i <= totalPages; i++) {
    pageNumArr.push(i);
  }
  // Pagination

  if (loading)
    return (
      <div className=" mt-10  flex items-center justify-center">
        <h1 className=" text-4xl">Loading . . .</h1>
      </div>
    );

  if (error)
    return (
      <div className=" mt-10  flex items-center justify-center">
        <h1 className=" text-xl">
          Sorry ! There was an error fetching the data. Try reloading the site
          or come back later :)
        </h1>
      </div>
    );

  return (
    <>
      <div className=" mx-auto  flex flex-col  items-center  justify-center gap-6  py-10 lg:max-w-[70%]">
        {news.slice((page - 1) * 10, (page - 1) * 10 + 10).map((item) => {
          return (
            <div
              key={item.id}
              className=" flex w-full gap-6 p-4  shadow shadow-gray-700 hover:shadow-md hover:shadow-gray-700"
            >
              <Tilt>
                <img
                  className=" min-h-52 min-w-52 rounded-md  shadow shadow-gray-600 transition-all  duration-500 ease-in-out hover:scale-110"
                  src={item?.imageurl}
                  alt={item.title}
                  height={200}
                  width={200}
                />
              </Tilt>
              <div className=" flex flex-col gap-3">
                <header className=" text-xl text-yellow-400 ">
                  {item.title}
                </header>
                <p className=" word-spacing text-sm text-gray-400">
                  {item.body?.slice(0, 350)}{" "}
                  {item?.body ? (item.body.length > 350 ? " . . ." : "") : ""}
                </p>
                <div className=" my-auto mb-0 flex flex-col gap-2">
                  <span className=" text-gray-400">
                    <span className=" text-white">Related to :</span>{" "}
                    {item.tags}
                  </span>
                  <NavLink
                    to={item.url}
                    className=" cursor-pointer text-sm hover:text-yellow-400"
                  >
                    Read Full Article
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
        {/* Pagination */}
        <div className="">
          <PaginationComponent
            page={page}
            setPage={setPage}
            pageNumArr={pageNumArr}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default News;
