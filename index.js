var utils = require('loader-utils');

module.exports = function(source) {
  var autoImportDefinitions = utils.parseQuery(this.query).source;
  var currentFileName = fileName(this.resourcePath);
  
  autoImportDefinitions.forEach(autoImport => {
    if(isNotDefinitionFile(autoImport, currentFileName) &&
        isNotImportedManually(autoImport, source) &&
        containsImportUsage(autoImport, source)) {

      source = appendImport(autoImport, source);
    }
  });
 
  this.cacheable(); 
  return source;
};

function appendImport(autoImport, fileContent) {
  return `${autoImport.import} = require '${autoImport.from}'\n` + fileContent;  
}

function containsImportUsage(autoImport, fileContent) {
  return fileContent.search(autoImport.search || autoImport.import) != -1 ||
    autoImport.import == 'React' && (fileContent.search(/<\w+>/) || fileContent.search(/<\w+\/>/));
}

function isNotDefinitionFile(autoImport, file) {
  return fileName(autoImport.from) != file;
}

function isNotImportedManually(autoImport, fileContent) {
  return fileContent.search(`${autoImport.import} =`) == -1;
}

function fileName(path) {
  return path.split('/').pop();
}
