var hotel = {
    room_charges:300,
    gst:20,
    promos:[20,25,30]
}
for(var i=0;i<hotel.promos.length;i++){
    var radio=document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "promo");
    radio.setAttribute("value", i);
    radio.setAttribute("class","radio");
    document.getElementsByClassName('promo-box')[0].appendChild(radio)

    var text=document.createTextNode("Promo"+(i+1))
    document.getElementsByClassName('promo-box')[0].appendChild(text)

    var br=document.createElement("br")
    document.getElementsByClassName('promo-box')[0].appendChild(br)
}
// var promos = hotels
var promos=document.getElementsByClassName('radio');
var checked=0
reflectChanges();   
for(var i in promos){
    promos[i].onclick=function(){
        alert(i);
        // promo=this.value
        // checked++;
        // reflectChanges();
    }
}
function reflectChanges(){
document.getElementById('room-charges').textContent=hotel.room_charges;
var discount=0
if(checked>0)
discount= hotel.promos[promo] * hotel.room_charges /100 ;
document.getElementById('goibibo-discount').textContent=discount;
var subtotal=hotel.room_charges-discount
document.getElementById('subtotal').textContent=subtotal
document.getElementById('gst').textContent=hotel.gst
var total = subtotal+hotel.gst
document.getElementById('total').textContent=total
}