<!-- Initialize Quill editor -->
var quill;
function initQuill() {
    // = new Quill('#editor');
 quill = new Quill('#editor', {
  theme: 'snow'
});
  quill.addModule('toolbar', { container: '#toolbar' });

  quill.on('text-change', function(delta, source) {
    console.log('Editor contents have changed', delta);
  });
}

function getId() {
  return window.location.pathname.slice(1);
}

function getPad(id) {
  return $.ajax('/api/pad/'+id)
}

function loadPad() {
  getPad(getId())
  .then(function(data) {
    // Update editor's content
    $("#editor").html(data);

    // Start quill
    initQuill();
  })
  .fail(function(err) {
    // Display error message
    console.error(err);
  });

}
function DBrequest() {
  console.log(window.location.pathname.slice(7));

  retrievePad(window.location.pathname.slice(7))
  .then(function(data) {
    // Update editor's content
    $("#editor").html(data);
    // console.log('data');
    // console.log(data);
    // Start quill
    initQuill();
  })
  .fail(function(err) {
    // Display error message
  });

}

function retrievePad(id) {
  return $.ajax('/api/retrieve/'+id)
}


if ( window.location.pathname.search("/share/") === -1 ) {
  loadPad();
} else {
  DBrequest();
}

$(function(){
  $('.submit').click(function(){
    //console.log('works');
    var text = encodeURIComponent(quill.getHTML());
    $.ajax('/api/insert/'+(text))
    .then(function(response){
      $('.shareurl').val(window.location.origin+'/share/'+response);
      // SelectText('shareurl');
    });


    //return $.ajax('/api/insert/'+(text));
  });
});

// function SelectText(element) {
//     var doc = document
//         , text = doc.getElementById(element)
//         , range, selection
//     ;    
//     if (doc.body.createTextRange) {
//         range = document.body.createTextRange();
//         range.moveToElementText(text);
//         range.select();
//     } else if (window.getSelection) {
//         selection = window.getSelection();        
//         range = document.createRange();
//         range.selectNodeContents(text);
//         selection.removeAllRanges();
//         selection.addRange(range);
//     }
// }
