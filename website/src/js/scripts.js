const $ = require('jquery');
import primary from './primary';
primary();
// Preloader
$(document).ready(function () {
  $(window).on('load', function () {
    setTimeout(function () {
      $('#preloader').fadeOut('slow', function () {});
    }, 2000);

  }); 
});