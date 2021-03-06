---
---
'use strict';
window.store = {
  {% for post in site.posts %}
    "{{ post.url | slugify }}": {
      "title": "{{ post.title | xml_escape }}",
      "author": "{{ post.author | xml_escape }}",
      "date": "{{ post.date | date_to_string }}",
      "category": "{{ post.category | xml_escape }}",
      "content": {{ post.content | strip_html | strip_newlines | jsonify }},
      "url": "{{ post.url | xml_escape }}"
    }
    {% unless forloop.last %},{% endunless %}
  {% endfor %}
};

(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '<ul class="list-group">';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        var author = item.author ? '<small>' + item.author + '</small>' : '';
        var appendString = appendString + 
        '<a href="' + item.url + '" class="list-group-item list-group-item-action flex-column align-items-start">\
          <div class="d-flex w-100 justify-content-between">\
            <h3 class="mb-1">' + item.title + '</h3>\
            <small>' + item.date + '</small>\
          </div>\
          <p class="mb-1">' + item.content.substring(0, 150) + '</p>\
          ' + author + '\
        </a>';
      }

      searchResults.innerHTML = appendString + '</ul>';
    } else {
      searchResults.innerHTML = '<div class="alert alert-danger" role="alert">\
        No results found.\
      </div>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();
