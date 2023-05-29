const { IgApiClient } = require('instagram-private-api');

(async () => {
  // Crea una instancia del cliente de la API de Instagram
  const ig = new IgApiClient();

  // Inicia sesión en Instagram
  await ig.state.generateDevice('phine_aaaaas');
  await ig.account.login('phine_aaaaas', 'isma2002');

  // Obtiene los mensajes directos
  const inbox = await ig.feed.directInbox().items();

  // Itera sobre los hilos de mensajes
  for (const thread of inbox) {
    console.log(`=== ${thread.thread_title} ===`);

    // Obtiene los mensajes en el hilo actual
    const messages = await ig.feed.directThread({ thread_id: thread.thread_id }).items();

    // Imprime los mensajes en el hilo actual
    for (const message of messages) {
      console.log(`[${message.user_id}] ${message.text}`);
    }

    console.log('====================');
  }

  // Cierra la sesión
  await ig.account.logout();
})();
