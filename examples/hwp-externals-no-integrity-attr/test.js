var select = require('soupselect').select;
var expect = require('expect');
var htmlparser = require('htmlparser');
var fs = require('fs');

module.exports.check = function check(stats) {
  expect(stats.compilation.warnings.length).toEqual(1);
  expect(stats.compilation.warnings[0].message).toMatch(
    /does not have an integrity attribute. Consider adding it manually/
  );

  return new Promise((resolve, reject) => {
    var handler = new htmlparser.DefaultHandler(function htmlparserCallback(
      error,
      dom
    ) {
      var scripts;
      var i;

      if (error) {
        reject(error);
        return;
      }
      scripts = select(dom, 'script');
      expect(scripts.length).toEqual(2);
      expect(scripts[0].attribs.crossorigin).toBeUndefined();
      expect(scripts[0].attribs.integrity).toBeUndefined();

      resolve();
    });
    new htmlparser.Parser(handler).parseComplete(
      fs.readFileSync('./dist/index.html', 'utf-8')
    );
  });
};