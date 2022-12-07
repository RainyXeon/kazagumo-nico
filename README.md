# kazagumo-nico
A plugin that allows you to play music on nico

Install
```
npm i kazagumo-nico
```

Support source:
```
- https://www.nicovideo.jp/watch/sm30067009
```
How to
```js
const { Kazagumo } = require('kazagumo');
const Nico = require('kazagumo-nico');

const kazagumo = new Kazagumo(
  {
    plugins: [
      new Deezer({
        playlistLimit: 20
      }),
    ],
  },
  new Connectors.DiscordJS(client),
  Nodes,
);

kazagumo.search(`https://www.nicovideo.jp/watch/sm30067009`); // track
kazagumo.search('初音ミク', { engine: 'niconicotv' }); // search track using nico
```
