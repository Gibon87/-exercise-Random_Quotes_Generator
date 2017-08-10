// scripts.js file
$(document).ready(function() {

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    
function getQuote() {
	$.ajax( {
	      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=theCallback',
	      dataType: 'jsonp',
	      jsonpCallback: 'theCallback',
	      success: createTweet
	 });
}
function createTweet(input) {
    var data = input[0],
    	quoteText = $(data.content).text().trim(),
    	quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if (tweetText.length > 140) {
	    getQuote();
	} else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    $('.quote').text(quoteText);
	    $('.author').text("Author: " + quoteAuthor);
	    $('.tweet').attr('href', tweet);
	}
}
    $('.trigger').click(function() {
        getQuote();
    })
    getQuote();
    
//some css for training
$('.quote').css({"text-align":"center", "font-style":"italic"});
$('.author, .tweet').css({"display":"block", "text-align":"center"})
$('.trigger').css({"display":"block", "margin":"20px auto"})


});