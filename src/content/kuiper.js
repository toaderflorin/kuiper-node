var allFiles = [];

function loadNext(i) {
  var fileName = allFiles[i];
  $.get(fileName, function (contents) {    
    $('#xyz').append(contents);  
    if (i + 1 < allFiles.length) {
      loadNext(i + 1);
    }     
  });
}

$(function () {
  $.get('./content.json', function (data) {
    allFiles = data;
    loadNext(0)   
  });
});