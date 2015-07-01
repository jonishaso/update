
var requestsch = require("../server&db/schema.js").SchemaCollection["requestRecords"]
   ,functions = require("./functions.js")
   ,blackList = [];

exports.sendVersionFile = function(request, response) {   
  
  if(   request.query.hasOwnProperty("sn")
     && request.query.hasOwnProperty("ver")
     && request.query.hasOwnProperty("_code_")
     ) 
  return;
  pwd=[1,2,3];
  var out = functions.encryption(request.query.sn,pwd);
  
  // if(out !== request.query._code_) return;
  doc = {
         _version:request.query.ver
        ,_SN:request.query.sn
        ,_code:out
        ,_time:Date.now()
        ,extral:''
  			}
  mm = "LX," +doc._version + ",115.29.221.91,21,4.1.1.0," +doc._code + ",60"

  if(   functions.find_blacklist(doc,blackList)
      && functions.find_record(doc,requestsch,blackList)
      && functions.record_send(doc,requestsch) 
    )
      
      functions.feedback(response,200,mm);
  
  else functions.feedback(response,404,"bad try");          
}

// var interval = setInterval(cleanBL,10*1000);
function cleanBL(){
  
}