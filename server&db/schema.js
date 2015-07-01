

var mongoose = require("mongoose")
    ,Schema1 = mongoose.Schema
    ,Schema2 = mongoose.Schema;

var SchemaCollection={};
mongoose.connect("mongodb://localhost/00");

var requestRecordsSchema = new Schema1 ({
  _version:String,
  _SN:String,
  _code:String,
  _time:{type:Number,defualt:Date.now},
  extral:{type:String,defualt:''}
});

var versionFileSchema = new Schema2 ({
  _productClass:String,
  _newestVersion:String,
  _mustUpdate:String
});

SchemaCollection['requestRecords'] = mongoose.model("requestrecords",requestRecordsSchema);
SchemaCollection['versionFile'] = mongoose.model("versionfile",versionFileSchema);

exports.SchemaCollection = SchemaCollection;
