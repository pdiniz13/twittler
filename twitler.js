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
            var $tweet = $('<div></div>');
            $tweet.text('@' + tweet.user + ': ' + tweet.message);
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