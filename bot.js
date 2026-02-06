const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'yyycraft.falixsrv.me',
    port: 39687,
    username: 'ShadowCrafter',
    auth: 'offline' // keep offline since you don’t have a Microsoft account
  });

  bot.on('spawn', () => {
    console.log('Bot is online (AFK)');

    // Simple AFK jump loop
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }, 60000);
  });

  // Ignore all incoming chat messages so the bot doesn’t crash
  bot.on('message', (message) => {
    // Do nothing with chat
  });

  bot.on('end', () => {
    console.log('Disconnected... reconnecting in 5s');
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => {
    console.log('Error:', err.message);
  });
}

startBot();
