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

// TODO: Create relevant constants
var PROMPT_TYPE = {
  DRIVE_DIRECTION_SELECTOR: 'DRIVE_DIRECTION_SELECTOR',
  DRIVE_ROTATION_SELECTOR: 'DRIVE_ROTATION_SELECTOR',
  DRIVE_ROTATION_METRIC_SELECTOR: 'DRIVE_ROTATION_METRIC_SELECTOR',
  MOTOR_STOP_SELECTOR: 'MOTOR_STOP_SELECTOR',
  MULTI_LED_POSITION_SELECTOR: 'MULTI_LED_POSITION_SELECTOR',
  SINGLE_LED_POSITION_SELECTOR: 'SINGLE_LED_POSITION_SELECTOR',
  POWER_SPEED_SELECTOR: 'POWER_SPEED_SELECTOR',
  AUDIO_SELECTOR: 'AUDIO_SELECTOR',
  COLOR_SELECTOR: 'COLOR_SELECTOR',
  BOOLEAN_SELECTOR: 'BOOLEAN_SELECTOR',
  RELATION_OPERATION_SELECTOR: 'RELATION_OPERATION_SELECTOR',
  ARITHMETIC_OPERATION_SELECTOR: 'ARITHMETIC_OPERATION_SELECTOR',
  FUNCTION_SELECTOR: 'FUNCTION_SELECTOR',
  NUMBER_ROUNDING_SELECTOR: 'NUMBER_ROUNDING_SELECTOR',

  POWER_SLIDER: 'POWER_SLIDER',
  SPEED_SLIDER: 'SPEED_SLIDER',

  INT_NUMBER_INPUT: 'INT_NUMBER_INPUT',
  DOUBLE_NUMBER_INPUT: 'DOUBLE_NUMBER_INPUT',
  TEXT_INPUT: 'TEXT_INPUT'
};

var ACTION_TYPE = {
  SELECT_OPTION: 'SELECT_OPTION',
  MULTI_SELECT_OPTION: 'MULTI_SELECT_OPTION',
  SET_INPUT: 'SET_INPUT',
  SET_SLIDER: 'SET_SLIDER'
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

Blockly.NativeBridge.receiveMessage = function(message) {};
