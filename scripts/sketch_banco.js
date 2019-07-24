window.addEventListener('load', function () {

  let nameTeamDiv01 = document.getElementById("bank-team-01");
  let nameTeamMoneyDiv01 = document.getElementById("bank-team-money-01");
  let nameTeamDiv02 = document.getElementById("bank-team-02");
  let nameTeamMoneyDiv02 = document.getElementById("bank-team-money-02");
  let nameTeamDiv03 = document.getElementById("bank-team-03");
  let nameTeamMoneyDiv03 = document.getElementById("bank-team-money-03");
  console.log(nameTeamDiv01);

  nameTeamDiv01.innerText = "Huitzilin";
  nameTeamDiv02.innerText = "Mazate";
  nameTeamDiv03.innerText = "Michin";

  var config = {
    apiKey: "AIzaSyDj1Ao1CQpZa0t5UO2V1LhgCM6kqE1xPcA",
    authDomain: "cacaoapp-f9f17.firebaseapp.com",
    databaseURL: "https://cacaoapp-f9f17.firebaseio.com",
    storageBucket: "cacaoapp-f9f17.appspot.com",
    messagingSenderId: "390201177541"
  };
  firebase.initializeApp(config);

  updateFromFirebase();

  function updateFromFirebase() {

    let refGruposHuitzilin = firebase.database().ref('grupos/Huitzilin/cantidadCacaos');
    refGruposHuitzilin.on('value', function (snapshot) {
      puntosHuitzilin = snapshot.val();
      nameTeamMoneyDiv01.innerText = "$" + puntosHuitzilin;
    });

    let refGruposMazate = firebase.database().ref('grupos/Mazate/cantidadCacaos');
    refGruposMazate.on('value', function (snapshot) {
      puntosMazate = snapshot.val();
      nameTeamMoneyDiv02.innerText = "$" + puntosMazate;
    });

    let refGruposMichin = firebase.database().ref('grupos/Michin/cantidadCacaos');
    refGruposMichin.on('value', function (snapshot) {
      puntosMichin = snapshot.val();
      nameTeamMoneyDiv03.innerText = "$" + puntosMichin;
    });
  
  }
});