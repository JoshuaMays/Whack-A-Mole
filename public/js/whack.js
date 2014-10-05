$(document).ready(function() {
    var gameTimer = 30;
    var score = 0;
    var record = 0;
    var moleInterval;
    var moleTimeoutId;
    var gameTimeout;
    var moleTimer;

    // INCREMENT THE SCORE BY ONE
    var incrementScore = function()
    {
        return ++score;
    }

    // GAME TIMER
    var timer = function()
    {
        gameTimer--;
        // DISPLAY NEW TIME LEFT
        $("#timeClock").html(gameTimer);
    }

    // GENERATE A RANDOM INT BETWEEN 1 - 9
    var getRandomInt = function()
    {
        return Math.floor(Math.random() * 9) + 1;
    }

    // APPEND MOLE IMAGE TO A RANDOM BOX
    var showRandomMole = function(boxId)
    {
        $("<img id='mole' src='/img/bale.png' alt='bale mole'>").appendTo("#cell" + boxId).hide().fadeIn();
        return $("#cell" + boxId);
    }

    // HIDE THE MOLE
    var hideMole = function()
    {
        $("#mole").fadeOut(500, function()
        {
            this.remove();
        });
        $("#mole").unbind("click");
        
    }

    // EXPLODE THE MOLE WHEN CLICKED
    var explodeMole = function()
    {

        $("#mole").hide('explode', 500).remove();
        if (moleTimeoutId !== null) {
        clearTimeout(moleTimeoutId);
        }
        $("#mole").unbind("click");
    }

    // START THE GAME
    var startGame = function()
    {

        // SET SCORE TO ZERO, AND GAMETIMER TO 30
        score = 0;
        gameTimer = 30;
        // INITIAL SPEED OF MOLE SPAWN
        moleTimer = 3000;
        // START GAMECLOCK COUNTDOWN
        setTimeout(endGame, 30000);
        // BEGIN MOLES
        newMole = setInterval(spawnMole, 1000);
    }
    
    var endGame = function()
    {
        // REPLACE HIGHSCORE WITH NEW SCORE
        if (score > record) {
            record = score;
        }

        // RESET GAME BACK TO START STATUS
        $("#highScore").html(record);
        $("#startButton").prop("disabled", false);
        $("#mole").unbind("click");
        $("#timeClock").hide();
        clearInterval(moleTimeoutId);
        clearInterval(newMole);
        clearInterval(gameTimerId);
    }

    // SETTING TIMEOUT FOR MOLES TO APPEAR AND DISAPPEAR
    var spawnMole = function(speed)
    {
        // HIDE ANY EXISTING MOLES
        hideMole();
        
        // GET RANDOM NUMBER TO PLACE MOLE
        var boxId = getRandomInt();
        var hole = showRandomMole(boxId);
        
        // SET COUNTDOWN FOR MOLES NOT CLICKED TO HIDE
        moleTimeoutId = setTimeout(function()
        {
            hideMole();
        }, moleTimer);
        
        
    }
    // ATTACH CLICK LISTENER TO ANY MOLE OBJECTS
    $("#gameBoard").on("click","#mole", function()
    {
        // KILL THE MOLE
        explodeMole();
        // INCREMENT THE SCORE
        incrementScore();
        // UPDATE SCOREBOARD
        $("#scoreBoard").html(score);
        
        // SPEED UP MOLES
        if(moleTimer > 100) {
            moleTimer -= 50;
        } else {
            moleTimer = 100;
        }
        $(this).unbind("click");
    });

    // CLICK LISTENER FOR START BUTTON
    $("#startButton").click(function()
    {
        startGame();
        $("#startButton").prop("disabled", true);
        $("#timeClock").show();
        gameTimerId = setInterval(timer, 1000);
    });

});