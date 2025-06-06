const express = require('express');
const axios = require('axios');
const app = express();

const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.use(express.json());

// Слушаем КОРЕНЬ "/" вместо /webhook
app.post('/', async (req, res) => {
  const msg = req.body.message;
  const text = msg?.text;
  const chatId = msg?.chat?.id;

  console.log('ПОЛУЧЕН ТЕКСТ:', text);

  if (!text || !chatId) return res.sendStatus(200);

  if (text === '/start kontent') {
    await axios.post(`${TELEGRAM_API}/sendDocument`, {
      chat_id: chatId,
      document: 'BQACAgIAAxkBAAMXaDK1dsusPIOjTeazmInLB8czQo4AAmJ4AAJg_pFJocjiQ4aupnU2BA',
      caption: 'Вот гайд “Контент, который продаёт” — выкладывай и взаимодействуй с аудиторией эффективно.'
    });
  } else if (text === '/start smysl') {
    await axios.post(`${TELEGRAM_API}/sendDocument`, {
      chat_id: chatId,
      document: 'BQACAgIAAxkBAAMYaDK1dgnOCVkDeW16pF9BVkTTC_IAAmF4AAJg_pFJs8eZWW6bcbY2BA',
      caption: 'Вот гайд “10 смыслов клиентки”. Это тот самый материал из рекламы — выкладывай контент, который реально трогает.'
    });
  }

  console.log('ОТВЕТ 200 ОТПРАВЛЕН');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}`);
});
