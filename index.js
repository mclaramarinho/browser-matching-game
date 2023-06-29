var start = false;
var cards = ['bomb', 'coin', 'ghost', 'heart', 'orange', 'potion', 'star', 'sword', 'bomb', 'coin', 'ghost', 'heart', 'orange', 'potion', 'star', 'sword'];

let count = 0; //counts how many correct matches happened
let score = 100;//starts at 100
let clicked = [];//up to 2 elements

//Adds an event listener to the start button and stops it from listening while start===true
$("#start-btn").click(()=>{
    if(!start){
        start=true;
        gameStart();
    }
})

for(let i = 0; i < 16; i++){
    $("#card"+i).on('click', function(){ //adds a click listener to each card item
        $("#card"+i).attr('src', ('assets/'+cards[i]+'.png'));
        clicked.push($("#card"+i).attr('id'));
        if(clicked.length==2 && count<=8 && start===true){
            if( $("#"+clicked[0]).attr('src') === $("#"+clicked[1]).attr('src') && clicked[0]!==clicked[1]){ //if the sources are equal and the cards are different
                correctAnswer(clicked);
            }else if ( $("#"+clicked[0]).attr('src') !== $("#"+clicked[1]).attr('src') && clicked[0]!==clicked[1] ) {//if the sources are different and the cards too
                wrongAnswer(clicked); //wrong visual effect
                
            }else if ( $("#"+clicked[0]).attr('src') === $("#"+clicked[1]).attr('src') && clicked[0]===clicked[1] ) {//if the sources are equal but the cards are also equal
                doubleClick(clicked);
            }
            clicked = [];
        }
        if (score <= 1){
            $('h4').text(score); //updates the score
            gameOver();
        }else if(score >= 1 && count>=8){
            gameWin();
        }
    })
}
function correctAnswer(list){
    count++; //correct match
    score += 10; //adds 15 points to the score
    $('h4').text(+score); //updates the score
    $("#"+list[0]).off('click');
    $("#"+list[1]).off('click');
    playSound("correct");
}
function doubleClick (list){
    $("#"+list[0]).attr('src', 'assets/cloud.png');
    $("#"+list[1]).attr('src', 'assets/cloud.png');
}
function wrongAnswer(list){
    score-=10; //subtracts 10 points from the score
    $('html').addClass("wrong");
    setTimeout(() => {
        $('html').removeClass("wrong");
    }, 200);
    $('h4').text(score); //updates the score
    playSound("wrong");
    setTimeout(() => {
        $("#"+list[0]).attr('src', 'assets/cloud.png'); //flips the card back
        $("#"+list[1]).attr('src', 'assets/cloud.png');
    }, 800);
    
}
function shuffle (list){

    let count = list.length;
    while(count >= 0){
        let randomNumber = Math.floor(Math.random()*(list.length+1));
        let currentPosition = list[count];
        let randomPosition = list[randomNumber];

        list.splice(randomNumber, 1, currentPosition);
        list.splice(count, 1, randomPosition);

        count--;
    }
    for(let i = 0; i < list.length; i++){
        if(list[i] === undefined){
            list.splice(i, 1);
        }
    }
}
function gameStart (){
    shuffle(cards);
    $("#start-btn").addClass('hidden');
    $("h3").removeClass('hidden');

    $("h4").removeClass('hidden');
    showPattern(cards);
    
    setTimeout(() => {
        hidePattern(cards);
    }, 5000);
}
function showPattern(cards){
    for(let i = 0; i < cards.length; i++){
        $("#card"+i).attr('src', ('assets/'+cards[i]+'.png'));
    }
}
function hidePattern (cards){
    for(let i = 0; i < cards.length; i++){
        $("#card"+i).attr('src', ('assets/cloud.png'));
    }
}
function playSound (name){
    var sound = new Audio('sounds/'+name+'.mp3');
    sound.play();
}
function gameOver(){
    setTimeout(() => {
        playSound('loser');
        $('h1').text("GAME OVER!");
        $('h1').append('<h3>Refresh the page to play again</h3>');
        
        $('#game-div').addClass('hidden');
        $('.start-div').addClass('hidden');
    }, 1000);
}
function gameWin(){
    setTimeout(() => {
        playSound('winner');
        $('h1').text("YOU WON!");
        $('h1').append('<h3>Refresh the page to play again</h3>');
        $('h3').css({'color':'green'});
        $('#game-div').addClass('hidden');
    }, 1000);
}