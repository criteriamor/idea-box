window.onload = fetchIdea()

var $saveButton = $('#button-save');
var $ideasList = $('.ideas-container');
var $grade = $('#grade');
var arr = ['swill', 'plausible', 'genius'];

$('ul').on('click', '.button-delete', deleteIdea);
$('ul').on('click', '.button-upvote', voteUp);
$('ul').on('click', '.button-downvote', voteDown);
$('ul').on('click', '.ideas-title', ideaEditable);
$('ul').on('click', '.ideas-content', bodyEditable);
// $('#input-search').on('keyup', searchTheThings);

function Idea(titleInput, bodyInput){
  this.titleInput = titleInput;
  this.bodyInput = bodyInput;
  this.quality = 'swill';
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

function ideaEditable() {
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
};

function deleteIdea() {
    var theParent = ($(this).parent('li').attr('id'));
    localStorage.removeItem(theParent); 
    $(this).parent('li').remove();
};

var whatsThis = $('li').filter(function (index) {
  return $(this).children('h2').html();
});

console.log(whatsThis);

// function searchTheThings() {
//   debugger;
//   var searchInput = document.querySelector('#input-search');
//   var parentContainer = document.querySelector('.ideas-container');
//   var listCard = parentContainer.querySelector('.card');
//   var howMany = parentContainer.getElementsByTagName('li').length;
//   for (var i = 0; i < howMany.length; i++) {
//     var searchValue = searchInput.value.toLowerCase();
//     var title = listCard[i].document.querySelector('h2')[0];
//     console.log(title);
//     console.log(searchValue);
//     if (title.innerHTML.toLowerCase().indexOf(searchInput) > -1) {
//       listCard[i].style.display = "";
//     } else {
//       listCard[i].style.display = "none";
//   }
// }
// }

  // var howMany = $('.ideas-title');
  // for (var i = 0; i < howMany.length; i++) {
  //   var searchInput = $('#input-search').val();
  //   var liTitle = $($('.ideas-title')[i]).text().includes();
  //   var liBody = $($('.ideas-content')[i]).text().includes();
  //   if $($(searchInput === liTitle || liBody)) {
  //     console.log(liTitle);
  //   }
      
  //     // $(this);
  //     // console.log($(this));
  //   }
  //   // console.log(searchInput);
  //   //console.log(liTitle);
  //   // console.log(liBody);
  // }
  
  // console.log(parsedObject);
  // for (var i = 0; i > parsedObject.length; i++) {
    // console.log(parsedObject);

  // var theParent = ($(this).parent('.search-container').siblings('ul').find('li').attr('id'));
  // var retrieveObject = localStorage.getItem(theParent);
  // var parsedObject = JSON.parse(retrieveObject);


  // if (searchInput.text().includes() === parsedObject.titleInput || parsedObject.bodyInput) {
  //   console.log(searchInput);
  //   console.log(parsedObject.titleInput);
  //   console.log(parsedObject.bodyInput);
  //   console.log(1);

    // $(this.parsedObject).css('backgroundColor', 'red');
    
  // } else {
  //   console.log(2);
  // }


  //  {
  //   console.log(parsedObject.length);
  //   var searchInput = $('input-search').val();
  //     if (searchInput !== parsedObject.titleInput || parsedObject.bodyInput) {   
  //     console.log(1);
  //   }
  // } 

  // .includes()
  // .show()
  // .hide()
  
// }



