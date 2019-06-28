var moment = require('moment');

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "e6856f8f",
  application_key: "08668b6deb88c331e3235bd9b9446cfb"
});

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

function generateMessage(from, text) {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

function message(text) {

return new Promise(resolve=>{
  textapi.sentiment(text, function (error, response) {
    if (error === null) 
    {
      if (response.polarity === 'positive') { text = text +':)';}
      else if (response.polarity === 'negative') { text = text +':('; }
      else { text = text +':|'; }
    }
    
    resolve(text);
  
  });
  
});

};


module.exports = { generateMessage, generateLocationMessage,message};