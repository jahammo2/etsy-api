$(function() {

    var dataStore;
    var newResults = '';
    var num;
    var title;
    var desc;
    var secondBlock = $('.second-block-div');

    $.getJSON('https://openapi.etsy.com/v2/listings/active.js?includes=MainImage&login_name&api_key=x9fdpgb6f3373opf8k1n7cjv&callback=?')
        .done(function(data) {
            console.log(data)
            dataStore = data;
            runResults();
        })
        .fail(function() {
            console.log('failed')
        })

    function runResults() {
        console.log(dataStore.results.length);
        for (var i = 0; i < 19; i += 1) {
            num = i;
            createLists();
            console.log(i);
        };
        move2to7()
        move8to11()
        move12to13()
        followLink();
        showDesc();
    }

    function reduceElSize(el, amount, where) {
        console.log(el);
        console.log(el.length);
        el = el.split(" ")
        if (el.length > amount) {
            console.log(el);
            console.log(el.length)
            el.splice(amount, (el.length - amount))
            var done = el.join();
            console.log(done);
            done = done.replace(/,/g, ' ');
            $('.requirements-ul:last ' + where).html(done + '...');
        }
    }

    function createLists() {
        var lists = $('#lists').html()
        $('.list-container').append(lists);
        $('.requirements-ul:last .listing-title').html(dataStore.results[num].title)
        title = $('.requirements-ul:last .listing-title').text();
        $('.requirements-ul:last').css({
            'background': 'url("' + dataStore.results[num].MainImage.url_170x135 + '")',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
        })
        $('.ul-link:last').attr('href', dataStore.results[num].url);
        $('.requirements-ul:last .listing-description').html(dataStore.results[num].description)
        desc = $('.requirements-ul:last .listing-description').text();
        $('.requirements-ul:last .listing-price').html('$' + dataStore.results[num].price)
        $('.requirements-ul:last .listing-views').html('views: ' + dataStore.results[num].views)
        reduceElSize(title, 5, '.listing-title');
        reduceElSize(desc, 45, '.listing-description');
        if ((num === 0) || (num === 11)) {
            $('.requirements-ul:last').addClass('block-div');
            $('.requirements-ul:last').addClass('big-ul');
        } else if (num >= 1 && num <= 6) {
            $('.requirements-ul:last').addClass('first-block');
            $('.requirements-ul:last').removeClass('single-ul');
        } else if (num >= 7 && num <= 10) {
            $('.requirements-ul:last').addClass('second-block');
            $('.requirements-ul:last').removeClass('single-ul');
        } else if (num >= 12 && num <= 13) {
            $('.requirements-ul:last').addClass('third-block');
            $('.requirements-ul:last').removeClass('single-ul');
        }
    }

    function move2to7() {
        var items2to7 = $('.first-block').detach();
        items2to7.appendTo($('.first-block-div'));
        var firstBlock = $('.first-block-div').detach();
        ($('ul:first')).after(firstBlock);
    }

    function move8to11() {
        var items8to11 = $('.second-block').detach();
        items8to11.appendTo(secondBlock);
        secondBlock.detach();
        ($('.first-block-div')).after(secondBlock);
    }

    function move12to13() {
        var items12to13 = $('.third-block').detach();
        items12to13.appendTo($('.third-block-div'));
        var thirdBlock = $('.third-block-div').detach();
        ($('.block-div:last')).after(thirdBlock);
    }

    function followLink() {
        $('.requirements-ul').on('click', function() {
            window.location.href = $('.background-div', this).find('a').attr('href');
        });
    }

    function showDesc() {
        $('.big-ul div .listing-description').css({
            'display': 'block'
        });
    }

});