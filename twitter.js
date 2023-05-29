const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://twitter.com/i/flow/login");

  await page.waitForSelector(
    ".r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu"
  );

  const usernameInput = await page.$(
    ".r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu"
  );
  await usernameInput.type("pruebaaa2881791");
  await page.keyboard.press("Enter");

  await page.waitForSelector(
    ".r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu"
  );
  const passwordInput = await page.$(
    ".r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-1dz5y72.r-fdjqy7.r-13qz1uu"
  );

  await passwordInput.type("isma2002");
  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  // esto se queda pillado aquí, no avanza

  await page.goto("https://twitter.com/messages");
  await page.waitForSelector('[data-testid="conversation"]');
  let chatDivs = await page.$$('[data-testid="conversation"]');

  let contador = 0;
  const maxChats = chatDivs.length;

  while (contador < maxChats) {
    let currentChatDiv = chatDivs[contador];

    await currentChatDiv.click();

    await page.waitForSelector('[data-testid="tweetText"]');
    const messageDivs = await page.$$('[data-testid="tweetText"]');

    const messages = [];

    for (const div of messageDivs) {
      const textElement = await div.$("span");
      const emoteElement = await div.$("img[title]");

      if (textElement) {
        const text = await page.evaluate(
          (element) => element.textContent,
          textElement
        );
        messages.push({ type: "text", content: text });
      } else if (emoteElement) {
        messages.push({ type: "emote" });
      }
    }

    if (messages.length === 0) {
      console.log("No se encontraron mensajes en el chat.");
    } else {
      for (const message of messages) {
        if (message.type === "text") {
          console.log(message.content);
        } else if (message.type === "emote") {
          console.log("Emote");
        }
      }
    }

    try {
      // Esperar a que aparezcan los selectores de imágenes en el chat
      await page.waitForSelector('[data-testid="image"]', {
        timeout: 3000,
      });
      const imageDivs = await page.$$('[data-testid="image"]');

      for (const div of imageDivs) {
        const imgElement = await div.$("img");
        if (imgElement) {
          const imageUrl = await page.evaluate(
            (element) => element.src,
            imgElement
          );
          console.log("Enlace de la imagen:", imageUrl);
        }
      }
    } catch (error) {
      console.log("No se encontraron imágenes en el chat.");
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // try {
    //   const videoElements = await page.$$('video[type="video/mp4"]');

    //   for (const element of videoElements) {
    //     const videoUrl = await page.evaluate((el) => el.src, element);
    //     console.log("Enlace del video:", videoUrl);
    //   }
    // } catch (error) {
    //   console.log("No se encontraron videos en el chat.");
    // }
    
    try {
      // Esperar a que aparezcan los selectores de videos en el chat
      await page.waitForSelector('[data-testid="videoComponent"]', {
        timeout: 3000,
      });
      const videoDivs = await page.$$('[data-testid="videoComponent"]');

      for (const div of videoDivs) {
        const videoElements = await div.$$("div > div > video");
        for (const videoElement of videoElements) {
          const videoUrl = await page.evaluate((element) => {
            if (element.src.endsWith(".mp4")) {
              return element.src;
            } else {
              return null;
            }
          }, videoElement);

          if (videoUrl) {
            console.log("Enlace del video:", videoUrl);
          }
        }
      }
    } catch (error) {
      console.log("No se encontraron videos en el chat.");
    }

    const chatInfoDiv = await page.$(
      ".css-901oao.r-1awozwy.r-18jsvk2.r-6koalj.r-37j5jr.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-1udh08x.r-3s2u2q.r-qvutc0"
    );

    if (chatInfoDiv) {
      const usernameElement = await chatInfoDiv.$("span > span");
      if (usernameElement) {
        const username = await page.evaluate(
          (element) => element.textContent,
          usernameElement
        );
        console.log("Nombre de usuario:", username);
      } else {
        console.log("Username element not found.");
      }
    } else {
      console.log("Chat info div not found.");
    }

    await page.goBack();
    await page.waitForSelector('[data-testid="conversation"]');
    chatDivs = await page.$$('[data-testid="conversation"]');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    contador++;
  }
  await browser.close();
})();
