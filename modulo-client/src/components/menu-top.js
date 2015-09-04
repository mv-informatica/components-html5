/*
 * Copyright 2015 MV Informática.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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