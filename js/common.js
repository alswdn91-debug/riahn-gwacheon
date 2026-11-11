// 리안헤어 과천정부청사역점 - 공통 스크립트

// 모바일 햄버거 메뉴
(function(){
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mobileNav');
  if(!btn || !nav) return;
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
  });
})();

// 히어로 배경 영상: 화면에 보일 때만 재생 (모바일 데이터 절약)
(function(){
  var video = document.getElementById('heroVideo');
  if(!video) return;
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          video.play().catch(function(){});
        }else{
          video.pause();
        }
      });
    }, {threshold: 0.15});
    io.observe(video);
  }else{
    video.play().catch(function(){});
  }
})();

// 디자이너 시술 사진: ‹ › 버튼으로 넘기기 (2026-11-11 추가 · 본사 규칙 7절 예외, 원장 요청)
(function(){
  document.querySelectorAll('.pf').forEach(function(pf){
    var row = pf.querySelector('.pf-row');
    if(!row) return;
    var prev = pf.querySelector('[data-pf-move="-1"]');
    var next = pf.querySelector('[data-pf-move="1"]');
    function update(){
      var max = row.scrollWidth - row.clientWidth;
      pf.classList.toggle('no-scroll', max <= 2);
      if(prev) prev.disabled = row.scrollLeft <= 2;
      if(next) next.disabled = row.scrollLeft >= max - 2;
    }
    pf.querySelectorAll('[data-pf-move]').forEach(function(b){
      b.addEventListener('click', function(){
        row.scrollBy({left: row.clientWidth * parseInt(b.getAttribute('data-pf-move'), 10), behavior: 'smooth'});
      });
    });
    // 사진을 눌러 펼치면 그 사진이 보이도록 위치 맞춤
    pf.querySelectorAll('details').forEach(function(d){
      d.addEventListener('toggle', function(){
        var li = d.closest('li');
        if(d.open && li) row.scrollTo({left: li.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft});
        update();
      });
    });
    row.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    update();
  });
})();
