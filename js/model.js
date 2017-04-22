/*
This JS Has Only the Logic Stuff
*/
//Function Constructor
function Item(itemNo, name, price, url) {
    this.itemNo = itemNo;
    this.name = name;
    this.price = price;
    this.url = url;
    this.isDeleted=false;
    this.willUpdate=false;
}
// object {key:value,key:value}
// this is an Object
var itemOperations = {
    itemList: [], // this member of object
    countall:function(){
        return this.itemList.length;
    },
    deleteRecords:function(){
        this.itemList=this.itemList.filter(function(itemObject){
            return itemObject.isDeleted==false;
        });
        return this.itemList;
    },
    searchByIdforDelete:function(itemNo){
        var sub=this.itemList.filter(function(itemObject){
            return itemNo==itemObject.itemNo;
        });
        var iO= sub[0];
        iO.isDeleted=!iO.isDeleted;
        return iO;
    },
    searchByIdforUpdate:function(itemNo){
         return this.itemList.filter(function(itemObject){
            return itemNo==itemObject.itemNo;
        })[0];
    },
    addItemInArray: function(itemObject) {
        this.itemList.push(itemObject);
    },
    sortByPrice:function(){
        return this.itemList.sort(function(first,second){
            return first.price-second.price;
        });
    },
    searchItem: function(searchObject) {
            return this.itemList.filter(function(itemObject) {
               var nameSearch = true;
               if (searchObject.name) {
                   nameSearch = itemObject.name == searchObject.name;
               }

               searchObject.price = parseInt(searchObject.price);
               searchObject.price = isNaN(searchObject.price) ? 0 : searchObject.price;
               return itemObject.price >= searchObject.price && nameSearch;
            });
    }
};