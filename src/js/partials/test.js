currentQuestion = 1;
countQuestions = 1;
answers = '';

function getMostFrequentElement(inputArg) {
    var type = typeof inputArg,
        length,
        mostFrequent,
        counts,
        index,
        value;

    if (inputArg === null || type === 'undefined') {
        throw TypeError('inputArg was "null" or "undefined"');
    }

    mostFrequent = [];
    if (type === 'function' || !Object.prototype.hasOwnProperty.call(inputArg, 'length')) {
        mostFrequent[0] = inputArg;
        mostFrequent[1] = 1;
    } else {
        counts = {};
        length = inputArg.length;
        for (index = 0; index < length; index += 1) {
            value = inputArg[index];
            type = typeof value;
            counts[type] = counts[type] || {};
            counts[type][value] = (counts[type][value] || 0) + 1;
            if (!mostFrequent.length || counts[type][value] >= mostFrequent[1]) {
                mostFrequent[0] = value;
                mostFrequent[1] = counts[type][value];
            }
        }
    }

    return mostFrequent;
}

if ($('body').hasClass('test-page')){

    $.getJSON('test.json', function(data) {
        countQuestions = data.test.length;
        $.each(data.test, function( index, value ) {
            var outHtml = '';
            outHtml+= '<div class="section"><div class="inner"><div class="quest">';

            outHtml+= '<div class="number">'+(index+1)+'&nbsp;&nbsp;|&nbsp;&nbsp;'+countQuestions+'</div>';

            outHtml+= '<div class="question">';
            outHtml+= '<div class="text">'+value.quest+'</div>';
            //outHtml+= '<button>Узнать варианты</button>';
            outHtml+= '</div>';

            outHtml+= '<div class="answers">';
            //outHtml+= '<div class="title">'+value.miniquest+'</div>';
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
        if ($(window).width()>1024){
            $('footer').hide();
        } else {
            $('footer').appendTo('#fullpage');
            $('#fullpage').addClass('with-footer');
        }


        new fullpage('#fullpage', {
            navigation: true,
            navigationPosition: 'left',
            keyboardScrolling: false,

            onLeave: function (origin, destination, direction) {
                if (destination.isLast && direction == 'down' && $('#fullpage').hasClass('with-footer')){
                    fullpage_api.setMouseWheelScrolling(true, 'up');
                    fullpage_api.setAllowScrolling(true, 'up');
                }
                if (origin.isLast && direction == 'up' && $('#fullpage').hasClass('with-footer')){
                    fullpage_api.setMouseWheelScrolling(false);
                    fullpage_api.setAllowScrolling(false);
                    fullpage_api.setMouseWheelScrolling(true, 'down');
                    fullpage_api.setAllowScrolling(true, 'down');
                }
            }
        });

        fullpage_api.setMouseWheelScrolling(false);
        fullpage_api.setAllowScrolling(false);


        $('.section .question button').click(function () {
            event.preventDefault();
            console.log();
            $(this).closest('.question').hide().siblings('.answers').show();
        });


        $('.section .answers button').click(function () {
            event.preventDefault();
            var answer = $(this).siblings('.list').find('input:checked').val();
            if (answer){
                answers+= ','+answer;
                $(this).attr("disabled", true);
                fullpage_api.moveSectionDown();
                if (currentQuestion == countQuestions){
                    var ansArray = answers.substr(1).split(",");
                    var mostAnsver = getMostFrequentElement(ansArray)[0];
                    $.getJSON('results.json', function(results) {
                        outHtml = '';

                        $.each(results.results, function( index, value ) {
                            if (value.id == mostAnsver){
                                outHtml+= '<div class="img-block"><img src="'+value.img+'" alt=""></div>';
                                outHtml+= '<div class="name">'+value.name+'</div>';
                                outHtml+= '<div class="title">'+value.title+'</div>';
                                outHtml+= '<div class="place">'+value.place+'</div>';
                                outHtml+= '<div class="text">'+value.text+'</div>';
                                outHtml+= '<div class="share-row">';
                                outHtml+= '<button class="share-btn"><svg viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.62646 9.7207L13.1265 6.2207" stroke="black" stroke-width="2"/><circle cx="16.1265" cy="4.2207" r="3" stroke="black" stroke-width="2"/><circle cx="16.1265" cy="18.2207" r="3" stroke="black" stroke-width="2"/><circle cx="4.12646" cy="11.2207" r="3" stroke="black" stroke-width="2"/><path d="M6.1265 13.3145L13.4178 17.2307" stroke="black" stroke-width="2"/></svg><span>поделиться тестом</span></button>';
                                outHtml+= '<div class="social-block"><button class="social-link fb"><svg viewBox="0 0 10 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.91451 7.83172C9.80765 8.8413 9.72216 9.82894 9.6153 10.8385C9.59392 11.0141 9.50844 11.036 9.3802 11.036C8.54668 11.036 7.73452 11.036 6.901 11.036C6.79414 11.036 6.70865 11.036 6.58041 11.036C6.58041 14.7013 6.58041 18.3445 6.58041 22.0098C5.08434 22.0098 3.63102 22.0098 2.13495 22.0098C2.13495 18.3445 2.13495 14.7013 2.13495 11.036C1.64338 11.036 1.17319 11.036 0.724367 11.036C0.48927 11.036 0.211428 11.1019 0.0618212 10.9702C-0.0450409 10.8605 0.0190761 10.5532 0.0190761 10.3118C0.0190761 9.3461 0.0190761 8.40236 0.0190761 7.43667C0.0190761 7.34888 0.0190761 7.26109 0.0190761 7.12941C0.724366 7.12941 1.42966 7.12941 2.13495 7.12941C2.13495 6.82214 2.13495 6.55877 2.13495 6.2954C2.15632 5.41751 2.13495 4.51766 2.24181 3.63976C2.47691 1.64255 3.93023 0.215963 5.85375 0.0842786C6.98649 -0.0254586 8.11923 0.0184362 9.25197 0.0184362C9.46569 0.0184362 9.67941 0.0184362 9.91451 0.0184362C9.91451 0.654912 9.91451 1.26944 9.91451 1.88397C9.91451 2.4985 9.91451 3.13497 9.91451 3.7934C9.82902 3.7934 9.74353 3.7934 9.65804 3.7934C8.97412 3.7934 8.29021 3.7934 7.60629 3.7934C7.00786 3.7934 6.64453 4.10066 6.62316 4.69324C6.58041 5.48335 6.62316 6.2954 6.62316 7.10746C7.73452 7.10746 8.84589 7.10746 10 7.10746C9.95726 7.37083 9.93588 7.5903 9.91451 7.83172Z" fill="black"/></svg></button><button class="social-link vk"><svg viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.7455 1.45851C24.6469 2.00078 24.4004 2.5184 24.0799 2.96207C23.3898 3.97266 22.675 4.9586 21.9602 5.94455C21.6397 6.38822 21.3193 6.80725 21.0235 7.27557C20.7277 7.74389 20.777 8.18756 21.1714 8.58194C21.7383 9.17351 22.3299 9.71578 22.8968 10.3073C23.4637 10.8743 24.0306 11.4905 24.425 12.2053C24.5483 12.4271 24.6469 12.6736 24.6962 12.9201C24.7701 13.3145 24.6222 13.5609 24.2278 13.6842C24.006 13.7581 23.7595 13.7581 23.5377 13.7828C22.5764 13.8074 21.6397 13.7828 20.6784 13.8321C19.7172 13.906 18.9777 13.5363 18.3368 12.8954C17.8192 12.3778 17.3755 11.8356 16.8579 11.3179C16.6854 11.1207 16.4635 10.9482 16.2417 10.8003C15.8966 10.5538 15.6255 10.6031 15.3297 10.8989C15.0339 11.1947 14.9107 11.5644 14.8614 11.9588C14.8121 12.3039 14.7874 12.6736 14.7628 13.0433C14.7135 13.4624 14.5163 13.7088 14.0973 13.7828C14.048 13.7828 13.9987 13.8074 13.9494 13.8074C13.2839 13.8074 12.643 13.8321 11.9775 13.8074C10.9669 13.7581 10.0056 13.4624 9.11828 12.9694C8.03374 12.3532 6.9985 11.663 6.20975 10.7017C5.49494 9.81437 4.82943 8.92702 4.18857 7.99038C2.93149 6.11709 1.89625 4.0959 0.984253 2.02543C0.910307 1.85289 0.836362 1.70499 0.787065 1.53245C0.688471 1.18737 0.836362 0.94089 1.18144 0.866944C1.32933 0.842296 1.50187 0.817648 1.64976 0.817648C2.685 0.817648 3.74489 0.792998 4.78013 0.792998C5.3224 0.792998 5.66748 1.01484 5.86467 1.50781C6.40693 2.83883 7.09709 4.0959 7.78725 5.35298C8.05839 5.84595 8.40347 6.31427 8.84714 6.684C9.04433 6.83189 9.24152 6.93049 9.488 6.90584C9.6359 6.88119 9.70984 6.83189 9.78379 6.684C9.95633 6.36357 10.0303 6.04314 10.0796 5.69806C10.2028 4.78607 10.2275 3.89872 10.1289 2.98672C10.1042 2.71559 10.0303 2.4198 9.98098 2.14867C9.85773 1.6064 9.488 1.33527 8.97038 1.21202C8.87179 1.18738 8.7732 1.13808 8.6746 1.08878C8.7239 0.990187 8.7732 0.891592 8.87179 0.792998C9.14292 0.521864 9.46335 0.373973 9.83308 0.324676C11.0655 0.127488 12.2733 0.152137 13.5057 0.275379C13.6536 0.300028 13.8015 0.324676 13.9494 0.349325C14.541 0.497216 14.6642 0.719054 14.7628 1.31062C14.8121 1.72964 14.7874 2.14867 14.7874 2.59234C14.7874 2.93742 14.7874 3.2825 14.7874 3.62758C14.7874 3.62758 14.7874 3.62758 14.7628 3.62758C14.7628 4.41634 14.7381 5.20509 14.7628 6.01849C14.7628 6.21568 14.8614 6.43752 14.96 6.61006C15.1572 6.93049 15.453 6.95514 15.7487 6.70865C16.1924 6.33892 16.5375 5.89525 16.8579 5.42693C17.696 4.21915 18.3861 2.91277 18.9284 1.5571C18.953 1.53246 18.9531 1.48316 18.9777 1.45851C19.1502 1.03948 19.3228 0.866944 19.865 0.866944C21.1468 0.866944 22.4285 0.842296 23.7102 0.842296C23.9074 0.842296 24.1046 0.866945 24.2771 0.940891C24.6962 0.891594 24.7948 1.11343 24.7455 1.45851Z" fill="black"/></svg></button><button class="social-link tw"><svg viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5142 2.18937C21.696 2.54824 20.8243 2.78612 19.9154 2.90162C20.8504 2.34337 21.564 1.46612 21.8995 0.408742C21.0278 0.928492 20.0653 1.29562 19.0395 1.50049C18.2118 0.619117 17.032 0.0732422 15.745 0.0732422C13.248 0.0732422 11.2378 2.09999 11.2378 4.58462C11.2378 4.94212 11.268 5.28587 11.3423 5.61312C7.59266 5.43024 4.27479 3.63312 2.04591 0.895492C1.65679 1.57062 1.42854 2.34337 1.42854 3.17524C1.42854 4.73724 2.23291 6.12187 3.43191 6.92349C2.70729 6.90974 1.99641 6.69937 1.39416 6.36799C1.39416 6.38174 1.39416 6.39962 1.39416 6.41749C1.39416 8.60924 2.95754 10.4297 5.00766 10.8491C4.64053 10.9495 4.24041 10.9976 3.82516 10.9976C3.53641 10.9976 3.24491 10.9811 2.97129 10.9206C3.55566 12.7067 5.21391 14.0199 7.18566 14.0625C5.65116 15.2629 3.70279 15.9861 1.59354 15.9861C1.22366 15.9861 0.86891 15.9696 0.51416 15.9242C2.51204 17.2126 4.87979 17.9482 7.43316 17.9482C15.7327 17.9482 20.2702 11.0732 20.2702 5.11399C20.2702 4.91462 20.2633 4.72212 20.2537 4.53099C21.1488 3.89574 21.9009 3.10237 22.5142 2.18937Z" fill="black"/> </svg></button></div>';
                                outHtml+= '</div>';
                                return false;
                            }
                        });

                        $('.final').append(outHtml);
                        if ($('#fullpage').hasClass('with-footer')){
                            fullpage_api.setMouseWheelScrolling(true, 'down');
                            fullpage_api.setAllowScrolling(true, 'down');
                        }
                    });
                    //тут будет функция запроса данных для share
                } else {
                    currentQuestion++;
                }
            }
        });


    });


}


