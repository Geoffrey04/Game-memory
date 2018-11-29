// array of <img> elements:
var tbl_card = [
    'Card/Card_Atom.jpg',
    'Card/Card_Atom.jpg',
    'Card/Card_Cersei.jpg',
    'Card/Card_Cersei.jpg',
    'Card/Card_Chrome.jpg',
    'Card/Card_Chrome.jpg',
    'Card/Card_css.png',
    'Card/Card_css.png',
    'Card/Card_html.jpg',
    'Card/Card_html.jpg',
    'Card/Card_Joffrey.jpg',
    'Card/Card_Joffrey.jpg',
    'Card/Card_JS.png',
    'Card/Card_JS.png',
    'Card/Card_mozilla.jpg',
    'Card/Card_mozilla.jpg'
];



// Variables :

var nbclick = 0;

var i = 0;

var cases = document.getElementById('case');

var tbl_selec = [];

var pairs = 0;

// function for create <img> and <div> elements and display in user screen :

function create_Card() {
    for (i = 0; i < tbl_card.length; i++) {

        var test = tbl_card;
        // create elements :
        var card = document.createElement('img');
        var new_div = document.createElement('div');


        // id of <div> :
        new_div.id = 'pictures_n' + [i];
        // Class of <div> :
        new_div.className = 'div_pictures';
        // Position <div> :
        new_div.style.display = 'inline-block';
        new_div.style.margin = "24px";
        card.src = test[i];

        // id of <img> :
        card.id = 'r_card' + i;
        cases.appendChild(new_div);
        new_div.appendChild(card);
        card.style.visibility = 'hidden';

    }

    console.log(tbl_card);
}

// Function for random position cards on screen :
function melanger() {
    for (var pos = tbl_card.length - 1; pos >= 1; pos--) {

        var random = Math.floor(Math.random() * (pos + 1));
        var save = tbl_card[pos];
        tbl_card[pos] = tbl_card[random];
        tbl_card[random] = save;

    }
}

// call functions :

melanger();
create_Card();
newscore();


// variables for timer :
var start = 0;
var time;
var different = 0;
var end = 0;
var sec;
var min;
var msc;



// function timer :
function score() {

    end = new Date();
    different = end - start;
    different = new Date(different);
    msc = different.getMilliseconds();
    sec = different.getSeconds();
    min = different.getMinutes();


    if (min < 10) {
        min = "0" + min
    }

    if (sec < 10) {
        sec = "0" + sec
    }

    if (msc < 10) {
        msc = "00" + msc

    }
    else if (msc < 100) {
        msc = "0" + msc
    }

    document.getElementById("timer").innerHTML = min + ":" + sec ;
    document.getElementById("timer").style.fontSize= "40px";

    time = setTimeout("score()", 10);

    };

// function timer2 :
function newscore() {

    start = new Date();
    score();
  }

newscore();

// function for button reset :
function Reset() {
    location.reload();
  }

// var choice 1 and choice 2
var carte1, carte2 = -1;

//  Mechanics of the game :
for (let e = 0; e < tbl_card.length; e++) {

    // Event for click 1 and click 2 :
    document.getElementById('pictures_n' + e).addEventListener("click",
        function () {

            if (nbclick < 2) {
                nbclick++;
                console.log("nbclick:" + ' ' + nbclick);


                if (nbclick === 1) {
                    if(document.getElementById('r_card' + e).style.visibility=='hidden') {
                    carte1 = e;
                    carte2 = -1;



                        tbl_selec.push(carte1);
                        var choix1 = tbl_card[carte1];

                        console.log(choix1);

                        document.getElementById('pictures_n' + carte1).style.visibility = 'hidden';
                        document.getElementById('r_card' + carte1).style.visibility = 'visible';
                    }
                }

                if (nbclick == 2) {
                    if(document.getElementById('r_card' + e).style.visibility=='hidden') {
                    carte2 = e;



                        tbl_selec.push(carte2);
                        var choix2 = tbl_card[carte2];

                        console.log(choix2);
                        console.log(tbl_selec);

                        document.getElementById('pictures_n' + carte2).style.visibility = 'hidden';
                        document.getElementById('r_card' + carte2).style.visibility = 'visible';

                    }
                }


                if (nbclick == 2) {

                    // This "if" it's for 2 same cards find , also carte1 and carte2 are ever visible:
                    if (tbl_card[carte1] === tbl_card[carte2]) {

                        document.getElementById('pictures_n' + carte1).style.visibility = 'hidden';
                        document.getElementById('r_card' + carte1).style.visibility = 'visible';


                            document.getElementById('pictures_n' + carte2).style.visibility = 'hidden';
                            document.getElementById('r_card' + carte2).style.visibility = 'visible';


                        nbclick = 0;
                        pairs++;
                        console.log(pairs);



                    }
                    // Condition for pairs find , display victory screen :
                    if(pairs === 8) {

                        document.getElementById('screen_result').style.display = 'inline-block';

                        document.getElementById('text_win').innerHTML = 'vous avez trouvez :' + ' ' + pairs + ' ' + 'paire(s)' +  '<br>' + 'en' + '' + ':' + min + 'min' + ' ' + 'et' + ' ' + sec + 'sec'  ;
                        document.getElementById('screen').style.display='none';
                        document.getElementById('resetbutton').style.display='inline-block';
                        document.getElementById('timer').style.display = 'none';


                    }


                    // This "if" it's for carte1 and carte2 are different , also they are return :
                    if (tbl_card[carte1] != tbl_card[carte2]) {



                        setTimeout(function () {

                                    document.getElementById('pictures_n' + carte1).style.visibility = 'visible';
                                    document.getElementById('r_card' + carte1).style.visibility = 'hidden';

                                    if(carte2 > -1) {
                                        document.getElementById('pictures_n' + carte2).style.visibility = 'visible';
                                        document.getElementById('r_card' + carte2).style.visibility = 'hidden';
                                    }


                            nbclick = 0;


                        }, 1000);
                    }


                }
            }
        }
    )
};

