(function(){
  'use strict';

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var starttime;
  var timeLeftToBreathe;
  var timeLeftToExhale;
  var timeLeftToRest;
  var timeToBreathe = 3 * 1000;
  var timeToExhale = 7 * 1000;
  var timeToRest = 15 * 1000;
  var timerId;
  var circle = document.getElementById('circle');
  var style = circle.style;
  var setCount = 1;　//何セット目
  var count = 1; //何回目
  var isRunning = false;
  $("#count").text(setCount+'セット目  '+count+'回目');

  function updateTimer(t){
    var d = new Date(t);
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-2);
    timer.textContent = s + '.' + ms;
  }

  //初期値としてtimeToBreatheを代入
  updateTimer(timeToBreathe);


  //3秒のカウントダウン関数
  function countDownToBreathe(){
    $("#comment").text('吸って');
    circle.className = 'breathe';
    timerId = setTimeout(function(){
      var elapsedTime = Date.now() - starttime;
      timeLeftToBreathe = timeToBreathe - elapsedTime;
      if (timeLeftToBreathe < 0){
        clearTimeout(timerId);
        starttime = Date.now();
        countDownToExhale();
        return;
      }
      updateTimer(timeLeftToBreathe);
      style.transform = 'scale(0.75,0.75)';
      style.background = '#FB8403';
      countDownToBreathe();
    }, 10);
  }


  //7秒のカウントダウン関数
  //7秒終了後、＃countの文言を変化させるため、setCount,count数を変化）
  function countDownToExhale(){
    $("#comment").text('吐く！！！！');
    circle.className = 'exhale';
    timerId = setTimeout(function(){
      var elapsedTime = Date.now() - starttime;
      timeLeftToExhale = timeToExhale - elapsedTime;
      if (timeLeftToExhale < 0){
        clearTimeout(timerId);
        count++;
        if (setCount == 3 && count == 7){
          countDownFinish();
          timeLeftToExhale = 0;
          updateTimer(timeLeftToExhale);
          return;
        }
        else if (count == 7){
          clearTimeout(timerId);
          starttime = Date.now();
          count = 1;
          setCount++;
          countDownToRest();
          return;
        }
        $("#count").text(setCount+'セット目  '+count+'回目');
        starttime = Date.now();
        countDownToBreathe();
        return;
      }
      updateTimer(timeLeftToExhale);
      style.transform = 'scale(3.7,3.7)';
      style.background = 'rgba(241, 39, 27, 0.78)';
      countDownToExhale();
    }, 10);
  }




  //15秒のカウントダウン関数
  function countDownToRest(){
    $("#comment").text('休憩');
    circle.className = 'breathe';
    timerId = setTimeout(function(){
      var elapsedTime = Date.now() - starttime;
      timeLeftToRest = timeToRest - elapsedTime;

      if (setCount==3) {
        $("#count").text('次はラストセット！最後まで頑張りましょう。');
      }else {
        $("#count").text('次は'+setCount+'セット目です。最後まで頑張りましょう。');
      }


      if (timeLeftToRest < 0){
        clearTimeout(timerId);
        $("#count").text(setCount+'セット目  '+count+'回目');
        starttime = Date.now();
        countDownToBreathe();
        return;
      }
      updateTimer(timeLeftToRest);
      style.transform = 'scale(1,1)';
      style.background = '#FB8403';
      countDownToRest();
    }, 10);
  }

  //すべて終了時の関数
  function countDownFinish(){
    isRunning = false;
    start.textContent = 'START';
    $("#comment").text('終了');
    circle.className = 'breathe';
    $("#count").text('お疲れ様でした。また明日も頑張りましょう');
    style.transform = 'scale(1,1)';
    style.background = '#FB8403';
  }

  //ボタンクリック時のイベント
  $("#start").on('click',function(){
      $("#start").fadeOut(5);
      starttime = Date.now();
      countDownToBreathe();
    });
})();
