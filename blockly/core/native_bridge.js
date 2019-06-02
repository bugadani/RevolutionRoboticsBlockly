'use strict';

goog.provide('Blockly.NativeBridge');

function map2DArrayToKeyValueArray(array) {
  return array.map(function(element) {
    return { key: element[1], value: element[0] };
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

Blockly.NativeBridge.createPromptType = function(sourceBlockType, fieldName) {
  return `${sourceBlockType}.${fieldName}`;
};

Blockly.NativeBridge.optionSelector = function(type, defaultOption, options, callback) {
  var optionSelectorObject = {
    title: mapOptionSelectorTypeToTitle(type),
    defaultOption: defaultOption,
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

  Blockly.prompt('BLOCK_CONTEXT', JSON.stringify(contextObject), callback);
};
