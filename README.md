# Scraping de mensajes directos en Instagram, Linkedin y Twitter

En este manual, te proporcionaré información sobre cómo realizar el scraping de mensajes directos en diferentes redes sociales, específicamente en Instagram, LinkedIn y Twitter, utilizando JavaScript. Utilizaré la API de Instagram para extraer los mensajes directos, mientras que para Twitter e Instagram utilizaré Puppeteer, ya que el acceso a través de la API en Twitter requeriría el pago de tarifas, en el caso de LinkedIn no permite el acceso a través de la API para mensajes directos debido a restricciones de permisos.


## Instagram

Para extraer mensajes directos de Instagram, sigue estos pasos:

1. Asegúrate de tener instalado Node.js en tu sistema.

2. Instala las dependencias requeridas ejecutando el siguiente comando en la terminal en la carpeta del proyecto:

```arduino
npm install instagram-private-api
```

3. Abre el archivo y configura las siguientes líneas de código con tu información de inicio de sesión de Instagram:
    
```javascript
await ig.state.generateDevice('tu_nombre_de_usuario');
await ig.account.login('tu_nombre_de_usuario', 'tu_contraseña');
```

4. Guarda el archivo con el nombre que desees y la extensión .js, por ejemplo, instagram_scraper.js.

5. Abre la terminal y ejecuta el archivo usando Node.js:

```javascript
node instagram_scraper.js
```

El script iniciará sesión en tu cuenta de Instagram, obtendrá los mensajes directos y los imprimirá en la consola. Ten en cuenta que, debido a las limitaciones de la API de Instagram, los videos e imágenes en este caso se mostrarán como "undefined".

## LinkedIn

Para extraer mensajes directos de LinkedIn, sigue estos pasos:

1. Asegúrate de tener instalado Node.js en tu sistema.

2. Instala las dependencias requeridas ejecutando el siguiente comando en la terminal en la carpeta del proyecto:

```arduino
npm install puppeteer
```

3. Abre el archivo y configura las siguientes líneas de código con tu información de inicio de sesión de LinkedIn:
    
```javascript
await page.type("#username", "tu_correo_electrónico");
await page.type("#password", "tu_contraseña");
```

4. Guarda el archivo con el nombre que desees y la extensión .js, por ejemplo, linkedin_scraper.js.

5. Abre la terminal y ejecuta el archivo usando Node.js:

```javascript
node linkedin_scraper.js
```

El script iniciará sesión en tu cuenta de LinkedIn, navegará a la sección de mensajes y obtendrá los mensajes directos, así como las imágenes y videos relacionados, imprimiéndo sus enlaces de descarga respectivos. Solo se mostrará el contenido completo del primer chat y el ultimo mensaje de los chats restantes, debido a las restricciones de Linkedin.


## Twitter

Para extraer mensajes directos de Twitter, sigue estos pasos:

1. Asegúrate de tener instalado Node.js en tu sistema.

2. Instala las dependencias requeridas ejecutando el siguiente comando en la terminal en la carpeta del proyecto:

```arduino
npm install puppeteer
```

3. Abre el archivo y configura las siguientes líneas de código con tu información de inicio de sesión de Twitter:
    
```javascript
await usernameInput.type("tu_nombre_de_usuario");
await passwordInput.type("tu_contraseña");
```

4. Guarda el archivo con el nombre que desees y la extensión .js, por ejemplo, twitter_scraper.js.

5. Abre la terminal y ejecuta el archivo usando Node.js:

```javascript
node twitter_scraper.js
```

El script iniciará sesión en tu cuenta de Twitter, navegará a la sección de mensajes y obtendrá los mensajes directos, así como las imágenes y videos relacionados, imprimiéndo sus enlaces de descarga respectivos. Debido a las restricciones de Twitter, los resultados pueden variar en cada ejecución.

### Recuerda que las plataformas de redes sociales pueden actualizar sus sitios web y cambiar sus políticas en cualquier momento, lo que podría afectar el funcionamiento del scraping. Es importante estar al tanto de posibles cambios y ajustar el código en consecuencia. Además, asegúrate de tener en cuenta las consideraciones legales y éticas al realizar scraping de datos en redes sociales. Respeta las políticas de cada plataforma y obtén permiso si es necesario antes de realizar cualquier scraping de datos.