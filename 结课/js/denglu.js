

$(function(){
    $('.head-info label').mouseover(function () {
        var index=$(this).index();
        $(this).addClass('bgcolor').siblings().removeClass('bgcolor');
        $('.subnav').css('margin-top',-282*index+'px');
    })











})