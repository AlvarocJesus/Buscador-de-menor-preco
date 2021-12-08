const puppeteer = require("puppeteer");
// const readlineSync = require("readline-sync");
const fs = require("fs");

const processador = [
  "https://www.kabum.com.br/produto/102438/processador-amd-ryzen-5-3600-cache-32mb-3-6ghz-4-2ghz-max-turbo-am4-sem-video-100-100000031box",
  "https://www.terabyteshop.com.br/produto/11313/processador-amd-ryzen-5-3600-36ghz-42ghz-turbo-6-core-12-thread-cooler-wraith-stealth-am4",
  "https://www.pichau.com.br/processador-amd-ryzen-5-3600-6-core-12-threads-3-6ghz-4-2ghz-turbo-cache-35mb-am4-100-100000031box",
  "https://www.amazon.com.br/Processador-AMD-Ryzen-3600-100-100000031BOX/dp/B07STGGQ18",
];
const placaMae = [
  "https://www.kabum.com.br/produto/98880/placa-mae-asus-tuf-b450m-plus-gaming-amd-am4-matx-ddr4",
  "https://www.terabyteshop.com.br/produto/10223/placa-mae-asus-tuf-gaming-b450m-plus-ii-chipset-b450-amd-am4-matx-ddr4-90mb1620-m0eay0",
  "https://www.amazon.com.br/Placa-M%C3%A3e-Asus-B450M-PLUS-90MB0YQ0-M0EAY0-DDR4-mATX/dp/B07F6XBJVG",
  "https://www.pichau.com.br/placa-mae-asus-tuf-b450m-plus-gaming-ddr4-socket-am4-chipset-amd-b450",
];
const hd = [
  "https://www.kabum.com.br/produto/84108/hd-seagate-barracuda-1tb-3-5-sata-st1000dm010",
  "https://www.terabyteshop.com.br/produto/7251/hd-seagate-barracuda-st1000dm010-1tb-7200rpm-64mb-sata-iii",
  "https://www.amazon.com.br/Interno-Seagate-Desktop-BarraCuda-interno/dp/B0767D1BZY",
  "https://www.pichau.com.br/hd-seagate-barracuda-1tb-3-5-sata-iii-6gb-s-st1000dm010",
];
const ssdM2 = [
  "https://www.amazon.com.br/Black-WD-WDS500G3X0C-00SJG0-Armazenamento-Interno/dp/B07MH2P5ZD",
  "https://www.kabum.com.br/produto/100269/ssd-wd-black-sn750-500gb-m-2-nvme-leitura-3430mb-s-gravacao-2600mb-s-wds500g3x0c",
];
const ssd = [
  "https://www.kabum.com.br/produto/95217/ssd-kingston-a400-960gb-sata-leitura-500mb-s-gravacao-450mb-s-sa400s37-960g",
  "https://www.amazon.com.br/DESKTOP-NOTEBOOK-KINGSTON-SA400S37-960G/dp/B079XC5PVV",
  "https://www.pichau.com.br/ssd-kingston-a400-960gb-sata-3-2-5-sa400s37-960g?gclid=Cj0KCQiA47GNBhDrARIsAKfZ2rDYgys69vDhrDEaq_Ju0Sk91wK0v-n0ZgnHekYetoTtzJM5FxB5Lo8aAms1EALw_wcB",
  "https://www.amazon.com.br/dp/B079XC5PVV",
];
const placaVideo = [
  "https://www.kabum.com.br/produto/129973/placa-de-video-asus-nvidia-geforce-gtx-1650-4gb-gddr6-tuf-gtx1650-o4gd6-p-gaming",
  "https://www.terabyteshop.com.br/produto/15892/placa-de-video-asus-tuf-gaming-geforce-gtx-1650-oc-dual-4gb-gddr6-128bit-tuf-gtx1650-o4gd6-p-gaming",
  "https://www.pichau.com.br/placa-de-video-asus-geforce-gtx-1650-oc-4gb-gddr6-tuf-gaming-128-bit-tuf-gtx1650-o4gd6-p-gaming",
  "https://www.amazon.com.br/Placa-video-geforce-gaming-tuf-gtx1650-o4gd6-gami/dp/B087XP6FSG",
  "https://www.amazon.com.br/PLACA-VIDEO-ASUS-GEFORCE-GAMING/dp/B08F2KZM8X",
];
const fonte = [
  "https://www.amazon.com.br/Fonte-650W-Cv650-Plus-Bronze/dp/B0842T71MK",
  "https://www.amazon.com.br/Fonte-Corsair-CV550-Bronze-CP-9020210-BR/dp/B0842T1TQ8",
  "https://www.pichau.com.br/fonte-corsair-cv-series-cv550-80-plus-bronze-550w-cp-9020210-br",
  "https://www.kabum.com.br/produto/108257/fonte-corsair-cv550-550w-80-plus-bronze-cp-9020210-br",
];
const gabinete = ["", "", ""];

async function buscarProcessador() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto(processador[2]);

  for (let item of processador) {
    await page.goto(item);

    const imgList = await page
      .evaluate((item) => {
        return {
          site: item,
          price:
            document.querySelector("article section div h4").innerText || // kabum
            document.querySelector("p span#valParc.valParc").innerText || // terabyte
            document.querySelector("div div div div div div div div.jss64")
              .innerText || // pichau
            document.querySelector("span.a-offscreen").innerText, // amazon
        };
      })
      .then((result) => console.log({ result }))
      .catch((err) => console.log({ err }));
    console.log({ imgList });
  }

  // escrever os dados em um arquivo local(json)
  /* fs.writeFile("processador.json", JSON.stringify(List, null, 2), (err) => {
    if (err) throw new Error(err);

    console.log("well done!");
  }); */

  await browser.close();
}

buscarProcessador();

/* 
    async function buscaProcessador() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(processador[0]);

    const imgList = await page.evaluate(() => {
      return document.querySelector("article section div h4").innerText;
      // console.log({ nodeList });
      // return nodeList;
    });
    console.log({ imgList });

    await browser.close();
    }

    buscaProcessador();
  */
