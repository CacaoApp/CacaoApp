var config = {
  apiKey: "AIzaSyDj1Ao1CQpZa0t5UO2V1LhgCM6kqE1xPcA",
  authDomain: "cacaoapp-f9f17.firebaseapp.com",
  databaseURL: "https://cacaoapp-f9f17.firebaseio.com",
  storageBucket: "cacaoapp-f9f17.appspot.com",
  messagingSenderId: "390201177541"
};

firebase.initializeApp(config);

var refGuerreros = firebase.database().ref('estudiantes');
refGuerreros.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {{}
    var value = childSnapshot.val();
    var node = document.createElement("li");    
    node.className = "warrior_item_list"; 

    var imagenlink = "assets/team_icons/ocelote_icon.png"

    switch(value.grupo){
      case "Ocelote":
        imagenlink = "assets/team_icons/ocelote_icon.png"
      break;
      case "Huitzilin":
        imagenlink = "assets/team_icons/huitzilin_icon.png"
      break;
      case "Michin":
        imagenlink = "assets/team_icons/michin_icon.png"
      break;
      case "Coate":
        imagenlink = "assets/team_icons/coate_icon.png"
      break;
      case "Mazate":
        imagenlink = "assets/team_icons/mazate_icon.png"
      break;
      case "Tlacuache":
        imagenlink = "assets/team_icons/tlacuache_icon.png"
      break;
      case "Chapolin":
        imagenlink = "assets/team_icons/chapolin_icon.png"
      break;
    }
    let enlaceJugador = "/site/jugador.html?cid="+value.id;
    node.innerHTML = "<a class=\"text-dark\" href=\""+  enlaceJugador +"\"> <div class=\"list-group-item list-group-item-action\">" + "<b>" + value.nombres+" "+value.apellidos+ "</b>"+" ("+ value.grupo +")"+ "<span class=\" ml-3 \" ><img width=50px src=\""+imagenlink+"\"></span>" + "</div></a>";
    document.getElementById("list_warriors").appendChild(node);
  });
});