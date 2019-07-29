var hotel = {
    room_charges:300,
    gst:20,
    promos:[20,25,30]
}

for(i=0;i<hotel.promos.length;i++){
    var check=document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("name", "promo");
    check.setAttribute("value", i);
    check.setAttribute("class","check");
    document.getElementsByClassName('promo-box')[0].appendChild(check)

    var text=document.createTextNode("Promo"+(i+1))
    document.getElementsByClassName('promo-box')[0].appendChild(text)

    var br=document.createElement("br")
    document.getElementsByClassName('promo-box')[0].appendChild(br)
}

var promos=document.getElementsByClassName('check')
var checked=[]
reflectChanges();  
function findCheckedPromos(){
    checked=[]
    for(var i=0;i<promos.length;i++){
        if(promos[i].checked){
            checked.push(promos[i])
        }
    } 
}
for(var i in promos){
    promos[i].onclick=function(){
        findCheckedPromos();
        reflectChanges();
    }
}
function reflectChanges(){
document.getElementById('room-charges').textContent=hotel.room_charges;
var discount=0
if(checked.length>0)
{
    room_charges=hotel.room_charges
    for(i=0;i<checked.length;i++){
        discount+=hotel.promos[checked[i].value]* room_charges /100 ;
    }
}
document.getElementById('goibibo-discount').textContent=discount;
var subtotal=hotel.room_charges-discount
document.getElementById('subtotal').textContent=subtotal
document.getElementById('gst').textContent=hotel.gst
var total = subtotal+hotel.gst
document.getElementById('total').textContent=total
}