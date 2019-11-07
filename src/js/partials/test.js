currentQuestion = 1;
countQuestions = 1;


$.getJSON('test.json', function(data) {
    countQuestions = data.test.length;
    $.each(data.test, function( index, value ) {
        var outHtml = '';
        outHtml+= '<div class="section"><div class="inner"><div class="quest">';

        outHtml+= '<div class="number">'+(index+1)+'&nbsp;&nbsp;|&nbsp;&nbsp;'+countQuestions+'</div>';

        outHtml+= '<div class="question">';
        outHtml+= '<div class="text">'+value.quest+'</div>';
        outHtml+= '<button>Узнать варианты</button>';
        outHtml+= '</div>';

        outHtml+= '<div class="answers">';
        outHtml+= '<div class="title">'+value.miniquest+'</div>';
        outHtml+= '<div class="list">';
        $.each(value.answers, function( index2, value2 ) {
            outHtml+= '<label>';
            outHtml+= '<input type="radio" name="q'+index+'" value="'+value2.value+'">';
            outHtml+= '<span>'+value2.text+'</span>';
            outHtml+= '</label>';
        });
        outHtml+= '</div>';
        outHtml+= '<button>Ответить</button>';
        outHtml+= '</div>';

        outHtml+= '</div></div></div>';

        $('#fullpage').append(outHtml);
    });

    $('#fullpage').append('<div class="section"><div class="inner"><div class="final"></div></div></div>');

    $.getJSON('results.json', function(results) {
        outHtml = '';
        outHtml+= '<div class="img-block"><img src="'+results.results[0].img+'" alt=""></div>';
        outHtml+= '<div class="name">'+results.results[0].name+'</div>';
        outHtml+= '<div class="title">'+results.results[0].title+'</div>';
        outHtml+= '<div class="place">'+results.results[0].place+'</div>';
        outHtml+= '<div class="text">'+results.results[0].text+'</div>';
        outHtml+= '<a href="" class="share-btn"><svg viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.62646 9.7207L13.1265 6.2207" stroke="black" stroke-width="2"/><circle cx="16.1265" cy="4.2207" r="3" stroke="black" stroke-width="2"/><circle cx="16.1265" cy="18.2207" r="3" stroke="black" stroke-width="2"/><circle cx="4.12646" cy="11.2207" r="3" stroke="black" stroke-width="2"/><path d="M6.1265 13.3145L13.4178 17.2307" stroke="black" stroke-width="2"/></svg><span>поделиться результатом</span></a>';
        outHtml+= '';
        $('.final').append(outHtml);
    });

    new fullpage('#fullpage', {
        navigation: true,
        navigationPosition: 'left',
    });
});




$(document).ready(function() {

});
