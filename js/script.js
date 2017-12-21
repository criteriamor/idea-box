window.onload = fetchIdea();

$('#button-save').on('click', saveIdea);
$('ul').on('click', '.button-delete', deleteIdea);
$('ul').on('click', '.button-upvote', voteUp);
$('ul').on('click', '.button-downvote', voteDown);
$('ul').on('click', '.ideas-title', titleEditable);
$('ul').on('click', '.ideas-content', bodyEditable);
$('#input-search').on('keyup', searchTheIdeas);

function Idea(titleInput, bodyInput){
  this.titleInput = titleInput;
  this.bodyInput = bodyInput;
  this.quality = 'swill';
  this.uniqueId = (new Date).getTime();
}

function saveIdea(event) {
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
}

function fetchIdea(idea) {
  for (var i = 0; i < localStorage.length; i++){
    var retrieveObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrieveObject);
    prependIdea(parsedObject); 
  }
}

function titleEditable() {
  $(this).prop('contenteditable', true).focus();
  $(this).on('blur', function() {
    var newInfo = $(this).html(); 
    var theParent = $(this).parent('li').attr('id');
    var retrieveObject = localStorage.getItem(theParent);
    var parsedObject = JSON.parse(retrieveObject);  
    parsedObject.titleInput = newInfo;
    var strung = JSON.stringify(parsedObject);
    localStorage.setItem(theParent, strung);
  });
}

function bodyEditable() {
  $(this).prop('contenteditable', true).focus();
  $(this).on('blur', function() {
    var newInfo = $(this).html(); 
    var theParent = $(this).parent('li').attr('id');
    var retrieveObject = localStorage.getItem(theParent);
    var parsedObject = JSON.parse(retrieveObject);  
    parsedObject.bodyInput = newInfo;
    var strung = JSON.stringify(parsedObject);
    localStorage.setItem(theParent, strung);
  });
}

function voteUp() {
  var theParent = ($(this).parent('li').attr('id'));
  var retrieveObject = localStorage.getItem(theParent);
  var parsedObject = JSON.parse(retrieveObject);
    if (parsedObject.quality === 'swill') {
      parsedObject.quality = 'plausible';
      $(this).siblings('h3').find('span').text(' plausible');
    } else {
      parsedObject.quality = 'genius';
      $(this).siblings('h3').find('span').text(' genius');
    }
  var strung = JSON.stringify(parsedObject);
  localStorage.setItem(theParent, strung);
}

function voteDown() {
  var theParent = ($(this).parent('li').attr('id'));
  var retrieveObject = localStorage.getItem(theParent);
  var parsedObject = JSON.parse(retrieveObject);
    if (parsedObject.quality === 'genius') {
      parsedObject.quality = 'plausible';
      $(this).siblings('h3').find('span').text(' plausible');
    } else {
      parsedObject.quality = 'swill';
      $(this).siblings('h3').find('span').text(' swill');
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
}

function deleteIdea() {
    var theParent = ($(this).parent('li').attr('id'));
    console.log(this);
    localStorage.removeItem(theParent); 
    $(this).parent('li').remove();
}

function searchTheIdeas() {
  var filter = $(this).val();
  var title = $('.ideas-title');
  var body = $('.ideas-content');
    for (var i = 0; i < title.length; i++) {
      $(title[i]).parent('li').hide();
      if ($(title[i]).text().includes(filter) || $(body[i]).text().includes(filter)) {
        $(title[i]).parent('li').show();
      }
    }    
}


