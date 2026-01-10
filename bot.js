const mineflayer = require('mineflayer')
  const bot = mineflayer.createBot({
    host: 'Teibaceaft123.aternos.me',
    port: 60036,
    username: 'AFK_Bot',
    auth: 'offline'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot is online (AFK)');

    // حركة خفيفة عشان ما ينفصل
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }, 60000);
  });

  bot.on('end', () => {
    console.log('❌ Disconnected... reconnecting in 5s');
    setTimeout(startBot, 5000);
  });
