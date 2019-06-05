'use strict';

goog.provide('Blockly.NativeBridge');

function map2DArrayToKeyValueArray(array) {
  return array.map(function(element) {
    if (Array.isArray(element)) return { key: element[1], value: element[0] };

    return { key: element, value: element };
  });
}

function mapOptionSelectorTypeToTitle(promptType) {
  // TODO: Map prompt types to titles
  return `Title of ${promptType}`;
}

Blockly.NativeBridge.CONTEXT_ACTION_TYPE = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  DELETE_BLOCK: 'DELETE_BLOCK',
  HELP: 'HELP',
  DUPLICATE_BLOCK: 'DUPLICATE_BLOCK'
};

Blockly.NativeBridge.createPromptType = function(sourceBlock, field) {
  if (sourceBlock.isShadow()) {
    var parentBlock = sourceBlock.getParent();
    var childrenIDs = parentBlock.getChildren().map(child => child.id);
    var index = childrenIDs.findIndex(id => sourceBlock.id === id);
    var inputNames = parentBlock.inputList
      .filter(input => input.type === 1)
      .map(input => input.name);

    var fieldName = inputNames[index].toLowerCase();

    return `${parentBlock.type}.${fieldName}.${sourceBlock.type}.${field.name.toLowerCase()}`;
  }

  return `${sourceBlock.type}.${field.name.toLowerCase()}`;
};

Blockly.NativeBridge.optionSelector = function(type, defaultKey, options, callback) {
  var optionSelectorObject = {
    title: mapOptionSelectorTypeToTitle(type),
    defaultKey: defaultKey,
    options: map2DArrayToKeyValueArray(options)
  };

  Blockly.prompt(type, JSON.stringify(optionSelectorObject), callback);
};

Blockly.NativeBridge.input = function(type, title, defaultInput, callback) {
  var textInputObject = {
    title: title,
    defaultInput: defaultInput
  };

  Blockly.prompt(type, JSON.stringify(textInputObject), callback);
};

Blockly.NativeBridge.blockContext = function(title, comment, callback) {
  var contextObject = {
    title: title,
    comment: comment
  };

  Blockly.prompt('block_context', JSON.stringify(contextObject), callback);
};
