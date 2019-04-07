const $ = require('jquery');
import primary from './primary';
import { setTimeout } from 'timers';
primary();

// Preloader
$(document).ready(function () {
  let theme = $("body").attr("data-theme");
  if (theme != "") {
    $(".wrapper_page-coming").css("background", "url('/img/bg/bg_" + theme + ".png') center center no-repeat");
    $("button").removeClass("bg_1").addClass("bg_" + theme);
  }


  $(window).on('load', function () {
    setTimeout(function () {
      $('#preloader').fadeOut('slow', function () { });
    }, 2000);
  });

  $(".feedback_form").submit(function (e) {
    e.preventDefault();
    var frm = $(".feedback_form");
    var data = {};
    data["youDomain"] = $("body").attr("data-youDomain");
    data["whereToSend"] = $("body").attr("data-whereToSend");
    data["subjectForYou"] = $("body").attr("data-subjectForYou");
    data["name"] = frm.find('input[name="name"]').val();
    data["email"] = frm.find('input[name="email"]').val();

    $.ajax({
      //contentType: "application/json; charset=utf-8",
      type: frm.attr("method"),
      url: frm.attr("action"),
      dataType: "json",
      data: data,
      cache: false,
      success: function (data) {
        $(".form-row").hide();
        $("h3.answer").text(data.message).show();
        setTimeout(function () {
          $("form").hide("fast");
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