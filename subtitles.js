
// Create transcripts of talks from subtitles

var prevText;
var wordsList = [];
var massList = [];
var masstext;


// Create file button
var createBtn = document.createElement('button');
createBtn.id = 'create';
createBtn.type = 'button';
createBtn.innerHTML = '<span class="buttonText">Create File</span>';
createBtn.classList.add('dropdownHandle')
document.querySelector('.mediaCitation').insertAdjacentElement('beforebegin',createBtn);


// Download file button
var download = document.createElement('a');
download.id = 'downloadlink';
download.download = `transcript_${Date.now()}`;
download.innerText = '  Download File';
document.querySelector('.mediaCitation').insertAdjacentElement('beforebegin',download);


// Check subtitles box
function record(){

    // Get text, check if new
    let currentText = document.querySelectorAll('.vjs-text-track-display')[1].innerText.replace(/\n/g, ' ');

    // Push to small list
    if(currentText != prevText){
        wordsList.push(currentText);
    }


    prevText = currentText;

    // Combine small list into big list, refresh
    if(wordsList.length >= 5){
        masstext = wordsList.join(' ');
        console.log(masstext);
        massList.push(masstext);
        wordsList = [];
        console.log('%c ... ', 'background: #222; color: #ffff00');

    }

}

// Check every 0.5s for new text
var intervalId = window.setInterval(function(){
    /// 
    record();
  }, 500);



// Saving functions

// Convert mass array into text
function massListJoin(){
    return(massList.join(' '));
}

// Create / Save Buttons
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
        
        
          var create = document.getElementById('create');
        
          create.addEventListener('click', function () {
            var link = document.getElementById('downloadlink');
            link.href = makeTextFile(massListJoin());
            link.style.display = 'block';
          }, false);
        })();
        

    
