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
            var $tweet = $('<ul></ul>');
            $tweet.append('<li>@' + '<span class="tweetUser">' + tweet.user + '</span>' + ': ' + tweet.message+"</li>");
            $tweet.append('<li>Tweeted at: ' + tweet.created_at+"</li>");
            $tweet.appendTo('.tweets');
            index -= 1;
        }
    }
    function displayUserTweets(thisUser){
        var user = thisUser.text();
        console.log(thisUser);
        $('.tweets').html('');
        $('<h3 class="check">Tweets by: '+ user +'</h3>').appendTo('.tweets');
        var count = streams.users[user].length;
        for (var x = 0; x<count; x++){
            var tweet = streams.users[user][x];
            var $tweet = $('<ul></ul>');
            $tweet.append('<li>'+tweet.message+'</li>');
            $tweet.append('<li>Tweeted at: ' + tweet.created_at+'</li>');
            $tweet.prependTo('.tweets');
        }
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
    $body.on("click.user", ".tweetUser", function(e){
        e.preventDefault();
        e.stopPropagation();
        displayUserTweets($(this));
    })
});