var gemini = require('gemini');
var sizes = [
   // Перечисляем все нужные размеры
   {width: 1280, height:10000},
   //{width: 1024, height: 1000},
   //{width: 640, height: 1000},
   //{width: 320, height: 1000}
]

var pages = [
 {url: "http://kuznetcov.org/FAMALY/index.html", name: "main"},
 {url: "http://kuznetcov.org/FAMALY/catalog.html", name: "catalog"},
 {url: "http://kuznetcov.org/FAMALY/article.html", name: "article"},
 {url: "http://kuznetcov.org/FAMALY/lesson.html", name: "lesson"},
 {url: "http://kuznetcov.org/FAMALY/registration.html", name: "registration"},
 {url: "http://kuznetcov.org/FAMALY/test.html", name: "test"}
]

pages.forEach(function(page){
	sizes.forEach(function(size) {
	    gemini.suite(size.width + '---' +page.name, function(suite) {
	           suite.before(function(actions) {
	                  actions.setWindowSize(size.width, size.height);
	           });
	           suite.setUrl(page.url)
	           .setCaptureElements('body')
	           .capture('plain')
	    })
	});
});



