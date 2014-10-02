$(document).ready(function() {
    var gameTime;
    var score;
    var popupInterval;
    var popupTimeout;
    
    // FUNCTION TO DISABLE THE START BUTTON
    var disableStartButton = function() {
        $("#startButton").attr("disabled", "disabled");
    }
    
    // FUNCTION TO ENABLE THE START BUTTON
    var enableStartButton = function() {
        $("#startButton").removeAttr("disabled");
    }
    
    // FUNCTION TO INCREMENT THE SCORE BY ONE
    var incrementScore = function(score) {
        score++;
        return score;
    }
    
    // FUNCTION TO GENERATE A RANDOM INT BETWEEN 1 - 9
    var getRandomInt = function() {
        return Math.floor(Math.random() * 9) + 1;
    }
    
    // FUNCTION TO APPEND MOLE IMAGE TO A RANDOM BOX
    var showRandomMole = function(boxId) {
        $("<img id='mole' src='/img/bale.png' alt='bale mole'>").appendTo("#cell" + boxId).hide().fadeIn();
    }
    
    // FUNCTION TO HIDE THE MOLE
    var hideMole = function() {
        $("#mole").fadeOut().remove();
    }
    
    // FUNCTION TO EXPLODE THE MOLE WHEN CLICKED
    var explodeMole = function() {
        $("#mole").hide('explode', 1000)
        $("#mole").remove();
        console.log('killed him');
        console.log(popupInterval);
    }
    
    $("#startButton").click(function() {
        // START GAME WITH SCORE AT ZERO
        score = 0;
        
        // WHEN GAME STARTS, DISABLE THE START BUTTON
        disableStartButton();
        popupInterval = setInterval(function() {
            
            // GET A RANDOM NUMBER
            var boxId = getRandomInt();
            // SHOW MOLE IN THE RANDOM MOLE CELL
            showRandomMole(boxId);
            
            $(".box").on("click","img", function() {
                explodeMole();
            });
        }, 3000);
    });
});