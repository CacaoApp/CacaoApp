window.addEventListener('load', function () {
  console.log("Iniciando script");
  let config = {
    apiKey: "AIzaSyDj1Ao1CQpZa0t5UO2V1LhgCM6kqE1xPcA",
    authDomain: "cacaoapp-f9f17.firebaseapp.com",
    databaseURL: "https://cacaoapp-f9f17.firebaseio.com",
    storageBucket: "cacaoapp-f9f17.appspot.com",
    messagingSenderId: "390201177541"
  };
  firebase.initializeApp(config);
  let url = new URL(window.location.href);
  let identificador = url.searchParams.get("cid");
  if (identificador === null) {
    console.log("URL ERROR");
  } else {
    let refJugador = firebase.database().ref('estudiantes/' + identificador);
    let nodeNombres = document.getElementById("contenedor_nombre_usuario");
    let nodeApellidos = document.getElementById("contenedor_apellido_usuario");
    let nodePuntos = document.getElementById("contenedor_puntos_usuario_span");
    let nodeCacaos = document.getElementById("contenedor_cacaos_usuario_span");
    let nodeGrupo = document.getElementById("contenedor_equipo_usuario_span");
    let nodeImagenEquipo = document.getElementById("imagen_equipo_usuario");
    refJugador.on('value', function (snapshot) {
      let value = snapshot.val();
      nodeNombres.innerText = value.nombres;
      nodeApellidos.innerText = value.apellidos;
      let pathToImage = "assets/team_images/"
      switch (value.grupo) {
        case "Coate":
          pathToImage += "coate_team.png";
          break;
        case "Huitzilin":
          pathToImage += "huitzilin_team.png";
          break;
        case "Mazate":
          pathToImage += "mazate_team.png";
          break;
        case "Michin":
          pathToImage += "michin_team.png";
          break;
        case "Ocelote":
          pathToImage += "ocelote_team.png";
          break;
        case "Tlacuache":
          pathToImage += "tlacuache_team.png";
          break;
      }
      nodeImagenEquipo.setAttribute("src", pathToImage);
      let refEquipoJugador = firebase.database().ref('grupos/' + value.grupo);
      refEquipoJugador.on('value', function (snapshotGrupo) {
        let valueGrupo = snapshotGrupo.val();
        nodePuntos.innerText = parseInt(value.puntosIndividuales) + parseInt(valueGrupo.cantidadPuntos);
        nodeCacaos.innerText = valueGrupo.cantidadCacaos;
        nodeGrupo.innerText = valueGrupo.nombre;
      });
    });

    let refActividades = firebase.database().ref('actividades');
    let listaActividadesJugador = document.getElementById("lista_actividades_usuario");

    refActividades.on('value', function (snapshot) {
      if (snapshot.numChildren() > 0) {
        listaActividadesJugador.innerHTML = "";
      } else {
        listaActividadesJugador.innerHTML = "<li>No tiene actividades registradas aún</li>";
      }
      snapshot.forEach(function (childSnapshot) {
        let value = childSnapshot.val();
        let propietario = value.propietario;
        if (propietario === identificador) {
          let nodoNuevaActividad = document.createElement("li");
          let nodoFecha = document.createElement("span");
          let nodoDescripcion = document.createElement("span");
          let nodoValor = document.createElement("span");
          nodoFecha.innerText = value.fecha + " / ";
          nodoDescripcion.innerText = value.descripcionMotivo + " / ";
          let accion = "*";
          switch (value.AccionDeCambio) {
            case "REMOVE":
              accion = "-";
              break;
            case "ADD":
              accion = "+";
              break;
          }
          // TODO STYLE TEXT FOR BETTER READING AND FEEDBACK GOOD/BAD
          nodoValor.innerText = accion + "" + value.cantidadCambio + " " + value.objetoDeCambio + "";
          nodoNuevaActividad.appendChild(nodoFecha);
          nodoNuevaActividad.appendChild(nodoDescripcion);
          nodoNuevaActividad.appendChild(nodoValor);
          listaActividadesJugador.appendChild(nodoNuevaActividad);
        }
      });
    });

    let refLogros = firebase.database().ref('logros');
    let listaInsigniasJugador = document.getElementById("lista_insignias_usuario");
   
    refLogros.on('value', function (snapshot) {
      let algunaInsignia = false;
      if (snapshot.numChildren() > 0) {
        listaInsigniasJugador.innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
          let value = childSnapshot.val();
          let propietario = value.id;
          let nodoNuevaActividad = document.createElement("li");
          let nodoSesion = document.createElement("span");
          let nodoTitulo = document.createElement("span");
          if (propietario === identificador) {
            nodoSesion.innerText = value.sesion + " > ";
            nodoTitulo.innerText = value.titulo + " :) (Logro) ";

            let nodoIcono = document.createElement("img");
            nodoIcono.src = "assets/medalla_icon_50.png";
            
            nodoNuevaActividad.appendChild(nodoSesion);
            nodoNuevaActividad.appendChild(nodoTitulo);
            nodoNuevaActividad.appendChild(nodoIcono);                        
            
            listaInsigniasJugador.appendChild(nodoNuevaActividad);

            algunaInsignia = true;
          }
        });
        if(algunaInsignia == false){
          listaInsigniasJugador.innerHTML = "<li>No tiene insignias registradas aún</li>";
        }
      }      
    });
  }
});