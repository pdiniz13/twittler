/**
 * Created by Pdiniz on 1/8/2015.
 */
$(document).ready(function(){
    var $body = $('body');
    var $users = [];
    var $streams = {};
    //$body.html('');
    function displayTweets(){
        $('.tweets').html('');
        var index = streams.home.length - 1;
        while(index >= 0){
            var tweet = streams.home[index];
            var $tweet = $('<ul></ul>');
            $tweet.append('<li>@' + tweet.user + ': ' + tweet.message+"</li>");
            $tweet.append('<li>Tweeted at: ' + tweet.created_at+"</li>");
            $tweet.appendTo('.tweets');
            index -= 1;
        }
    }
    displayTweets();
    $('button').on('click', function(e){
        e.preventDefault();
        displayTweets();
    });
});