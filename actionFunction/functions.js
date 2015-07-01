exports.find_blacklist = function(doc,blackList,response)
{
  var flag = true;
  if(0 == blackList.length)
    return true;
  else
    {
      for(var i = 0; i <= blackList.length; i++)
      {
        if(blackList[i]._SN === doc._SN)
        {
          flag = true;
          break;
        }
        else continue;
      }
    } 
  return flag;
}

exports.find_record = function(doc,requestsch,blackList,response)
{
  console.log("finding records");
  var ret = requestsch.find({_SN:doc._SN}).sort({'_time':-1}).limit(1).exec(function(err,data)
  {
    console.log(data[0]._SN);
    if(data.length == 1)
    {
      different = Date.now() - data[0]._time;
      console.log(different);
      if(different < 5*1000)
      { 
        console.log("time difference is too small;");
        blackList.push(doc);
        return false;
      }
      else
      { 
        console.log("enough time difference ");
        return true;
      }
    }
    else if(data.length == 0)
    { 
      console.log("data length is NULL");
      return true;
    }
    else 
      return false; 
  }); 
  return ret;
}

exports.record_send = function(doc,requestsch,response)
{
  var ret = requestsch.create(doc,function(err)
  {
    if(err) return false;
    else return true;
  });
  console.log("saved and send");
  return ret;
}

exports.encryption = function(str,pwd)
{
  var tmp = '';
  for(var i = 0; i<str.length;i ++)
  {
    tmp = (Number(str.charAt(i))^pwd[i%3]).toString();
  }
  return tmp; 
}

exports.feedback = function(response,num,str)
{
  response.writeHead(num,{
      "Content-Type" : "text/plain"
       ,"connection":"close"});
    response.write(str);
    response.end(); 
}