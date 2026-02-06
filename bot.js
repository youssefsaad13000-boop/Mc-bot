const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'yyycraft.falixsrv.me',
    port: 39687,
    username: 'ShadowCrafter900',
    auth: 'microsoft'
  });

  let jumpInterval;

  bot.on('spawn', () => {
    console.log('Bot is online (AFK)');

    // Send vanish command once on spawn
    bot.chat('/vanish');

    // Anti-AFK loop
    jumpInterval = setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);

      // Optional: random movement
      const directions = ['forward', 'back', 'left', 'right'];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      bot.setControlState(dir, true);
      setTimeout(() => bot.setControlState(dir, false), 1000);
    }, 60000);
  });

  bot.on('end', () => {
    console.log('Disconnected... reconnecting in 5s');
    clearInterval(jumpInterval);
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => {
    console.log('Error:', err.message);
  });
}

startBot();
