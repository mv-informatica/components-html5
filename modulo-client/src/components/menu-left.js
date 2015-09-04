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

var $left = $("#left");
var lastWidth = $left.css('width');

$(document).ready(function() {
	activeOptionMenu();
});

/*Monitors side menu to hide the gray border*/
$('nav').on('click','#menu-toggle', function () {
    var body = $('body');
    var rightSide = $('.right-side');
    if(!body.hasClass('sidebar-left-hidden')) {
    	body.addClass('sidebar-left-hidden');
    	rightSide.removeClass('border-left');
    } else {
    	body.removeClass('sidebar-left-hidden');
    	rightSide.addClass('border-left');
    }
    checkForChanges();
});

function checkForChanges() {
	$('table').bootstrapTable('resetView');	
    setTimeout(checkForChanges, 500);
}

function activeOptionMenu() {
	var controller = window.location.pathname.split('/')[2];
	var actionLi = $("li[data-controller='"+controller+"']");
	var groupActionUL = actionLi.parent();
	var menuOption = groupActionUL.parent();
	if(controller !== "") {
		groupActionUL.addClass('in');
		groupActionUL.attr('aria-expanded',true);
		menuOption.addClass('active');
		actionLi.addClass('active');
	}
}