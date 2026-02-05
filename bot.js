const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'yyycraft.falixsrv.me', // Server address
    port: 39687,                  // Custom port
    username: 'ShadowCrafter',    // Bot username (change if needed)
    auth: 'offline'               // Use 'offline' if server is cracked
  });

  bot.once('spawn', () => {
    console.log('Bot is online (AFK)');
    bot.chat('ShadowCrafter AFK bot online!');

    // Jump every 60 seconds to avoid AFK kick
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected... reconnecting in 5s');
    setTimeout(startBot, 5000); // reconnect once after 5s
  });

  bot.on('error', err => {
    console.log('Error:', err.message);
  });

  bot.on('kicked', reason => {
    console.log('Kicked:', reason);
  });
}

startBot();
