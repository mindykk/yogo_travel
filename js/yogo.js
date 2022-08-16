(($)=>{
  class Yogo {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();
      this.section10();
      this.youtubeModal();
      this.quick();
      this.goTop();
      this.footer();
    }
    header(){
      let t=false;
      let t2=false;

      let upDown='';
      let newTop=$(window).scrollTop();
      let oldTop=newTop;

      $('.mobile-btn').on({
        click:function(){
          $(this).toggleClass('on');
          $('#nav').stop().slideToggle(300);
        }
      });

      $('.sub').stop().slideUp(0);

      $(window).resize(function(){
        resizeNav();
      });

      function resizeNav(){
        if($(window).width()<=1060){
          $('.mobile-btn').removeClass('on');
          $('#nav').stop().hide();
          t2=false;
          if(t===false){
            t=true;
            $('.sub').stop().fadeOut(0);
            $('.main-btn').off('mouseenter');
            $('.main-btn').bind({
              click:function(e){
                $(this).next().stop().slideToggle(300);
              }
            });
          }
        }
        else {
          $('.mobile-btn').removeClass('on');
          $('#nav').stop().show();

          t=false;
          if(t2===false){
            t2=true;
            $('.main-btn').off('click');
            $('.main-btn').on('mouseenter');
            $('.sub').stop().slideUp(0);
          }

          $('.main-btn').on({
            mouseenter:function(){
              $('.sub').fadeOut(0);
              $(this).next().fadeIn(300);
            },
            focusin:function(){
              $('.sub').fadeOut(0);
              $(this).next().fadeIn(300);
            }
          });

          $('#nav').on({
            mouseleave:function(){
              $('.sub').fadeOut(300);
            }
          });

          $('.sub-btn').on({
            mouseenter:function(){
              $('.sub-sub').fadeOut(0);
              $(this).next().fadeIn(300);
            },
            focusin:function(){
              $('.sub-sub').fadeOut(0);
              $(this).next().fadeIn(300);
            }
          });

          $('.col24').on({
            mouseleave:function(){
              $('.sub-sub').fadeOut(300);
            }
          });
        }
      }
      resizeNav();


      //모달창
      $('.close-btn').on({
        click:function(){
          $('#modal').hide();
        }
      });

      $('.menu-bar-box').on({
        click:function(){
          $('#modal').fadeIn(300);
        }
      });

      $(window).scroll(function(){
        newTop=$(window).scrollTop();

        upDown=oldTop-newTop>0?'UP':'DOWN';

        if(upDown==='UP'){
          $('#header').removeClass('hide');
          $('#header').addClass('show');
        }
        if(upDown==='DOWN'){
          $('#header').removeClass('show');
          $('#header').addClass('hide');
        }
        if($(window).scrollTop()===0){
          $('#header').removeClass('show');
        }

        oldTop=newTop;
      });

    }
    section1(){
      let cnt=0;
      let setId=0;
      let setId2=0;

      let touchStart=null;
      let touchEnd=null;
      let result='';
      let dragStart=null;
      let dragEnd=null;
      let mouseDown=false;

      let winW=$(window).width();

      $(window).resize(function(){
        winW=$(window).width();
        mainSlide();
        return winW;
      });

      //1.메인슬라이드 함수
      function mainSlide(){
        $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},600,function(){
          cnt>2?cnt=0:cnt;
          cnt<0?cnt=2:cnt;
          $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0);
        })
        pageBtn();
      }

      //2.다음카운트 함수
      function nextCount(){
        cnt++;
        mainSlide();
      }
      //2-1.이전카운트 함수
      function prevCount(){
        cnt--;
        mainSlide();
      }

      //3.자동카운터 함수
      function autoTimer(){
        setId=setInterval(nextCount,3000);
      }
      autoTimer();

      //페이지 버튼 클릭 함수
      function pageBtn(){
        $('#section1 .page-btn').removeClass('on');
        $('#section1 .page-btn').eq(cnt>2?0:cnt).addClass('on');
      };

      //페이지 버튼 클릭 이벤트
      $('#section1 .page-btn').each(function(idx){
        $(this).click(function(e){
          e.preventDefault();
          pausefn();
          cnt=idx;
          mainSlide();
        })
      });

      //정지
      function pausefn(){
        clearInterval(setId);
        clearInterval(setId2);

        let cnt2=0;

        setId2=setInterval(function(){
          cnt2++;
          if(cnt2>5){
            clearInterval(setId2);
            autoTimer();
          }
        },1000);
      }

      $('#section1 .slide-container').on({
        mousedown:function(e){
          clearInterval(setId);
          pausefn();
          touchStart=e.clientX;
          //drag
          dragStart=e.clientX-$('#section1 .slide-wrap').offset().left-winW;
          mouseDown=true;
        },
        mouseup:function(e){
          touchEnd=e.clientX;
          result=touchStart-touchEnd>0?'NEXT':'PREV';
          if(Math.abs(touchStart-touchEnd)>1){ //터치 길이가 적어도 50px 이상이면 다음,이전 슬라이드
            if(result==='NEXT'){
              if(!$('#section1 .slide-wrap').is(':animated')){
                nextCount();
              }
            }
            if(result==='PREV'){
              if(!$('#section1 .slide-wrap').is(':animated')){
                prevCount();
              }
            }
          }
          mouseDown=false;
        },
        mouseleave:function(e){
          if(!mouseDown) return;
          touchEnd=e.clientX;
          result=touchStart-touchEnd>0?'NEXT':'PREV';
          if(result==='NEXT'){
            if(!$('#section1 .slide-wrap').is(':animated')){
              nextCount();
            }
          }
          if(result==='PREV'){
            if(!$('#section1 .slide-wrap').is(':animated')){
              prevCount();
            }
          }
          mouseDown=false;
        },
        mousemove:function(e){
          if(!mouseDown) return;
          dragEnd=e.clientX;
          $('#section1 .slide-wrap').css({left:dragEnd-dragStart});
        }
      });

      //모바일
      $('#section1 .slide-container').on({
        touchstart:function(e){
          pausefn();
          touchStart=e.originalEvent.changedTouches[0].clientX;
          //drag
          dragStart=e.originalEvent.changedTouches[0].clientX-$('#section1 .slide-wrap').offset().left-winW;
          mouseDown=true;
        },
        touchend:function(e){
          touchEnd=e.originalEvent.changedTouches[0].clientX;
          result=touchStart-touchEnd>0?'NEXT':'PREV';
          if(Math.abs(touchStart-touchEnd)>1){
            if(result==='NEXT'){
              if(!$('#section1 .slide-wrap').is(':animated')){
                nextCount();
              }
            }
            if(result==='PREV'){
              if(!$('#section1 .slide-wrap').is(':animated')){
                prevCount();
              }
            }
          }
          mouseDown=false;
        },
        touchmove:function(e){
          if(!mouseDown) return;
          dragEnd=e.originalEvent.changedTouches[0].clientX;
          $('#section1 .slide-wrap').css({left:dragEnd-dragStart});
        }
      });
    }
    section2(){
      let sec2Top=$('#section2').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section2').removeClass('sec2Ani');
        }
        if($(window).scrollTop()>sec2Top){
          $('#section2').addClass('sec2Ani');
        }
      });
    }
    section3(){
      let sec3Top=$('#section3').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section3').removeClass('sec3Ani');
        }
        if($(window).scrollTop()>sec3Top){
          $('#section3').addClass('sec3Ani');
        }
      });
    }
    section4(){
      let sec4Top=$('#section4').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section4').removeClass('sec4Ani');
        }
        if($(window).scrollTop()>sec4Top){
          $('#section4').addClass('sec4Ani');
        }
      });

      let step1=4650/1000;
      let step2=3790/1000;
      let step3=5580/1000;
      let step4=8580/1000;

      let sum1=0;
      let sum2=0;
      let sum3=0;
      let sum4=0;

      let cnt=0;
      let setId=0;

      function countfn(){
        cnt++;
        if(cnt>=1000){clearInterval(setId)}{
          sum1+=step1;
          $('.count-num').eq(0).html(Math.round(sum1));
          sum2+=step2;
          $('.count-num').eq(1).html(Math.round(sum2));
          sum3+=step3;
          $('.count-num').eq(2).html(Math.round(sum3));
          sum4+=step4;
          $('.count-num').eq(3).html(Math.round(sum4));
        }
      }
      setId=setInterval(countfn,10)
    }
    section5(){
      let sec5Top=$('#section5').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section5').removeClass('sec5Ani');
        }
        if($(window).scrollTop()>sec5Top){
          $('#section5').addClass('sec5Ani');
        }
      });
    }
    section6(){
      let sec6Top=$('#section6').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section6').removeClass('sec6Ani');
        }
        if($(window).scrollTop()>sec6Top){
          $('#section6').addClass('sec6Ani');
        }
      });
    }
    section7(){
      let sec7Top=$('#section7').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section7').removeClass('sec7Ani');
        }
        if($(window).scrollTop()>sec7Top){
          $('#section7').addClass('sec7Ani');
        }
      });
    }
    section8(){
      let sec8Top=$('#section8').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section8').removeClass('sec8Ani');
        }
        if($(window).scrollTop()>sec8Top){
          $('#section8').addClass('sec8Ani');
        }
      });
    }
    section9(){
      let sec9Top=$('#section9').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section9').removeClass('sec9Ani');
        }
        if($(window).scrollTop()>sec9Top){
          $('#section9').addClass('sec9Ani');
        }
      });

      let cnt2=0;
      let touchStart=null;
      let touchEnd=null;
      let result='';
      let dragStart=null;
      let dragEnd=null;
      let mouseDown=false;
      let winW=$('#section9 .slide-wrap').width();

      function sec9Slide(){
        $('#section9 .slide-wrap').stop().animate({right:`${100*cnt2}%`},600,function(){
          $('#section9 .slide-wrap').stop().animate({right:`${100*cnt2}%`},0);
        })
        pageBtn();
      };

      function nextSlide(){
        cnt2++;
        sec9Slide();
      };

      function prevSlide(){
        cnt2--;
        sec9Slide();
      };

      $('#section9 .slide-container').on({
        mousedown:function(e){
          touchStart=e.clientX;
          //drag
          dragStart=e.clientX-$('#section9 .slide-wrap').offset().right-winW;
          mouseDown=true;
        },
        mouseup:function(e){
          touchEnd=e.clientX;
          result=touchStart-touchEnd>0?'NEXT':'PREV';
          if(result==='NEXT'){
            if(!$('#section9 .slide-wrap').is(':animated')){
              nextSlide();
            }
          }
          if(result==='PREV'){
            if(!$('#section9 .slide-wrap').is(':animated')){
              prevSlide();
            }
          }
          //드래그 앤 드롭 끝
          mouseDown=false;
        },
        mouseleave:function(e){
          if(!mouseDown) return;
          touchEnd=e.clientX;
          result=touchStart-touchEnd>0?'NEXT':'PREV';
          if(result==='NEXT'){
            if(!$('#section9 .slide-wrap').is(':animated')){
              nextSlide();
            }
          }
          if(result==='PREV'){
            if(!$('#section9 .slide-wrap').is(':animated')){
              prevSlide();
            }
          }
          //드래그 앤 드롭 끝
          mouseDown=false;
        },
        mousemove:function(e){
          if(!mouseDown) return;
          dragEnd=e.clientX;
          $('#section9 .slide-wrap').css({right:dragEnd-dragStart});
        }
      });

      //페이지 버튼 클릭 함수
      function pageBtn(){
        $('#section9 .page-btn2').removeClass('on2');
        $('#section9 .page-btn2').eq(cnt2>1?0:cnt2).addClass('on2');
      };

      //페이지 버튼 클릭 이벤트
      $('#section9 .page-btn2').each(function(idx){
        $(this).click(function(e){
          e.preventDefault();
          cnt2=idx;
          sec9Slide();
        })
      });
    }
    section10(){
      let sec10Top=$('#section10').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section10').removeClass('sec10Ani');
        }
        if($(window).scrollTop()>sec10Top){
          $('#section10').addClass('sec10Ani');
        }
      });
    }
    youtubeModal(){
      $('.play-btn').on({
        click:function(e){
          e.preventDefault();
          $('#youtubeModal').fadeIn(300);
        }
      });

      $('.youtube-close-btn').on({
        click:function(e){
          e.preventDefault();
          $('#youtubeModal').fadeOut(0);
          $("iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        }
      });
    }
    quick(){
      let quickTop=($(window).height()-$('#quickbox').height())/2-100;

      $(window).scroll(function(){
        $('#quickbox').stop().animate({top:quickTop+$(window).scrollTop()},300);
      });
    }
    goTop(){
      $(window).scroll(function(){
        if($(window).scrollTop()>100){
          $('#goTop').stop().fadeIn(1000);
        }
        else {
          $('#goTop').stop().fadeOut(1000);
        }
      });

      $('.goTop-btn').on({
        click:function(){
          $('html,body').stop().animate({scrollTop:0},500);
        }
      });
    }
    footer(){
      $('.footerInsta').on({
        change:function(){
          window.open($(this).val());
        }
      });
    }
  }
  const newYogo=new Yogo();
  newYogo.init();
})(jQuery);