'use strict';

goog.require('Blockly.Python');

// Generator block_terminate_program
Blockly.Python['block_terminate_program'] = function(block) {
  var code = 'Control.terminate_program()\n';
  return code;
};

// Generator block_terminate_all
Blockly.Python['block_terminate_allblock_terminate_all'] = function(block) {
  var code = 'Control.terminate_all()\n';
  return code;
};

// Generator block_wait
Blockly.Python['block_wait'] = function(block) {
  var value_wait = Blockly.Python.valueToCode(block, 'WAIT', Blockly.Python.ORDER_ATOMIC);
  var code = 'time.sleep(' + value_wait + ')\n';
  return code;
};

// Generator block_global_timer
Blockly.Python['block_global_timer'] = function(block) {
  var code = 'Control.get_global_timer()\n';
  return code;
};

// Generator block_repeat_forever
Blockly.Python['block_repeat_forever'] = function(block) {
  var statements_statement = Blockly.Python.statementToCode(block, 'STATEMENT');
  var branch = Blockly.Python.addLoopTrap(statements_statement, block.id) || Blockly.Python.PASS;

  var code = 'while True:\n' + branch;
  return code;
};

// Generator block_break
Blockly.Python['block_break'] = function(block) {
  var code = 'break\n';
  return code;
};

// Generator block_repeat_while
Blockly.Python['block_repeat_while'] = function(block) {
  var value_condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_ATOMIC);
  var statements_statement = Blockly.Python.statementToCode(block, 'STATEMENT');

  var branch = Blockly.Python.addLoopTrap(statements_statement, block.id) || Blockly.Python.PASS;

  var code = 'while ' + (value_condition || 'False') + ':\n' + branch;
  return code;
};

// Generator block_repeat_until
Blockly.Python['block_repeat_until'] = function(block) {
  var statements_statement = Blockly.Python.statementToCode(block, 'STATEMENT');
  var value_condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_ATOMIC);

  var branch = Blockly.Python.addLoopTrap(statements_statement, block.id) || Blockly.Python.PASS;

  branch += '  if ' + (value_condition || 'True') + ': break\n';

  var code = 'while True:\n' + branch;
  return code;
};

// Generator block_drive
Blockly.Python['block_drive'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var number_rotation = Blockly.Python.valueToCode(block, 'ROTATION', Blockly.Python.ORDER_ATOMIC);
  var unit_rotation = block.getFieldValue('UNIT_ROTATION');
  var number_speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC);
  var unit_speed = block.getFieldValue('UNIT_SPEED');

  var code =
    'robot.drive(' +
    'direction=' +
    dropdown_direction +
    ', ' +
    'rotation=' +
    number_rotation +
    ', ' +
    'unit_rotation=' +
    unit_rotation +
    ', ' +
    'speed=' +
    number_speed +
    ', ' +
    'unit_speed=' +
    unit_speed +
    ')\n';
  return code;
};

// Generator block_motor
Blockly.Python['block_motor'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var direction = block.getFieldValue('DIRECTION');
  var amount = Blockly.Python.valueToCode(block, 'AMOUNT', Blockly.Python.ORDER_ATOMIC);
  var unit_amount = block.getFieldValue('UNIT_AMOUNT');
  var limit = Blockly.Python.valueToCode(block, 'LIMIT', Blockly.Python.ORDER_ATOMIC);
  var unit_limit = block.getFieldValue('UNIT_LIMIT');

  var code =
  `robot.motors["${text_name}"].move(` +    
    'direction=' +
    direction +
    ', ' +
    'amount=' +
    amount +
    ', ' +
    'unit_amount=' +
    unit_amount +
    ', ' +
    'limit=' +
    limit +
    ', ' +
    'unit_limit=' +
    unit_limit +
    ')\n';

  return code;
};

// Generator block_stop_motor
Blockly.Python['block_stop_motor'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_action = block.getFieldValue('STOP_ACTION');

  var code = `robot.motors["${text_name}"].stop(` 
  + 'action=' + dropdown_action + ')\n';
  return code;
};

// Generator block_stop_all_motors
Blockly.Python['block_stop_all_motors'] = function(block) {
  var dropdown_action = block.getFieldValue('STOP_ALL_ACTION');

  var code = 'robot.stop_all_motors(action=' + dropdown_action + ')\n';
  return code;
};

// Generator block_ultrasonic_sensor
Blockly.Python['block_ultrasonic_sensor'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  
  var code = `robot.sensors["${text_name}"].read()`;

  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_bumper
Blockly.Python['block_bumper'] = function(block) {
  var text_name = block.getFieldValue('NAME');

  var code = `robot.sensors["${text_name}"].read()`;
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_tilt
Blockly.Python['block_tilt'] = function(block) {
  var dropdown_tilt = block.getFieldValue('DIRECTION_TILT');

  var code = 'Sensor.get_tilt_state(direction=' + dropdown_tilt + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_play_note
Blockly.Python['block_play_note'] = function(block) {
  var dropdown_octave = block.getFieldValue('OCTAVE');
  var dropdown_key = block.getFieldValue('KEY');
  var value_duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_robot_lib'] = 'import robot_lib';
  var code =
    'Sound.play_note(' +
    'octave=' +
    dropdown_octave +
    ', ' +
    'key=' +
    dropdown_key +
    ', ' +
    'duration=' +
    value_duration +
    ')\n';
  return code;
};

// Generator block_play_tune
Blockly.Python['play_tune'] = function(block) {
  var dropdown_tune = block.getFieldValue('IN_SOUND');

  var code = "robot.play_tune('" + dropdown_tune + "')";
  return code;
};

// Generator block_stop_playback
Blockly.Python['block_stop_playback'] = function(block) {
  var code = 'Sound.stop_playback()\n';
  return code;
};

// Generator block_set_led
Blockly.Python['block_set_led'] = function(block) {
  var value_led = Blockly.Python.valueToCode(block, 'LED', Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);

  var code = 'Light.set(' + 'led_index=' + value_led + ', ' + 'color=' + value_color + ')';
  return code;
};

// Generator block_bumper
Blockly.Python['logic_and'] = function(block) {
  var value_left = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_ATOMIC);
  var value_right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
  var code = value_left + ' and ' + value_right;
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_bumper
Blockly.Python['logic_or'] = function(block) {
  var value_left = Blockly.Python.valueToCode(block, 'LEFT', Blockly.Python.ORDER_ATOMIC);
  var value_right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
  var code = value_left + ' or ' + value_right;
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_bumper
Blockly.Python['logic_not'] = function(block) {
  var value_right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
  var code = 'not ' + value_right;
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_bumper
Blockly.Python['math_trig2'] = function(block) {
  var value_right = Blockly.Python.valueToCode(block, 'RIGHT', Blockly.Python.ORDER_ATOMIC);
  var selected_option = block.getFieldValue('MATH_TRIG');

  Blockly.Python.definitions_['import_math'] = 'import math';
  var code = 'math.' + selected_option + '(' + value_right + ')';

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['if_then_else'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;

  conditionCode = Blockly.Python.valueToCode(block, 'COND',
      Blockly.Python.ORDER_NONE) || 'False';

    branchCode = Blockly.Python.statementToCode(block, 'IN_IF') ||
        Blockly.Python.PASS;
    code += (n == 0 ? 'if ' : 'elif ' ) + conditionCode + ':\n' + branchCode;

  if (block.getInput('IN_ELSE')) {
    branchCode = Blockly.Python.statementToCode(block, 'IN_ELSE') ||
        Blockly.Python.PASS;
    code += 'else:\n' + branchCode;
  }
  return code;
};

Blockly.Python['if_then'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  
  conditionCode = Blockly.Python.valueToCode(block, 'COND',
      Blockly.Python.ORDER_NONE) || 'False';

    branchCode = Blockly.Python.statementToCode(block, 'IN_IF') ||
        Blockly.Python.PASS;
    code += (n == 0 ? 'if ' : 'elif ' ) + conditionCode + ':\n' + branchCode;
  
  return code;
};

// Generator block_motor
Blockly.Python['spin_motor'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var number_rotation = Blockly.Python.valueToCode(block, 'ROTATION', Blockly.Python.ORDER_ATOMIC);
  var dropdown_unit = block.getFieldValue('UNIT_SPEED');

  var code =
    `robot.motors["${text_name}"].spin(` +
    'direction=' +
    dropdown_direction +
    ', ' +
    'rotation=' +
    number_rotation +
    ', ' +
    'unit_rotation=' +
    dropdown_unit +
    ')';

  return code;
};