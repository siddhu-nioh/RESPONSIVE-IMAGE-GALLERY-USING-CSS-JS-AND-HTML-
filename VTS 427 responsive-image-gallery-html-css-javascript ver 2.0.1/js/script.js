
$(document).ready(function() {
  var originalOrder = null;

  // Function to store the original order of images
  function storeOriginalOrder() {
    originalOrder = $('.container').children('.card').toArray();
  }

  // Call the function to store original order when the page loads
  storeOriginalOrder();

  // Filter functionality
  $('.filter-btn').on('click', function() {
    var category = $(this).data('category');
    if (category === 'all') {
      $('.card').show();
    } else {
      $('.card').hide().filter('[data-category="' + category + '"]').show();
    }
  });

  // Sorting functionality
  $('#sort-select').on('change', function() {
    var criterion = $(this).val();
    if (criterion === 'None') {
      // Show images in original order
      $('.container').html(originalOrder);
    } else {
      var $container = $('.container');
      var $cards = $container.children('.card').detach();
      $cards.sort(function(a, b) {
        var aValue = $(a).data(criterion);
        var bValue = $(b).data(criterion);
        return aValue.localeCompare(bValue);
      });
      $container.append($cards);
    }
  });

  // Search functionality
  // Listen for input event on the search input field
$('#search-input').on('input', function() {
  // Get the value entered in the search input field and convert it to lowercase
  var searchTerm = $(this).val().toLowerCase();
  
  // Hide all card elements and filter them based on the search term
  $('.card').hide().filter(function() {
      // Get the data-category attribute value of each card and convert it to lowercase
      var imageTags = $(this).data('category').toLowerCase();
      // Check if the search term is found in the data-category attribute value
      return imageTags.indexOf(searchTerm) > -1;
  }).show(); // Show the filtered cards
});


  // FancyBox Configuration
  $('[data-fancybox="gallery"]').fancybox({
    buttons: [
      "slideShow",
      "thumbs",
      "zoom",
      "fullScreen",
      "share",
      "close"
    ],
    loop: false,
    protect: true
  });
  
});
