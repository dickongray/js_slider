//slider *****************************
//looking for every element that has slider class attribute.
$('.slider').each(function (){
    //varibles are created
    // three of the varibles below have jquery ref.
    //and below that they are just normal varibles
    var $this = $(this);
    var $group = $this.find('.slide-group');
    var $slides = $this.find('.slide');
    var buttonArray = [];
    var currentIndex = 0;
    var timeout;
    //move function pramaeter with newindex sets up to var but doesn't declare var
    //this function moves it.
    function move(newIndex) {
        var animateLeft, slideLeft;
        //advanced function, is invoking the action
        advance();
        //if statment saying if var group is = animated or currentIndex = newIndex to
        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }
        //return mean stop function (basically if it is movein it out of there)
        // this is adding a class and removing a class. active relates to css
        //this is an array
        buttonArray[currentIndex].removeClass('active');
        buttonArray[newIndex].addClass('active');
        //this is showing the transition between slides
        if (newIndex > currentIndex){
            slideLeft = '100%';
            animateLeft = '-100%';
        }       else {
            slideLeft = '-100%';
            animateLeft = '100%';

        }
            //this display sets it to become invisble (block)
        $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );
        $group.animate( {left: animateLeft} , function() {
            $slides.eq(currentIndex).css( {display: 'none'} );
            $slides.eq(newIndex).css( {left: 0} );
            $group.css( {left: 0} );
                currentIndex = newIndex;
            });

    }
        //this function is advance, clear time out resets the timer and then we start timer to run every for secs.
    function advance() {
        clearTimeout(timeout);
        //here is currentIndex changing
        timeout = setTimeout(function() {
        if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
            } else {
        move(0);
        }
        }, 6000);
        }
        //above we have the speed of the interval
        //function below is a callback function/calling an arguement inside the function
        $.each($slides, function(index){
            //below this is a button
        var $button = $('<button type="button" class="slide-btn">&bull;</button>');
        if(index === currentIndex) {
            $button.addClass('active');
        }
        //above index is = to currentIndex then it becomes active.(three === means stricly compared to two which is just equals)
        $button.on('click', function(){

            move(index);
        //append means to put at the end, so this ref the slide buttons. This is putting the button in.
        //  when pushed this calss for the button.      
    }).appendTo('.slide-buttons');
        buttonArray.push($button);
    });
    advance();

    });

