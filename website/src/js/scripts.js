const $ = require('jquery');
import primary from './primary';
import { setTimeout } from 'timers';
primary();

// Preloader
$(document).ready(function () {
  $(window).on('load', function () {
    setTimeout(function () {
      $('#preloader').fadeOut('slow', function () { });
    }, 2000);
  });

  $(".feedback_form").submit(function (e) {
    e.preventDefault();
    var frm = $(".feedback_form");
    var data = {};
    $.each(this, function (i, v) {
      var input = $(v);
      data[input.attr("name")] = input.val();
      delete data["undefined"];
    });
    $.ajax({
      contentType: "application/json; charset=utf-8",
      type: frm.attr("method"),
      url: frm.attr("action"),
      dataType: 'json',
      data: JSON.stringify(data),
      success: function (data) {
        $(".form-row").hide();
        $("h3.answer").text(data.message).show();
        setTimeout(function () {
          $("form").hide("slow");
        }, 1500);
      },
      error: function (data) {
        $(".form-row").hide();
        $("h3.answer").text(data.message).show();
        setTimeout(function () {
          $("h3.answer").text("").hide();
          $(".form-row").show();
        }, 1500);
      }
    });
  });

});