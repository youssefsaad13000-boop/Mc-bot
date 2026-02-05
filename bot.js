const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'yyycraft.falixsrv.me',
    port: 39687,
    username: '24bb7',
    auth: 'offline'
  });

  bot.on('spawn', () => {
    console.log('Bot is online (AFK)');

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }, 60000);
  });

  bot.on('end', () => {
    console.log('Disconnected... reconnecting in 5s');
    setTimeout(startBot, 500);
  });

  bot.on('error', err => {
    console.log('Error:', err.message);
  });
}

startBot();
