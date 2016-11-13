// Toggle Navigation ============================================================
// http://codepen.io/bradfrost/pen/sHvaz
const $ = require("jquery");

$(document).ready(function () {
  $('body').addClass('js');
  var $menu = $('#navigation-toggle'),
    $menulink = $('.navigation-link');

  $menulink.click(function () {
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
    return false;
  });
});
