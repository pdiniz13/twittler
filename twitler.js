/**
 * Created by Pdiniz on 1/8/2015.
 */
$(document).ready(function(){
    var $body = $('body');

    function displayTweets(){
        $('.tweets').html('');
        var index = streams.home.length - 1;
        while(index >= 0){
            var tweet = streams.home[index];
            var $tweet = $('<div class="tweet"></div>');
            $tweet.append('<div class="header">@' + tweet.user + '</div><div class="time">-' + tweet.created_at +'</div>');
            $tweet.append('<div class="message">' + tweet.message + '</div>');
            $tweet.appendTo('.tweets');
            index -= 1;
        }
    }
    function displayUserTweets(thisUser){
        var user = thisUser.text().slice(1);
        console.log(thisUser);
        $('.tweets').html('');
        var count = streams.users[user].length;
        for (var x = 0; x<count; x++){
            var tweet = streams.users[user][x];
            var $tweet = $('<div class="tweet"></div>');
            $tweet.append('<div class="header">@' + tweet.user + '</div><div class="time">-' + tweet.created_at +'</div>');
            $tweet.append('<div class="message">' + tweet.message + '</div>');
            $tweet.prependTo('.tweets');
        }
        $('<h3 class="check">Tweets by: '+ user +'</h3>').prependTo('.tweets');
        $(".goBack").show();
        $body.on('click.back', '.goBack', function(e){
            e.preventDefault();
            $(this).hide();
            displayTweets();
            $body.off('click.goBack');
            $('.refresh').off('click').on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                displayTweets();
            });
        });
        $('.refresh').off('click').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            displayUserTweets(thisUser);
        });

    }

    displayTweets();
    $body.on('click', ".refresh", function(e){
        e.preventDefault();
        e.stopPropagation();
        displayTweets();
    });
    $body.on("click.user", ".header", function(e){
        e.preventDefault();
        e.stopPropagation();
        displayUserTweets($(this));
    })
});