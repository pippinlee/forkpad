<!-- Initialize Quill editor -->

function initQuill() {
  var quill = new Quill('#editor');
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
  });

}

loadPad();
