var url = new URL(window.location.href);
var identificador = url.searchParams.get("cid");
if (identificador === null) {
  console.log("SIMPLE URL");
} else {
    location.href = "/jugador.html?cid=" + identificador;
}