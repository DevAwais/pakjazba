var mongoose = require('mongoose');
var config = require('../config/config');


var postyourproduct = new mongoose.Schema({
  user_Id:{type:String},
  profileId:{type:String},
  status:{type:String},
  UPC:{type:String},
  color:{type:String},
  gtin:{type:String},
  brandName:{type:String},
  allTabs:{type:Array},
  itemLength:{type:Object},
  itemWeight:{type:Object},
  itemWidth:{type:Object},
  lenseColor:{type:String},
  manufacturer:{type:String},
  manufacturerPart:{type:String},
  materialType:{type:String},
  maximumWeight:{type:String},
  orientation:{type:String},
  pakageQuantity:{type:String},
  product:{type:String},
  warrantyDescription:{type:String},
  shaft:{type:String},
  shape:{type:String},
  size:{type:String},
  tension:{type:String},
  variationTheme:{type:String},
  conditionNote:{type:String},
  condition:{type:String},
  country:{type:String},
  countryLabeled:{type:String},
  handlingTime:{type:String},
  importDesignation:{type:String},
  legalDesclaimer:{type:String},
  price:{type:String},
  productId:{type:String},
  quantity:{type:String},
  salePrice:{type:String},
  seller:{type:String},
  taxCode:{type:String},
  offering:{type:String},
  restockDate:{type:String},
  salePriceDate1:{type:String},
  salePriceDate2:{type:String},
  sellingDate:{type:String},
  images:{type:Array},
  description:{type:String},
  productFeature:{type:String},
  IntendedUsekeyWords:{type:Array},
  targetAudience:{type:Array},
  intendedUse:{type:String},
  platinumKeywords:{type:String},
  searchTerms:{type:String},
  subjectMatter:{type:Array},

});

mongoose.model('postyourproduct',postyourproduct);
