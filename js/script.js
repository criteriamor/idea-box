fetchIdea();

var $saveButton = $('#button-save');
var $ideasList = $('.ideas-container');
var $grade = $('#grade');
var arr = ['swill', 'plausible', 'genius'];


$('ul').on('click', '.button-delete', deleteIdea);


function Idea(titleInput, bodyInput){
  this.titleInput = titleInput;
  this.bodyInput = bodyInput;
  this.quality = 'swill';
  this.uniqueId = (new Date).getTime()
}

$saveButton.click(function(event) {
  event.preventDefault();
  var titleInput = $('#input-title').val();
  var bodyInput = $('#input-body').val();
  var idea = new Idea (titleInput, bodyInput);
  var uniqueId = idea.uniqueId;

  var stringifiedIdea = JSON.stringify(idea);

  localStorage.setItem(uniqueId, stringifiedIdea);
  console.log(stringifiedIdea)
  // fetchIdea(uniqueId);

  // $ideasList.prepend(`<li class="card">
  //   <button class='button-delete circle-buttons'></button>
  //   <h2 class="ideas-title">${idea.titleInputt}</h2>
  //   <p class="ideas-content">${idea.bodyInput}</p>
  //   <button class='button-upvote circle-buttons'></button>
  //   <button class='button-downvote circle-buttons'></button>
  //   <h3 class="rating">quality:<span id="grade">${idea.quality}</span></h3>
  //   </li>`);

  // titleInput.val('');
  // bodyInput.val('');
  // $('.button-upvote').on('click', clickUp);
  // $('.button-downvote').on('click', clickDown);
 });
function fetchIdea() {
  // console.log(uniqueId)
  // console.log(idea);
  // displayIdea.html('');
  for(var i=0; i < localStorage.length; i++) {
    // var titleIdea = idea[i].title;
    // var bodyIdea = idea[i].body;
    var retrieveObject = localStorage.getItem(localStorage.key(i));
    var ideaa = JSON.parse(retrieveObject);
    console.log(ideaa)
    $('.ideas-container').prepend(`<li class="card">
    <button class='button-delete circle-buttons'></button>
    <h2 class="ideas-title">${ideaa.titleInput}</h2>
    <p class="ideas-content">${ideaa.bodyInput}</p>
    <button class='button-upvote circle-buttons'></button>
    <button class='button-downvote circle-buttons'></button>
    <h3 class="rating">quality:<span id="grade">${ideaa.quality}</span></h3>
    </li>`)
  }; 
};


function deleteIdea() {
  $(this).parent('li').remove();
};

// function clickUp(){
//   var index = 0;
//   var rating = "swill";
//   if (rating = arr[0]) {
//       index ++;
//       rating = arr[index];
//       // console.log(index)
//       // console.log(rating);
//     } else if (rating = arr[1]) {
//       index ++;
//       rating = arr[index];
//       console.log(rating);
//     } else {
//       rating = arr[2];
//       console.log(rating);
//     }
  // console.log(rating);
// }


function clickDown(){
  rating = arr[2];
  if (rating = arr[2] || arr[1]) {
      index --;
    } else if (rating = arr[0]){
      index = arr[0];
    }
}





