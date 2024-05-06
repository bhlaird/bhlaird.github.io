  function UpdateCanvas(target_date, target_div) {
 
    var days, hours, weeks;
 
    var $days = $(target_div + ' .days'),
      $hours = $(target_div + ' .hours'),
        $weeks = $(target_div + ' .weeks');

    
    var center = 200,
      $canvas = $(target_div + ' .timer')[0],
      ctx = $canvas.getContext("2d"),
      weekSetup = {
        radie: 170,
        lineWidth: 50,
        back: 48,
        color: "#E29578",
        counter: 0,
        old: 0
      },
      daySetup = {
        radie: 110,
        lineWidth: 50,
        back: 48,
        color: "#FFDDD2 ",
        counter: 0,
        old: 0
      },
      hourSetup = {
        radie: 50,
        lineWidth: 50,
        back: 48,
        color: "#EDF6F9 ",
        counter: 0,
        old: 0
      },
      check = function (count, setup, ctx) {
        if (count < setup.old) {
          setup.counter++;
        }
        draw(setup.radie, setup.color, setup.lineWidth, count, ctx);
      },
      draw = function (radie, color, lineWidth, count, ctx) {
        ctx.beginPath();
        ctx.arc(center, center, radie, 0, count * Math.PI, false);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
      };

    $canvas.width = $canvas.width;

    ctx.beginPath();
    ctx.arc(center, center, 50, 0, 2 * Math.PI, false);
    ctx.lineWidth = 30;
    ctx.fillStyle = "#006D77";
    ctx.fill();

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    weeks = parseInt(days/7);
    days = days%7;

    $days.text(days);
    $hours.text(hours);
    $weeks.text(weeks);

    var dayCount = (2 / 7) * days,
        hourCount = (2 / 24) * hours,
        weekCount = (2 / 52) * weeks;

    check(weekCount, weekSetup, ctx);
    check(hourCount, hourSetup, ctx);
    check(dayCount, daySetup, ctx);

    hourSetup.old = hourCount - 0.01;
    daySetup.old = dayCount - 0.01;
  }
  
