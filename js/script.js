var $saveButton = $('#button-save');
var $ideasContainer = $('.ideas-container');
var $grade = $('#grade');
var arr = ['swill', 'plausible', 'genius'];

$('ul').on('click', '.button-delete', deleteIdea); 


$saveButton.click(function(event) {
  event.preventDefault();
  var $titleInput = $('#input-title');
  var $bodyInput = $('#input-body');
  $ideasContainer.prepend(`<li class="card">
    <button class='button-delete circle-buttons'></button>
    <h2 class="ideas-title">${$titleInput.val()}</h2>
    <p class="ideas-content">${$bodyInput.val()}</p>
    <button class='button-upvote circle-buttons'></button>
    <button class='button-downvote circle-buttons'></button>
    <h3 class="rating">quality:<span id="grade">swill</span></h3>
    </li>`);
  $titleInput.val('');
  $bodyInput.val('');
  $('.button-upvote').on('click', clickUp);
  $('.button-downvote').on('click', clickDown);
 });

function deleteIdea() {
  $(this).parent('li').remove();
};

function clickUp(){
  var index = 0;
  var rating = "swill";
  if (rating = arr[0]) {
      index ++;
      rating = arr[index];
      // console.log(index)
      // console.log(rating);
    } else if (rating = arr[1]) {
      index ++;
      rating = arr[index];
      console.log(rating);
    } else {
      rating = arr[2];
      console.log(rating);
    }
  // console.log(rating);
}

function clickDown(){
  rating = arr[2];
  if (rating = arr[2] || arr[1]) {
      index --;
    } else if (rating = arr[0]){
      index = arr[0];
    }
}





