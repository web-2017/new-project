const $ = require('jquery');
import primary from './primary';
import { setTimeout } from 'timers';
primary();

// Preloader
$(document).ready(function () {
  let theme = $("body").attr("data-theme");
  let needForm = $("body").attr("data-needForm");
  let needCounter = $("body").attr("data-needCounter");
  if (theme != "") {
    $(".wrapper_page-coming").css("backgroundImage", "url('/img/bg/bg_" + theme + ".png')");
    $("button").removeClass("bg_1").addClass("bg_" + theme);
  }
  if (needCounter == "0") {
    $(".counter").hide();
  }
  if (needForm == "0") {
    $(".feedback_form").hide();
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