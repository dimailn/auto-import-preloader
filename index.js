var utils = require('loader-utils');

module.exports = function(source) {
  var autoImportDefinitions = utils.parseQuery(this.query).source;
  var currentFileName = fileName(this.resourcePath);
  
  autoImportDefinitions.forEach(autoImport => {
    if(isNotDefinitionFile(autoImport, currentFileName) && containsImportUsage(autoImport, source)) {
      source = appendImport(autoImport, source);
    }
  });
 
  this.cacheable(); 
  return source;
};

function appendImport(autoImport, fileContent) {
  return `import ${autoImport.import} from '${autoImport.from}';\n` + fileContent;  
}

function containsImportUsage(autoImport, fileContent) {
  return fileContent.search(autoImport.search || autoImport.import) != -1;
}

function isNotDefinitionFile(autoImport, file) {
  return fileName(autoImport.from) != file;
}

function fileName(path) {
  return path.split('/').pop();
}
