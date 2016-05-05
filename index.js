module.exports = function parsePluralForm (form) {
  var PLURAL_FORM_REGEXP = /^(\s*nplurals\s*=\s*[0-9]+\s*;\s*plural\s*=\s*(?:\s|[-\?\|&=!<>+*/%:;a-zA-Z0-9_()])+)$/m;

  if (PLURAL_FORM_REGEXP.test(form)) {
    var pf = form;
    if (!/;\s*$/.test(pf)) {
      pf += ';';
    }

    var code = [
      'var plural;',
      'var nplurals;',
      pf,
      'return (plural === true ? 1 : plural ? plural : 0);'
    ].join('\n');

    return new Function('n', code);
  }

  throw new SyntaxError('Plural-Forms is invalid [' + form + ']');
};
