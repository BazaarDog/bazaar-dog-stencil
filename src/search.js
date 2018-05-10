var elasticlunr = require("./assets/js/elasticlunr.min.js");
var listings = require("https://www.bazaar.dog/offline_search_bootstrap.json");

var config = {
    fields: {
        title: {boost: 2, bool: "AND"},
        body: {boost: 1}
    },
    bool: "OR",
    expand: true
};


var index = elasticlunr(function () {
    this.config = config;
    this.addField('title');
    this.addField('description');
    this.setRef('slug');
});

for (l of listings) {
    index.addDoc(l);
}
index.search('real');