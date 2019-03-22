var config = {
    apiKey: "AIzaSyDj1Ao1CQpZa0t5UO2V1LhgCM6kqE1xPcA",
    authDomain: "cacaoapp-f9f17.firebaseapp.com",
    databaseURL: "https://cacaoapp-f9f17.firebaseio.com",
    storageBucket: "cacaoapp-f9f17.appspot.com",
    messagingSenderId: "390201177541"
};
firebase.initializeApp(config);

var cacaosCoate = 0;
var cacaosHuitzilin = 0;
var cacaosMazate = 0;
var cacaosMichin = 0;
var refEquipos = firebase.database().ref('grupos');
refEquipos.on('value', function (snapshot) {    
    snapshot.forEach(function (childSnapshot) {        
        let value = childSnapshot.val();        
        if (value.nombre === "Coate") {            
            cacaosCoate = value.cantidadCacaos;            
            updateValuesForCacao("Coate");
        }
        if (value.nombre === "Michin") {
            cacaosMichin = value.cantidadCacaos;
            updateValuesForCacao("Michin");
        }
        if (value.nombre === "Huitzilin") {
            cacaosHuitzilin = value.cantidadCacaos;
            updateValuesForCacao("Huitzilin");
        }
        if (value.nombre === "Mazate") {
            cacaosMazate = value.cantidadCacaos;
            updateValuesForCacao("Mazate");
        }
    });    
});

function updateValuesForCacao(teamToUpdate){
    let cacaoContainer;
    switch(teamToUpdate){
        case "Coate":
            cacaoContainer = document.getElementById("contenedor_cacaos_equipo_1_span");
            cacaoContainer.innerText = cacaosCoate;
        break;               
        case "Huitzilin":
            cacaoContainer = document.getElementById("contenedor_cacaos_equipo_2_span");
            cacaoContainer.innerText = cacaosHuitzilin;
        break;
        case "Mazate":
            cacaoContainer = document.getElementById("contenedor_cacaos_equipo_3_span");
            cacaoContainer.innerText = cacaosMazate;
        break;
        case "Michin":
            cacaoContainer = document.getElementById("contenedor_cacaos_equipo_4_span");
            cacaoContainer.innerText = cacaosMichin;
        break;
    }
}

var estudiantesMazate = [];
var estudiantesCoate = [];
var estudiantesMichin = [];
var estudiantesHuitzilin = [];

var refEstudiantes = firebase.database().ref('estudiantes');
refEstudiantes.once('value', function (snapshot) {
    estudiantesCoate.length = 0;
    estudiantesMazate.length = 0;
    estudiantesMichin.length = 0;
    estudiantesHuitzilin.length = 0;
    snapshot.forEach(function (childSnapshot) {        
        let value = childSnapshot.val();        
        if (value.grupo === "Coate") {                        
            estudiantesCoate.push(value);
        }
        if (value.grupo === "Michin") {
            estudiantesMichin.push(value);
        }
        if (value.grupo === "Huitzilin") {
            estudiantesHuitzilin.push(value);
        }
        if (value.grupo === "Mazate") {
            estudiantesMazate.push(value);
        }
    });
    updateLists();    
});

function updateLists(){
    let ulForTeam1 = document.getElementById("lista_integrantes_equipo_1");
    estudiantesCoate.forEach(function (childSnapshot) {
        let nodeLinkToStudent = document.createElement("a");
        nodeLinkToStudent.href = "/jugador.html?cid="+childSnapshot.id;
        let nodeNewStudent = document.createElement("li"); 
        nodeNewStudent.className = "list-group-item text-light ca-bg-color-lime border-0";
        nodeNewStudent.innerText = childSnapshot.nombres +" "+ childSnapshot.apellidos;
        nodeLinkToStudent.appendChild(nodeNewStudent);
        ulForTeam1.appendChild(nodeLinkToStudent);
    });

    let ulForTeam2 = document.getElementById("lista_integrantes_equipo_2");
    estudiantesHuitzilin.forEach(function (childSnapshot) {     
        let nodeLinkToStudent = document.createElement("a");
        nodeLinkToStudent.href = "/jugador.html?cid="+childSnapshot.id;  
        let nodeNewStudent = document.createElement("li"); 
        nodeNewStudent.className = "list-group-item text-light ca-bg-color-lime border-0";
        nodeNewStudent.innerText = childSnapshot.nombres +" "+ childSnapshot.apellidos;        
        nodeLinkToStudent.appendChild(nodeNewStudent);
        ulForTeam2.appendChild(nodeLinkToStudent);
    });

    let ulForTeam3 = document.getElementById("lista_integrantes_equipo_3");
    estudiantesMazate.forEach(function (childSnapshot) {   
        let nodeLinkToStudent = document.createElement("a");
        nodeLinkToStudent.href = "/jugador.html?cid="+childSnapshot.id;     
        let nodeNewStudent = document.createElement("li"); 
        nodeNewStudent.className = "list-group-item text-light ca-bg-color-lime border-0";
        nodeNewStudent.innerText = childSnapshot.nombres +" "+ childSnapshot.apellidos;
        nodeLinkToStudent.appendChild(nodeNewStudent);
        ulForTeam3.appendChild(nodeLinkToStudent);
    });

    let ulForTeam4 = document.getElementById("lista_integrantes_equipo_4");
    estudiantesMichin.forEach(function (childSnapshot) {    
        let nodeLinkToStudent = document.createElement("a");
        nodeLinkToStudent.href = "/jugador.html?cid="+childSnapshot.id;    
        let nodeNewStudent = document.createElement("li"); 
        nodeNewStudent.className = "list-group-item text-light ca-bg-color-lime border-0";
        nodeNewStudent.innerText = childSnapshot.nombres +" "+ childSnapshot.apellidos;
        nodeLinkToStudent.appendChild(nodeNewStudent);
        ulForTeam4.appendChild(nodeLinkToStudent);
    });

}
