const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const memes  = require('random-memes')

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.initialize();

var rep_msg = `Hi! How may I help You?
Type *'help'* to see the command.` 
var help = `TYPE THIS
--> !meme` 



client.on('message', async (message) => {
    var lowerCase = message.body.toLowerCase()
    if (lowerCase.substring(0, 5) === '!meme')
  {
   await memes.fromReddit()
    memes.fromReddit("en").then((meme)=>{
    
        var me_me = meme.image
        var memeCaption = meme.caption
       
        console.log(me_me)

        console.log("Category: " + meme.category)
        console.log("Caption: " + meme.caption)
        // console.log("link: " + meme.permalink)
        MessageMedia.fromUrl(me_me).then((pic)=>{

            client.sendMessage(message.from, pic, {caption: memeCaption} )
            
            });
        })    
  }
    else if (message.body.toLowerCase() === 'help'){
        message.reply(help)
       }
        else {
        message.reply(rep_msg)
       }
})

