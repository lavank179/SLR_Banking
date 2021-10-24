let dele_center = document.querySelector(".dele");

// mobile();
// function mobile(){

//     const mql = window.matchMedia('screen and (max-width: 575px)');

//     checkMedia(mql);
//     mql.addListener(checkMedia);

//     function checkMedia(mql){

//         if(mql.matches){
//         }
//     }
// }

// tablet();
// function tablet(){

//     const mql = window.matchMedia('screen and (min-width: 576px) and (max-width: 991px)');

//     checkMedia(mql);
//     mql.addListener(checkMedia);

//     function checkMedia(mql){

//         if(mql.matches){
//         }
//     }
// }


// desktop();
// function desktop(){

//     const mql = window.matchMedia('screen and (min-width: 992px)');

//     checkMedia(mql);
//     mql.addListener(checkMedia);

//     function checkMedia(mql){

//         if(mql.matches){
//         }
//     }
// }

text_center();
function text_center(){

    const mql = window.matchMedia('screen and (min-width: 768px)');

    checkMedia(mql);
    mql.addListener(checkMedia);

    function checkMedia(mql){

        if(mql.matches){
            dele_center.classList.add('center-text');
        } else {
            dele_center.classList.remove('center-text');
        }
    }
}