// document.querySelectorAll('.vjs-text-track-display')[1].innerText
var prevText;
var wordsList = [];
var massList = [];
var masstext;
var literallyEverything;

// Create btns
var createBtn = document.createElement('button');
createBtn.id = 'create';
createBtn.type = 'button';
createBtn.innerHTML = '<span class="buttonText">Create File</span>';
createBtn.classList.add('dropdownHandle')
document.querySelector('.mediaCitation').insertAdjacentElement('beforebegin',createBtn);

// Download btn
var download = document.createElement('a');
download.id = 'downloadlink';
// download.type = 'span';
// download.download='info.txt';
download.download = `transcript_${Date.now()}`;
download.innerText = '  Download File';


document.querySelector('.mediaCitation').insertAdjacentElement('beforebegin',download);



function record(){
    let currentText = document.querySelectorAll('.vjs-text-track-display')[1].innerText.replace(/\n/g, ' ');

    if(currentText != prevText){
        wordsList.push(currentText);
        // console.log(wordsList);
    }

    // currentText != prevText?
    
    // console.log(currentText):
    // console.log('.');

    prevText = currentText;

    if(wordsList.length >= 5){
        masstext = wordsList.join(' ');
        console.log(masstext);
        massList.push(masstext);
        wordsList = [];
        console.log('%c ... ', 'background: #222; color: #ffff00');

    }

}






// repeater
var intervalId = window.setInterval(function(){
    /// call your function here
    record();
  }, 500);



// Btn functions

function massListJoin(){
    return(massList.join(' '));
}






    (function () {
        var textFile = null,
          makeTextFile = function (text) {
            var data = new Blob([text], {type: 'text/plain'});
        
            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
              window.URL.revokeObjectURL(textFile);
            }
            
            textFile = window.URL.createObjectURL(data);
        
            return textFile;
          };
        
        
          var create = document.getElementById('create'),
            textbox = document.getElementById('textbox');
        
          create.addEventListener('click', function () {

             // master text
            // let value = massList.join(' ');

            var link = document.getElementById('downloadlink');
            link.href = makeTextFile(massListJoin());
            link.style.display = 'block';
          }, false);
        })();
        

    
