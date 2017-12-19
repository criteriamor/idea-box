window.onload = fetchIdea()

var $saveButton = $('#button-save');
var $ideasList = $('.ideas-container');
var $grade = $('#grade');
var arr = ['swill', 'plausible', 'genius'];

$('ul').on('click', '.button-delete', deleteIdea);
$('ul').on('click', '.button-upvote', voteUp);

function Idea(titleInput, bodyInput){
  this.titleInput = titleInput;
  this.bodyInput = bodyInput;
  this.quality = ' swill';
  this.uniqueId = (new Date).getTime();
}

$saveButton.click(function(event) {
  event.preventDefault();
  var titleInput = $('#input-title').val();
  var bodyInput = $('#input-body').val();
  var idea = new Idea (titleInput, bodyInput);
  var uniqueId = idea.uniqueId;
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(uniqueId, stringifiedIdea);
  prependIdea(idea);
  $('#input-title').val('');
  $('#input-body').val('');
 });

function fetchIdea(idea) {
  for (var i = 0; i < localStorage.length; i++){
    var retrieveObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrieveObject);
    prependIdea(parsedObject); 
  }
}

function voteUp() {
  var theParent = ($(this).parent('li').attr('id'));
  var retrieveObject = localStorage.getItem(theParent);
  var parsedObject = JSON.parse(retrieveObject);
    if (parsedObject.quality === ' swill') {
      parsedObject.quality = ' plausible';
      $(this).siblings('h3').find('span').text(' plausible');
    } else {
      parsedObject.quality = 'genius';
      $(this).siblings('h3').find('span').text(' genius');
    }
  var strung = JSON.stringify(parsedObject);
  localStorage.setItem(theParent, strung);
}

function prependIdea(idea) {
  $('.ideas-container').prepend(`<li class="card" id="${idea.uniqueId}"> 
  <button class='button-delete circle-buttons'></button>
  <h2 class="ideas-title">${idea.titleInput}</h2>
  <p class="ideas-content">${idea.bodyInput}</p>
  <button class='button-upvote circle-buttons'></button>
  <button class='button-downvote circle-buttons'></button>
  <h3 class="rating">quality:<span id="grade">${idea.quality}</span></h3>
  </li>`);
};

function deleteIdea() {
    var theParent = ($(this).parent('li').attr('id'));
    localStorage.removeItem(theParent); 
    $(this).parent('li').remove();
};


