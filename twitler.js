/**
 * Created by Pdiniz on 1/8/2015.
 */
$(document).ready(function(){
    var $body = $('body');

    function addUser(name){

    }

    function formatDate(date){
        var oldDate = date.getTime();
        var newDate = (new Date()).getTime();
        var formattedDate;
        var formatterString;
        newDate = newDate - oldDate;
        if (newDate < 60000) {
            formattedDate = new Date(newDate).getSeconds();
            formattedString = formattedDate+" seconds ago";
        }
        else if (60000 < newDate < 3.6e+6){
            formattedDate = new Date(newDate).getMinutes();
            formattedString = formattedDate+" minutes ago";
        }
        else{
            formattedDate = new Date(newDate).getHours();
            formattedString = formattedDate+" hours ago";
        }
        return formattedString;
    }

    $body.on("submit", "form", function(e){
        e.preventDefault();
        if ($(".input").val().length > 0 && $("textarea").val().length > 0){
            var userName = $(".input").val();
            var message = $("textarea").val();
            if (!users.hasOwnProperty(userName)){
                console.log(userName);
                console.log(streams.users);
                streams.users[userName]=[];
            }
            var userTweet = {
                user: userName,
                message: message,
                created_at: new Date()
            };
            addTweet(userTweet);
            displayTweets();
            $('form')[0].reset();
        }
    });

    function displayTweets(){
        $('.tweets').html('');
        var index = streams.home.length - 1;
        while(index >= 0){
            var tweet = streams.home[index];
            var $tweet = $('<div class="tweet"></div>');
            $tweet.append('<div class="header">@' + tweet.user + '</div><div class="time"> - ' + formatDate(tweet.created_at) +'</div>');
            $tweet.append('<div class="message">' + tweet.message + '</div>');
            $tweet.appendTo('.tweets');
            index -= 1;
        }
        $("#create").show();
    }
    function displayUserTweets(thisUser){
        $("#create").hide();
        var user = thisUser.text().slice(1);
        console.log(thisUser);
        $('.tweets').html('');
        var count = streams.users[user].length;
        for (var x = 0; x<count; x++){
            var tweet = streams.users[user][x];
            var $tweet = $('<div class="tweet"></div>');
            $tweet.append('<div class="header">@' + tweet.user + '</div><div class="time">-' + formatDate(tweet.created_at) +'</div>');
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