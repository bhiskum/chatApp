//  function generateMessage (from,text){
    
//       this.from = from,
//         this.text =text,
//         createdAt =  new Date().getTime()
   
// };


//module.exports = {generateMessage};

function generateMessage (from,text){
    return {
    from ,
      text,
      createdAt : new Date().getTime()
    };
 
};


module.exports = {generateMessage};