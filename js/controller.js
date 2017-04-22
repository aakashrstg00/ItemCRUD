/*
This Controller is Acting as a Middle Layer B/W
View(HTML) and Model(JS)
*/

window.addEventListener("load", init);

function init() {
    document.getElementById("load").addEventListener("click",loadTask);
    document.getElementById("add").addEventListener("click", addNewTask);
    document.getElementById("search").addEventListener("click", searchTask);
    document.getElementById("save").addEventListener("click", saveTask);
    document.getElementById("update").addEventListener("click", updateTask);
    document.getElementById("delete").addEventListener("click", deleteTask);
    document.getElementById("sort").addEventListener("click", sortTask);
}

function saveTask(){
    if(window.localStorage){
        localStorage.localitems=JSON.stringify(itemOperations.itemList);
        alert("SAVED!!");
    }
}

function loadTask(){
   
    if(localStorage){
        if(localStorage.localitems){
            itemOperations.itemList=JSON.parse(localStorage.localitems);
             console.log("into LOAD");
            var length=itemOperations.itemList.length;
            itemNo=itemOperations.itemList[length-1].itemNo;
            itemNo++;
            document.getElementById("itemno").innerHTML=itemNo;
            printTask(itemOperations.itemList);
        }
    }
}

function deleteTask(){
    printTask(itemOperations.deleteRecords());
}

function isNotBlank(val) {
    if (val) {
        return true;
    } else {
        return false;
    }
}

function sortByPrice(){
    printTask(itemOperations.sortByPrice());
}

function searchTask() {
    var id = itemNo;

    var itemName = document.getElementById("itemname").value;
    var itemURL = document.getElementById("url").value;
    var itemObject = new Item();
    itemObject.id = isNotBlank(id) ? id : 0;
    itemObject.name = isNotBlank(itemName) ? itemName : "";
    itemObject.price = document.getElementById("price").value;

    var subArray = itemOperations.searchItem(itemObject);
    printTask(subArray);
}

function sortTask(){
    printTask(itemOperations.sortByPrice());
}

function updateTask(){
    var itemObject=itemOperations.searchByIdforUpdate(parseInt(this.getAttribute("data2-itemno")));
    if(itemObject.willUpdate==true){
        itemObject.name=document.getElementById("itemname").value;
        itemObject.price=document.getElementById("price").value;
        itemObject.url=document.getElementById("url").value;
        itemObject.willUpdate=false;
        printTask(itemOperations.itemList);
    }
}      

function updater(){
    alert("#Update the values#");
    var itemObject=itemOperations.searchByIdforUpdate(parseInt(this.getAttribute("data2-itemno")));
    document.getElementById("itemname").value=itemObject.name;
    document.getElementById("price").value=itemObject.price;
    document.getElementById("url").value=itemObject.url;;
    document.getElementById("itemname").focus();
    itemObject.willUpdate=true;
}

function printTask(itemList) {
    var table = document.getElementById("itemlist");
    table.innerHTML="";
    var row = table.insertRow();
    row.insertCell(0).innerHTML="Item No";
    row.insertCell(1).innerHTML="Item Name";
    row.insertCell(2).innerHTML="Price";
    row.insertCell(3).innerHTML="Image URL";
    row.insertCell(4).innerHTML="Delete??";
    row.insertCell(5).innerHTML="Update??";
    itemList.forEach(function(itemObject) {
        var row = table.insertRow();
        var i=0;
        for(key in itemObject){
            if(key!="isDeleted"){
                if(key!="willUpdate"){
                    row.insertCell(i).innerHTML=itemObject[key];
                    i++;
                }
            }
        }
        var img=document.createElement("img");
        if(itemObject.isDeleted==false){
        img.src="../images/delete.png";
        }
        else{
            img.src="../images/deleted.png";
        }
        img.setAttribute("data-itemno",itemObject.itemNo);
        row.insertCell(4).appendChild(img);
        img.addEventListener("click",toggleDelete);
        
        var img2=document.createElement("img");
        img2.src="../images/Edit.png";
        img2.setAttribute("data2-itemno",itemObject.itemNo);
        row.insertCell(5).appendChild(img2);
        img2.addEventListener("click",updater);
    });
}

var itemNo = 1;

function toggleDelete()
{
    var itemObject=itemOperations.searchByIdforDelete(parseInt(this.getAttribute("data-itemno")));
    if(itemObject.isDeleted){
        this.src="../images/deleted.png";
    }
    else{
        this.src="../images/delete.png";
    }
}
function addNewTask() {
    var table = document.getElementById("itemlist");
    var itemName = document.getElementById("itemname").value;
    var price = document.getElementById("price").value;
    var url = document.getElementById("url").value;
    var row = table.insertRow();
    var itemObject = new Item(itemNo, itemName, price, url);
    itemOperations.addItemInArray(itemObject);
    printTask(itemOperations.itemList);
    itemNo++;
    clearField();
}

function clearField() {
    document.getElementById("itemno").innerHTML = itemNo;
    var fields = document.getElementsByClassName("clearfields");
    Array.prototype.forEach.call(fields, function(field) {
        field.value = "";
    });
    document.getElementById("itemname").focus();
}