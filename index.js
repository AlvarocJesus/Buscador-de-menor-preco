const puppeteer = require("puppeteer");
const fs = require("fs");

const processador = [
  {
    title:
      "https://www.kabum.com.br/produto/102438/processador-amd-ryzen-5-3600-cache-32mb-3-6ghz-4-2ghz-max-turbo-am4-sem-video-100-100000031box",
    selector: "article section div h4",
  },
  {
    title:
      "https://www.terabyteshop.com.br/produto/11313/processador-amd-ryzen-5-3600-36ghz-42ghz-turbo-6-core-12-thread-cooler-wraith-stealth-am4",
    selector: "div div div div div div p span",
  },
  {
    title:
      "https://www.pichau.com.br/processador-amd-ryzen-5-3600-6-core-12-threads-3-6ghz-4-2ghz-turbo-cache-35mb-am4-100-100000031box",
    selector: "div main div div div div div div div div div.jss69",
  },
  {
    title:
      "https://www.amazon.com.br/Processador-AMD-Ryzen-3600-100-100000031BOX/dp/B07STGGQ18",
    selector: "span.a-offscreen",
  },
];

const placaMae = [
  {
    title:
      "https://www.kabum.com.br/produto/98880/placa-mae-asus-tuf-b450m-plus-gaming-amd-am4-matx-ddr4",
    selector: "article section div h4",
  },
  {
    title:
      "https://www.terabyteshop.com.br/produto/10223/placa-mae-asus-tuf-gaming-b450m-plus-ii-chipset-b450-amd-am4-matx-ddr4-90mb1620-m0eay0",
    selector: "div div div div div div p span",
  },
  {
    title:
      "https://www.amazon.com.br/Placa-M%C3%A3e-Asus-B450M-PLUS-90MB0YQ0-M0EAY0-DDR4-mATX/dp/B07F6XBJVG",
    selector: "span.a-offscreen",
  },
  {
    title:
      "https://www.pichau.com.br/placa-mae-asus-tuf-b450m-plus-gaming-ddr4-socket-am4-chipset-amd-b450",
    selector: "div main div div div div div div div div div.jss69",
  },
];

const hd = [
  {
    title:
      "https://www.kabum.com.br/produto/84108/hd-seagate-barracuda-1tb-3-5-sata-st1000dm010",
    selector: "article section div h4",
  },
  {
    title:
      "https://www.terabyteshop.com.br/produto/7251/hd-seagate-barracuda-st1000dm010-1tb-7200rpm-64mb-sata-iii",
    selector: "div div div div div div p span",
  },
  {
    title:
      "https://www.amazon.com.br/Interno-Seagate-Desktop-BarraCuda-interno/dp/B0767D1BZY",
    selector: "span.a-offscreen",
  },
  {
    title:
      "https://www.pichau.com.br/hd-seagate-barracuda-1tb-3-5-sata-iii-6gb-s-st1000dm010",
    selector: "div main div div div div div div div div div.jss69",
  },
];

const ssdM2 = [
  {
    title:
      "https://www.amazon.com.br/Black-WD-WDS500G3X0C-00SJG0-Armazenamento-Interno/dp/B07MH2P5ZD",
    selector: "span.a-offscreen",
  },
  {
    title:
      "https://www.kabum.com.br/produto/100269/ssd-wd-black-sn750-500gb-m-2-nvme-leitura-3430mb-s-gravacao-2600mb-s-wds500g3x0c",
    selector: "article section div h4",
  },
];

const ssd = [
  {
    title:
      "https://www.kabum.com.br/produto/95217/ssd-kingston-a400-960gb-sata-leitura-500mb-s-gravacao-450mb-s-sa400s37-960g",
    selector: "article section div h4",
  },
  {
    title:
      "https://www.amazon.com.br/DESKTOP-NOTEBOOK-KINGSTON-SA400S37-960G/dp/B079XC5PVV",
    selector: "span.a-offscreen",
  },
  {
    title:
      "https://www.pichau.com.br/ssd-kingston-a400-960gb-sata-3-2-5-sa400s37-960g?gclid=Cj0KCQiA47GNBhDrARIsAKfZ2rDYgys69vDhrDEaq_Ju0Sk91wK0v-n0ZgnHekYetoTtzJM5FxB5Lo8aAms1EALw_wcB",
    selector: "div main div div div div div div div div div.jss69",
  },
  {
    title: "https://www.amazon.com.br/dp/B079XC5PVV",
    selector: "span.a-offscreen",
  },
];

const placaVideo = [
  {
    title:
      "https://www.kabum.com.br/produto/129973/placa-de-video-asus-nvidia-geforce-gtx-1650-4gb-gddr6-tuf-gtx1650-o4gd6-p-gaming",
    selector: "article section div h4",
  },
  {
    title:
      "https://www.terabyteshop.com.br/produto/15892/placa-de-video-asus-tuf-gaming-geforce-gtx-1650-oc-dual-4gb-gddr6-128bit-tuf-gtx1650-o4gd6-p-gaming",
    selector: "div div div div div div p span",
  },
  {
    title:
      "https://www.pichau.com.br/placa-de-video-asus-geforce-gtx-1650-oc-4gb-gddr6-tuf-gaming-128-bit-tuf-gtx1650-o4gd6-p-gaming",
    selector: "div main div div div div div div div div div.jss69",
  },
  {
    title:
      "https://www.amazon.com.br/Placa-video-geforce-gaming-tuf-gtx1650-o4gd6-gami/dp/B087XP6FSG",
    selector: "span.a-offscreen",
  },
  {
    title:
      "https://www.amazon.com.br/PLACA-VIDEO-ASUS-GEFORCE-GAMING/dp/B08F2KZM8X",
    selector: "span.a-offscreen",
  },
];

const fonte = [
  {
    title:
      "https://www.amazon.com.br/Fonte-650W-Cv650-Plus-Bronze/dp/B0842T71MK",
    selector: "span.a-offscreen",
  },
  {
    title:
      "https://www.amazon.com.br/Fonte-Corsair-CV550-Bronze-CP-9020210-BR/dp/B0842T1TQ8",
    selector: "span.a-offscreen",
  },
  {
    title:
      "https://www.pichau.com.br/fonte-corsair-cv-series-cv550-80-plus-bronze-550w-cp-9020210-br",
    selector: "div main div div div div div div div div div.jss69",
  },
  {
    title:
      "https://www.kabum.com.br/produto/108257/fonte-corsair-cv550-550w-80-plus-bronze-cp-9020210-br",
    selector: "article section div h4",
  },
];

const gabinete = ["", "", ""];

async function buscarProcessador() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of processador) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/processador.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

async function buscaPlacaMae() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of placaMae) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/placaMae.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

async function buscaHd() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of hd) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/hd.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

async function buscaSsdM2() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of ssdM2) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/ssdM2.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

async function buscaSsd() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of ssd) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/ssd.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

async function buscaPlacaVideo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of placaVideo) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/placaVideo.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

async function buscaFonte() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of fonte) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/fontes.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

async function buscaGabinete() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let resultado = [];

  for (let item of gabinete) {
    await page.goto(item.title);

    const result = await page
      .evaluate((item) => {
        const price = document.querySelector(item.selector).innerText;

        const obj = {
          name: item.title,
          price,
          data: new Date().toLocaleDateString(),
        };

        return obj;
      }, item)
      .catch((err) => console.log({ err }));
    resultado.push(result);
  }

  fs.writeFile(
    "./compras/gabinete.json",
    JSON.stringify(resultado, null, 2),
    { flag: "a" },
    (err) => {
      if (err) throw new Error(err);

      console.log("well done!");
    }
  );

  await browser.close();
}

buscarProcessador();
// buscaPlacaMae();
// buscaHd();
// buscaSsdM2();
// buscaSsd();
// buscaPlacaVideo();
// buscaFonte();
// buscaGabinete();

setTimeout(() => {
  buscaPlacaMae();
}, 300000); // 5
setTimeout(() => {
  buscaHd();
}, 600000); // 10
setTimeout(() => {
  buscaSsdM2();
}, 900000); // 15
setTimeout(() => {
  buscaSsd();
}, 1200000); // 20
setTimeout(() => {
  buscaPlacaVideo();
}, 1500000); // 25
setTimeout(() => {
  buscaFonte();
}, 1800000); // 30
