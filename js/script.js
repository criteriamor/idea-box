fetchIdea();

var $saveButton = $('#button-save');
var $ideasList = $('.ideas-container');
var $grade = $('#grade');
var arr = ['swill', 'plausible', 'genius'];

// $('ul').eq(i).on('click', '.button-delete', deleteIdea);
// Event.target.parent node.id. store it as a variable. 
// console.log(idea.uniqueId);

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
  console.log(idea);
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(uniqueId, stringifiedIdea);
  console.log(idea);
  fetchIdea();
 });

function fetchIdea(){
  for (var i=0; i < localStorage.length; i++) {
    // console.log(localStorage.key(i));
    var retrieveObject = localStorage.getItem(localStorage.key(i));
    var idea = JSON.parse(retrieveObject);
    $('.ideas-container').prepend(`<li class="card" id="${idea.uniqueId}"> 
    <button class='button-delete circle-buttons'></button>
    <h2 class="ideas-title">${idea.titleInput}</h2>
    <p class="ideas-content">${idea.bodyInput}</p>
    <button class='button-upvote circle-buttons'></button>
    <button class='button-downvote circle-buttons'></button>
    <h3 class="rating">quality:<span id="grade">${idea.quality}</span></h3>
    </li>`);
    console.log(idea.uniqueId);
  };
};


// function deleteIdea() {
//   var retrieveObject = localStorage.getItem(localStorage.key(i));
//   var idea = JSON.parse(retrieveObject);


//   $(this).parent('li').remove();


  // for (var i=0; i < localStorage.length; i++) {
  //   if (idea[i].uniqueId === idea.uniqueId) {
  //     idea.splice(i, 1);
  //   }
  //   console.log(localStorage.getItem(localStorage.key(i)));
  //}
  
  
// };

  
//<data-id="${idea.uniqueId}"



