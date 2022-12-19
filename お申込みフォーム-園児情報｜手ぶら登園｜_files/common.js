function disableSubmitInputs() {
  let $submitInputs = $("input[type='submit'], button[type='submit']");

  for (let i = 0; i < arguments.length; i++) {
    $submitInputs = $submitInputs.add(arguments[i]);
  };

  $submitInputs.prop("disabled", true);
}
$(function() {

  // full pageの場合は高さを取得してheader,footer,コンテンツ量を引いて代入する
  // *windowの高さを定義
  var wH = $(window).height();
  // *クラス.fullがついてるコンテンツの高さを定義
  var fH = $('.full').outerHeight();
  // *「windowの高さ」-「.fullの高さ」-「headerの高さ」-「footerの高さ」+4px(borderの合計)
  var height = wH - fH - 112; //PC用 hd:77 + ft:35 前の値：115
  // *スマホも同じ計算式
  var heightSP = wH - fH - 94;　//SP用 hd:58 + ff:36 = 94
  // *windowの横幅を定義(レスポンシブ用)
  var wW = $(window).width();
  // *スマホ用に切り替えるための横幅を定義
  var spW = 751;

  // *クラス.fullがついていれば
  if($('.full').length) {
    // *かつスマホの場合
    if(spW >= wW) {
      // *.fix_bnrと.fix_bnr02を固定させる
      $('.fix_bnr, .fix_bnr02').addClass('fixed');
    }
    // *クラス.fullがついていて、かつクラス.mypageもついていたら(ログインしてるとき)
    if($('.mypage').length) {
      // *かつクラス.fix_bnr02(固定バナー)がある場合
      if($('.fix_bnr02').length) {
        if(spW >= wW) { // スマホなら(固定フッターのバナーがある場合)
          $('.full').css('padding-bottom', heightSP - 130 + 'px'); // heightSPの数値を使用
        } else { // PCなら
          $('.full').css('padding-bottom', height - 130 + 'px'); // heightの数値を使用
        }
        // *クラス.fix_bnr02(固定バナー)がない場合
      } else {
        if(spW >= wW) { // スマホなら(固定フッターのバナーがない場合)
          $('.full').css('padding-bottom', heightSP + 'px'); // heightSPの数値を使用
          $('footer').css('margin-bottom', 0); // 固定フッターのバナーはSPだけなので固定フッターがない場合はSPのみその分のmarginをなくす
        } else { // PCなら
          $('.full').css('padding-bottom', height + 'px'); // heightの数値を使用
        }
      }
      // *クラス.full2がある場合
      if($('.full2').length) {
        $('.full').css('padding-bottom', height + 'px');
      }
      // *クラス.fullがついていて、クラス.mypageはついていなかったら(ログインしていないとき)
    } else {
      //ログインしてなかったら
      if(spW >= wW) {
        // *スマホなら
        $('.full').css('padding-bottom', heightSP + 'px');
        $('.fix_bnr, .fix_bnr02').css('bottom', '0');
      } else {
        // *PCなら
        $('.full').css('padding-bottom', height + 'px');
      }
    }
    // *クラス.fullがついていない場合
  } else {
    if(spW >= wW) {
      // *スマホなら
      if(!$('.fix_bnr02').length) {
        $('footer').css('margin-bottom', 0);
      }
    }
  }

  $(window).on('scroll', function() {
    var doch = $(document).innerHeight(); //ページ全体の高さ
    var winh = $(window).innerHeight(); //ウィンドウの高さ
    var bottom = doch - winh; //ページ全体の高さ - ウィンドウの高さ = ページの最下部位置
    if (bottom <= $(window).scrollTop()) {
      //一番下までスクロールした時に実行
      $('.fix_bnr02').removeClass('hide');
    }
    if($(window).scrollTop() > 150) {
      $('.fix_bnr, .fix_bnr02').addClass('fixed');
    } else {
      var wW = $(window).width();
      var spW = 751;
      if($('.full').length) {
        if(spW >= wW) {
          $('.fix_bnr, .fix_bnr02').addClass('fixed');
        } else {
          $('.fix_bnr, .fix_bnr02').removeClass('fixed');
        }
      }
    }
  });
  $('.btn ul li.new').on('click', function() {
    $(this).addClass('on');
    $('.btn ul li.contactB').removeClass('on');
  });
  $('.btn ul li.contactB').on('click', function() {
    $(this).addClass('on');
    $('.btn ul li.new').removeClass('on');
  });
  $('.closeBtn').on('click', function() {
    $('.contact').hide();
    $('body').removeClass('con');
  });
  $('.openBtn').on('click', function() {
    $(this).closest('.fix_bnr02').toggleClass('hide');
  });
  $('tr.request th b').css('display', 'none');
  $('input[name="reque"]').on('change', function() {
    var request = $('#reque').is(':checked');
    if(request) {
      $('tr.request th b').css('display', 'block');
      $('tr.request td input, tr.request td select').prop('required', true);
      $(this).prop('required', true);
    } else {
      $('tr.request th b').css('display', 'none');
      $('tr.request td input, tr.request td select').prop('required', false);
      $(this).prop('required', false);
    }
  });
});
function togglePasswordMask($password, $togglePasswordMask, classForShow, classForHide) {
  if ($password.prop("type") === "password") {
      $password.prop("type", "text");
      $togglePasswordMask.removeClass(classForShow);
      $togglePasswordMask.addClass(classForHide);
  } else {
      $password.prop("type", "password");
      $togglePasswordMask.removeClass(classForHide);
      $togglePasswordMask.addClass(classForShow);
  }
}
window.addEventListener('load', function () {
    document.querySelectorAll('.shutto-options li').forEach(elm => {
        elm.onclick = function () {
            document.getElementById('js-shutto').innerHTML = elm.innerHTML;
        };
    });
    document.getElementById('js-shutto').onclick = function () {
        event.stopPropagation();
        let elm = document.querySelector('.shutto-select');
        if (elm.style.display == 'block') {
            elm.style.display = '';
        } else {
            elm.style.display = 'block';
        }
    };
    document.addEventListener('click', function () {
        document.querySelector('.shutto-select').style.display = 'none';
    });
});
