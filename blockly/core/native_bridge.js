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

function transformBlockContextTitle(title) {
  return title.replace('block_', '').replace(/_/g, ' ');
}

function calculateMinMaxValueForSlider(sourceBlock) {
  var parentInputList = sourceBlock.getParent().inputList;
  var lastField = parentInputList[parentInputList.length - 1].fieldRow[0];
  var fieldValue = lastField.getValue();

  return [0, fieldValue == 'Motor.UNIT_SPEED_RPM' ? 170 : 100];
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

Blockly.NativeBridge.slider = function(type, title, defaultValue, sourceBlock, callback) {
  var minMax = calculateMinMaxValueForSlider(sourceBlock);
  var sliderObject = {
    title: title,
    defaultValue: defaultValue,
    minimum: minMax[0],
    maximum: minMax[1]
  };

  Blockly.prompt(type, JSON.stringify(sliderObject), callback);
};

Blockly.NativeBridge.blockContext = function(title, comment, callback) {
  var contextObject = {
    title: title,
    comment: comment
  };

  Blockly.prompt(transformBlockContextTitle(title), JSON.stringify(contextObject), callback);
};
