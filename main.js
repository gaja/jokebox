(function() { 
  const splitChar = '~';

  //dummy data -- as backup if ajax fails
  var quotesSet = [ 
    "quote one.   ~ author1", 
    "quote two.   ~ author2",
    "quote three. ~ author3",
    "quote four.  ~ author4",
    "quote five.  ~ author5",
    "quote six.   ~ author6",
    "quote seven. ~ author7",
    "quote eight. ~ author8",
  ],
  jokes = [],
  showArea = document.querySelector('.quotesShow'),
  genQuotes = document.querySelector('#genQuotes');

  //ajax implementation
  function getJSON (file, callback)
  {
    var request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    request.onreadystatechange = function () {
      if(request.readyState==4 && request.status==200) {
        callback(JSON.parse(request.responseText));
      }
    };
    request.open("GET", file, false);
    request.send();
  }

  getJSON('http://api.icndb.com/jokes/random/3', 
    function (data) {
      if (data.type === 'success') {
        // console.log('joke is here!');
        // console.log(data.value[0].joke);
        for(var i = 0, x = data.value.length;i<x;i++) {
          jokes.push(data.value[i].joke);
        }
      }
    });

  function pickNumber(jokes){
    return Math.floor(Math.random()*jokes.length);
  }

  function pickQuote(dataset) {
    return dataset[pickNumber(dataset)];
  }

  function separateQuoteFromAuthor() {
    return pickQuote().split(splitChar);
  }

  function separateChosenQuoteFromAuthor(chosenQuote) {
    return chosenQuote.split(splitChar);
  }

  function choseQotesType() {
    var joke; 
    if(jokes.length === 0) {
      joke = quotesSet;
      joke = pickQuote(joke);
      joke = separateChosenQuoteFromAuthor(joke);
    } else joke = pickQuote(jokes);
    return joke;
  }

  function displayQuote() {
    showArea.innerHTML = choseQotesType();
  }

  genQuotes.addEventListener('click', function(){
    displayQuote();
  });
}());
