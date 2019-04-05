 // если нужен
 const $ = require('jquery');
 require('jquery-countdown');

 //!https://github.com/hilios/jQuery.countdown
 export default () => {
   $('#getting-started').countdown('2022/02/01', function (event) {
     $(this).html(event.strftime(timedownCount));
   });
 }

 const timedownCount = `
  <ul class="counter_ul row">
    <li class="counter_li col-5 col-md-2">
      <span class="counter_count animated infinite pulse delay-2s">%w</span>
      <span class="counter_sub">weeks</span>
    </li>
    <li class="counter_li col-5 col-md-2">
      <span class="counter_count animated infinite pulse delay-1s">%d</span>
      <span class="counter_sub">days</span>
    </li>
    <li class="counter_li col-5 col-md-2">
      <span class="counter_count animated infinite pulse delay-3s">%H</span>
      <span class="counter_sub">Hours</span>
    </li>
    <li class="counter_li col-5 col-md-2">
      <span class="counter_count animated infinite pulse delay-3s">%M</span>
      <span class="counter_sub">Minutes</span>
    </li>
    <li class="counter_li col-6 col-md-2 counter_li_mobile">
      <span class="counter_count animated infinite pulse delay-2s">%S</span>
      <span class="counter_sub">Seconds</span>
    </li>
  </ul>
`