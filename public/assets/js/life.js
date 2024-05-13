const showFacts = function(image, imageName) {

  // Hide the following elements
  $('#life-forms').css('display', 'none');
  $('header h3').html(imageName + ' Facts' );
  $('#find-a-park').css('display', 'none');

  // Display the following elements
  $('.back').css('display', 'block');

  // Add CSS styles to the .container element
  $('.container').css('background', '#98c26d');

  // Store the #facts element in a variable named factsSection and add CSS styles
  const factsSection = $("#facts");
  factsSection.css('margin-top', '20px');

  // Clear the #facts element before populating it with new information
  if(factsSection !== " ") {
    $("#facts").html("");
  }

  // Save the URL to access the mediaWiki API in a variable named url which includes: the endpoint to access the API's server address +
  // action=query to get information + list=search to find matching pages + srlimit=1 to return a maximum of 1 matching page +
  // srsearch=inputText to search for page titles/content matching the image name clicked by the user + format=json to receive data in JSON format +
  // prop=revisions to get the most recent page revision + origin=* for non-authenticated requests
  const url = "https://simple.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&srsearch=" + imageName  + "&format=json&prop=revisions&origin=*";

    $.ajax({
      url: url,
      method: 'GET'
    }).done(function(response) {
      console.log('Wikipedia:', response);
      const titles = response.query.search[0].title;
      const snippets = response.query.search[0].snippet;

      //Add specific data to the DOM
      const detailsDiv = $('<div>').attr('class', 'col-md-4 col-md-offset-1');
      detailsDiv.html('<a href="https://simple.wikipedia.org/wiki/' + titles + '" target="_blank">' + '<h2>' + titles + '</h2>' +
        '<p>' + snippets + ' . . . <span class="click-link">(click this link for the complete article from simple.wikipedia.org)</span>' + '</p>' + '</a>').css('font-size', '18px');
      factsSection.append(image);
      factsSection.append(detailsDiv);

      // Store the lowercase version of the image name in a variable called searchKeyword
      const searchKeyword = imageName.toLowerCase();

      // Add Google Custom Search field to the DOM
      const moreInfoDiv = $('<div>').attr('class', 'more-info');
      const googleSearchIntro = $('<h4>').attr('class', 'gcs text-center');
      googleSearchIntro.html('Use the word <span class="underline">' + searchKeyword +
        '</span> as the keyword to search for more images and information with Google.');
      const googleSearch = $('<div>' +
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
  const image = this;
  console.log('This Image: ', this); // figure element

  // Remove classes from the figure element and add new CSS styles
  $('.park-life').removeClass('col-md-3 park-life');
  $('figure').attr('class', 'col-md-4 col-md-offset-2').css('width', '30%').css('padding', '0');
  $('figure img').css('width', '100%');

  // Store the image name in a variable named imageName
  const imageName = $(this).attr('id');
  console.log('Image Name: ', imageName);

  showFacts(image, imageName);
});