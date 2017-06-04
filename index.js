const TBot = require('node-telegram-bot-api'),
      token = require('./config.js').tg_api_key;

const bot = new TBot(token, {polling: true});

function get_model() {
    return {
        notice_text: 'Ближайший забег уже в эту среду! 4-6км, легкий темп и непередаваемая атмосфера!',
        chat: '-243788235',
        distance: 4,
        members: [],
        pace: 7,
        date: '07.06.2017 19:20',
        last_run: {}
    }
}

let run_data = get_model();

bot.on('message', message => {
    let id = message.chat.id,
        message_text = message.text ? message.text.toLowerCase() : '';

    console.log(message);

    if (message.new_chat_member) {
        user_id = message.new_chat_member.id;
    }

    if (message_text.indexOf('сколько') > -1 || message_text.indexOf('distance') > -1 || message_text.indexOf('crjkmrj') > -1) {
        let reply_text = `В этот раз мы бежим около ${run_data.distance} км. Весь забег разделен пополам, в промежутке мы будем делать специальные беговые упражнения и небольшие тренировки`;
        bot.sendMessage(id, reply_text);
    }
    if (message_text.indexOf('когда') > -1 || message_text.indexOf('when') > -1 || message_text.indexOf('rjulf') > -1 ) {
        bot.sendMessage(id, `Следующая пробежка будет ${run_data.date}, ждем тебя!`)
    }
    if (message_text.indexOf('темп') > -1 || message_text.indexOf('pace') > -1 || message_text.indexOf('ntvg') > -1 ) {
        bot.sendMessage(id, `Обычно мы бежим с темпом 6-7 минут на километр, это споконый темп, но ты в любом случае не останешья один! Запланированный темп на эту тренировку ${run_data.pace} мин/км`)
    }
    // if (message_text.indexOf('чат') > -1 || message_text.indexOf('chat') > -1 || message_text.indexOf('xfn') > -1) {
        
    // }
    if (message_text.indexOf('vjue') > -1 || message_text.indexOf('могу') > -1) {
        bot.sendMessage(id, `Конечно, дошел до работы добежишь и пробежку! `)
    }
    if (message_text.indexOf('fyjyc') > -1 || message_text.indexOf('анонс') > -1 || message_text.indexOf('cktle.obq') > -1 || message_text.indexOf('следу') > -1 || message_text.indexOf('next') > -1 || message_text.indexOf('/start') > -1 ) {
        bot.sendMessage(id, run_data.notice_text);
    }
    if (message_text.indexOf('/howtoadd') > -1) {
        bot.sendMessage(id, `Just type /addnewrun *distance* | *pace* | *date* | *notice message* in that order, its important!`);
    }
    if (message_text.indexOf('/addnewrun') > -1) {
        let settings = message_text.substring(11).split('|');
        
        run_data.distance = settings[0];
        run_data.pace = settings[1];
        run_data.date = settings[2];
        run_data.notice_text = settings[3];

        bot.sendMessage(id, `I add data to run_date, result: distance - ${run_data.distance}, pace - ${run_data.pace}, date - ${run_data.date}, notice - ${run_data.notice_text} `);
    }
});
