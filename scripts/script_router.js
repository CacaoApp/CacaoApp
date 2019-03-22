window.addEventListener('load',function() {
  let url = new URL(window.location.href);
  let identificador = url.searchParams.get("cid");
  if (identificador === null) {
    console.log("SIMPLE URL");
  } else {
      location.href = "/jugador.html?cid=" + identificador;
  }
});
