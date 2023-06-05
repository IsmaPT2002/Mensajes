const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/login/");
  await page.waitForSelector("#username");
  await page.type("#username", "ismaelpereztierra@gmail.com");
  await page.type("#password", "ismpeR*02");
  await page.click(".btn__primary--large");

  // Esperar a que se cargue la página principal después del inicio de sesión
  await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 60000 });

  // Navegar a la sección de mensajes
  await page.goto("https://www.linkedin.com/messaging/?");

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  let contador = 0;

  while (true) {
    // Obtener todos los elementos div con la clase .msg-conversation-card__content--selectable
    const chatDivs = await page.$$(
      "div.msg-conversation-card__rows"
    );

    // Verificar si hay más elementos de chat
    if (contador >= chatDivs.length) {
      break; // Salir del ciclo si no hay más elementos de chat
    }

    // Obtener el chat actual
    const currentChatDiv = chatDivs[contador];

    await currentChatDiv.click();

    const h2Elements = await page.$$(
      'h2[class^="msg-entity-lockup__entity-title"]'
    );

    for (const element of h2Elements) {
      const content = await page.evaluate(
        (el) => el.textContent.trim(),
        element
      );
      console.log("Nombre de usuario:", content);
    }

    const h3Elements = await page.$$(
      'h3[class^="msg-s-event-listitem__subject"]'
    );

    for (const element of h3Elements) {
      const content = await page.evaluate(
        (el) => el.textContent.trim(),
        element
      );
      console.log(content);
    }

    const pElements = await page.$$('p[class^="msg-s-event-listitem__body"]');

    for (const element of pElements) {
      const content = await page.evaluate((el) => el.textContent, element);
      console.log(content);
    }

    try {
      // Esperar a que aparezcan los selectores de imágenes en el chat
      await page.waitForSelector("div.msg-s-event-listitem__image-container", {
        timeout: 3000,
      });
      const imageDivs = await page.$$(
        "div.msg-s-event-listitem__image-container"
      );

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

    const videoElements = await page.$$('video[class="vjs-tech"]');

    for (const element of videoElements) {
      const videoUrl = await page.evaluate((el) => el.src, element);
      console.log("Enlace del video:", videoUrl);
    }
    console.log("=====================================");
    contador++;
  }

  // await browser.close();
})();
