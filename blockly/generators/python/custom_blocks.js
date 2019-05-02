"use strict";

goog.require("Blockly.Python");

// Generator block_terminate_program
Blockly.Python["block_terminate_program"] = function(block) {
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code = "Control.terminate_program()\n";
  return code;
};

// Generator block_terminate_all
Blockly.Python["block_terminate_allblock_terminate_all"] = function(block) {
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code = "Control.terminate_all()\n";
  return code;
};

// Generator block_wait
Blockly.Python["block_wait"] = function(block) {
  Blockly.Python.definitions_["import_time"] = "import time";
  var value_wait = Blockly.Python.valueToCode(
    block,
    "WAIT",
    Blockly.Python.ORDER_ATOMIC
  );
  var code = "time.sleep(" + value_wait + ")\n";
  return code;
};

// Generator block_global_timer
Blockly.Python["block_global_timer"] = function(block) {
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code = "Control.get_global_timer()\n";
  return code;
};

// Generator block_repeat_forever
Blockly.Python["block_repeat_forever"] = function(block) {
  var statements_statement = Blockly.Python.statementToCode(block, "STATEMENT");
  var branch =
    Blockly.Python.addLoopTrap(statements_statement, block.id) ||
    Blockly.Python.PASS;

  var code = "while True:\n" + branch;
  return code;
};

// Generator block_break
Blockly.Python["block_break"] = function(block) {
  var code = "break\n";
  return code;
};

// Generator block_repeat_while
Blockly.Python["block_repeat_while"] = function(block) {
  var value_condition = Blockly.Python.valueToCode(
    block,
    "CONDITION",
    Blockly.Python.ORDER_ATOMIC
  );
  var statements_statement = Blockly.Python.statementToCode(block, "STATEMENT");

  var branch =
    Blockly.Python.addLoopTrap(statements_statement, block.id) ||
    Blockly.Python.PASS;

  var code = "while " + (value_condition || "False") + ":\n" + branch;
  return code;
};

// Generator block_repeat_until
Blockly.Python["block_repeat_until"] = function(block) {
  var statements_statement = Blockly.Python.statementToCode(block, "STATEMENT");
  var value_condition = Blockly.Python.valueToCode(
    block,
    "CONDITION",
    Blockly.Python.ORDER_ATOMIC
  );

  var branch =
    Blockly.Python.addLoopTrap(statements_statement, block.id) ||
    Blockly.Python.PASS;

  branch += "  if " + (value_condition || "True") + ": break\n";

  var code = "while True:\n" + branch;
  return code;
};

// Generator block_drive
Blockly.Python["block_drive"] = function(block) {
  var dropdown_direction = block.getFieldValue("DIRECTION");
  var number_rotation = Blockly.Python.valueToCode(
    block,
    "ROTATION",
    Blockly.Python.ORDER_ATOMIC
  );
  var unit_rotation = block.getFieldValue("UNIT_ROTATION");
  var number_speed = Blockly.Python.valueToCode(
    block,
    "SPEED",
    Blockly.Python.ORDER_ATOMIC
  );
  var unit_speed = block.getFieldValue("UNIT_SPEED");

  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code =
    "Motor.drive(" +
    "direction=" +
    dropdown_direction +
    ", " +
    "rotation=" +
    number_rotation +
    ", " +
    "unit_rotation=" +
    unit_rotation +
    ", " +
    "speed=" +
    number_speed +
    ", " +
    "unit_speed=" +
    unit_speed +
    ")\n";
  return code;
};

// Generator block_motor
Blockly.Python["block_motor"] = function(block) {
  var text_name = block.getFieldValue("NAME");
  var dropdown_direction = block.getFieldValue("DIRECTION");
  var number_rotation = Blockly.Python.valueToCode(
    block,
    "ROTATION",
    Blockly.Python.ORDER_ATOMIC
  );
  var dropdown_unit = block.getFieldValue("UNIT_ROTATION");

  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code =
    "Motor.motor(" +
    "name='" +
    text_name +
    "', " +
    "direction=" +
    dropdown_direction +
    ", " +
    "rotation=" +
    number_rotation +
    ", " +
    "unit_rotation=" +
    dropdown_unit +
    ")\n";

  return code;
};

// Generator block_stop_motor
Blockly.Python["block_stop_motor"] = function(block) {
  var text_name = block.getFieldValue("NAME");
  var dropdown_action = block.getFieldValue("STOP_ACTION");

  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code =
    "Motor.stop(" +
    "name='" +
    text_name +
    "', " +
    "action=" +
    dropdown_action +
    ")\n";
  return code;
};

// Generator block_stop_all_motors
Blockly.Python["block_stop_all_motors"] = function(block) {
  var dropdown_action = block.getFieldValue("STOP_ALL_ACTION");

  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code = "Motor.stop_all(action=" + dropdown_action + ")\n";
  return code;
};

// Generator block_ultrasonic_sensor
Blockly.Python["block_ultrasonic_sensor"] = function(block) {
  var code = "Sensor.get_ultrasonic_value()\n";
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_bumper
Blockly.Python["block_bumper"] = function(block) {
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code = "Sensor.get_bumper_pressed_state()\n";
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_tilt
Blockly.Python["block_tilt"] = function(block) {
  var dropdown_tilt = block.getFieldValue("DIRECTION_TILT");
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code = "Sensor.get_tilt_state(direction=" + dropdown_tilt + ")\n";
  return [code, Blockly.Python.ORDER_NONE];
};

// Generator block_play_note
Blockly.Python["block_play_note"] = function(block) {
  var dropdown_octave = block.getFieldValue("OCTAVE");
  var dropdown_key = block.getFieldValue("KEY");
  var value_duration = Blockly.Python.valueToCode(
    block,
    "DURATION",
    Blockly.Python.ORDER_ATOMIC
  );
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code =
    "Sound.play_note(" +
    "octave=" +
    dropdown_octave +
    ", " +
    "key=" +
    dropdown_key +
    ", " +
    "duration=" +
    value_duration +
    ")\n";
  return code;
};

// Generator block_play_tune
Blockly.Python["block_play_tune"] = function(block) {
  var dropdown_tune = block.getFieldValue("TUNE");
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code = "Sound.play_tune('" + dropdown_tune + "')\n";
  return code;
};

// Generator block_stop_playback
Blockly.Python["block_stop_playback"] = function(block) {
  var code = "Sound.stop_playback()\n";
  return code;
};

// Generator block_set_led
Blockly.Python["block_set_led"] = function(block) {
  var value_led = Blockly.Python.valueToCode(
    block,
    "LED",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_color = Blockly.Python.valueToCode(
    block,
    "COLOR",
    Blockly.Python.ORDER_ATOMIC
  );
  Blockly.Python.definitions_["import_robot_lib"] = "import robot_lib";
  var code =
    "Light.set(" +
    "led_index=" +
    value_led +
    ", " +
    "color=" +
    value_color +
    ")\n";
  return code;
};
