/*Correcao rezise do burger menu */
$(window).on('resize', function () {
  if (window.innerWidth > 768) {
	$('.grouped-menu').removeClass('in');
  }
});

$(document).ready(function() {
	relogio();
});

function relogio() {
	var dataAtual = new Date().toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1");
	$("#relogio").text(dataAtual);
	var umSegundoEmMilisegundos = 1000;
	setTimeout("relogio()", umSegundoEmMilisegundos);
}