var showFacts = function(image, imageName) {

  // Hide the following elements
  $('#life-forms').css('display', 'none');
  $('.get-facts h3').html(imageName + ' Facts' );
  $('#find-a-park').css('display', 'none');

  // Display the following elements
  $('.back').css('display', 'block');

  // Add CSS styles to the .container element
  $('.container').css('background', '#98c26d');

  // Store the #facts element in a variable named factsSection and add CSS styles
  var factsSection = $("#facts");
  factsSection.css('margin-top', '20px');

  // Clear the #facts element before populating it with new information
  if(factsSection !== " ") {
    $("#facts").html("");
  }

  // Save the URL to access the mediaWiki API in a variable named url which includes: the endpoint to access the API's server address +
  // action=query to get information + list=search to find matching pages + srlimit=1 to return a maximum of 1 matching page +
  // srsearch=inputText to search for page titles/content matching the image name clicked by the user + format=json to receive data in JSON format +
  // prop=revisions to get the most recent page revision + origin=* for non-authenticated requests
  var url = "https://simple.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&srsearch=" + imageName  + "&format=json&prop=revisions&origin=*";

    $.ajax({
      url: url,
      method: 'GET'
    }).done(function(response) {
      console.log('Wikipedia:', response);
      var titles = response.query.search[0].title;
      var snippets = response.query.search[0].snippet;

      //Add specific data to the DOM
      var detailsDiv = $('<div>').attr('class', 'col-md-4 col-md-offset-1');
      detailsDiv.html('<a href="https://simple.wikipedia.org/wiki/' + titles + '" target="_blank">' + '<h2>' + titles + '</h2>' +
        '<p>' + snippets + ' . . . <span class="click-link">(click this link for the complete article from simple.wikipedia.org)</span>' + '</p>' + '</a>').css('font-size', '18px');
      factsSection.append(image);
      factsSection.append(detailsDiv);

      // Store the lowercase version of the image name in a variable called searchKeyword
      var searchKeyword = imageName.toLowerCase();

      // Add Google Custom Search field to the DOM
      var moreInfoDiv = $('<div>').attr('class', 'more-info');
      var googleSearchIntro = $('<h4>').attr('class', 'gcs text-center');
      googleSearchIntro.html('Use the word <span class="underline">' + searchKeyword +
        '</span> as the keyword to search for more images and information with Google.');
      var googleSearch = $('<div>' +
          '<script>' +
            '(function() {' +
              'var cx = "000036741551959466978:zhuofdm0aga";' +
              'var gcse = document.createElement("script");' +
              'gcse.type = "text/javascript";' +
              'gcse.async = true;' +
              'gcse.src = "https://cse.google.com/cse.js?cx=" + cx;' +
              'var s = document.getElementsByTagName("script")[0];' +
              's.parentNode.insertBefore(gcse, s);' +
            '})();' +
          '</script>' +
          '<gcse:search></gcse:search>' +
        '</div>');
      moreInfoDiv.append(googleSearchIntro);
      moreInfoDiv.append(googleSearch);
      factsSection.append(moreInfoDiv);

    }).fail(function(err) {
    console.log('An error occurred');
  });
};

$('.park-life').on('click', function() {
  $('.park-life').off();

  // Store the clicked figure in a variable named image
  var image = this;
  console.log('This Image: ', this); // figure element

  // Remove classes from the figure element and add new CSS styles
  $('.park-life').removeClass('col-md-3 park-life');
  $('figure').attr('class', 'col-md-4 col-md-offset-2').css('width', '30%').css('padding', '0');
  $('figure img').css('width', '100%');

  // Store the image name in a variable named imageName
  var imageName = $(this).attr('id');
  console.log('Image Name: ', imageName);

  showFacts(image, imageName);
});