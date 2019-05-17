goog.require("Blockly.Blocks");
goog.require("Blockly");

var CUSTOM_IMAGES = {
  ARROW: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDE0IDEyIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0yLTNoMTh2MThILTJ6Ii8+CiAgICAgICAgPGcgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTEzIDZIMU04LjUwMiAxMC41TDEzIDYgOC41MDIgMS41Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K',
};

// Terminate program
Blockly.Blocks["block_terminate_program"] = {
  init: function() {
    this.appendDummyInput().appendField("terminate program");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Terminate all
Blockly.Blocks["block_terminate_all"] = {
  init: function() {
    this.appendDummyInput().appendField("terminate all");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block wait
Blockly.Blocks["block_wait"] = {
  init: function() {
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField("wait");
    this.appendDummyInput().appendField("sec");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#d9dee1');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block global timer
Blockly.Blocks["block_global_timer"] = {
  init: function() {
    this.appendDummyInput().appendField("global timer [sec]");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#d9dee1');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block repeat forever
Blockly.Blocks["block_repeat_forever"] = {
  init: function() {
    this.appendDummyInput().appendField("repeat forever");
    this.appendStatementInput("STATEMENT")
        .setCheck(null)
        .appendField("do");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block break
Blockly.Blocks["block_break"] = {
  init: function() {
    this.appendDummyInput().appendField("break");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block repeat while
Blockly.Blocks["block_repeat_while"] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("repeat while");
    this.appendStatementInput("STATEMENT")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_repeat_until
Blockly.Blocks["block_repeat_until"] = {
  init: function() {
    this.appendDummyInput().appendField("repeat");
    this.appendStatementInput("STATEMENT")
        .setCheck(null)
        .appendField("do");
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("until");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// Block block_drive
Blockly.Blocks["block_drive"] = {
  init: function() {
    console.log('called when change');
    this.appendDummyInput()
        .appendField("drive ")
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.ARROW, 15, 15, "*"))
        .appendField("direction ")
        .appendField(
            new Blockly.FieldDropdown([
              ["forward", "Motor.DIRECTION_FWD"],
              ["left", "Motor.DIRECTION_LEFT"],
              ["right", "Motor.DIRECTION_RIGHT"],
              ["backward", "Motor.DIRECTION_BACK"]
            ]),
            "DIRECTION"
        ).appendField(new Blockly.FieldNumber(0), "ROTATION")
        .appendField(
            new Blockly.FieldDropdown([
              ["rotation", "Motor.UNIT_ROT"],
              ["sec", "Motor.UNIT_SEC"]
            ]),
            "UNIT_ROTATION"
        ).appendField(new Blockly.FieldNumber(0), "SPEED")
        .appendField(
            new Blockly.FieldDropdown([
              ["rpm", "Motor.UNIT_SPEED_RPM"],
              ["power", "Motor.UNIT_SPEED_PWR"]
            ]),
            "UNIT_SPEED"
        );
        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_motor
Blockly.Blocks["block_motor"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor")
        .appendField("Name:")
        .appendField(new Blockly.FieldTextInput("M1"), "NAME")
        .appendField("Rotation:")
        .appendField(
            new Blockly.FieldDropdown([
              ["clockwise", "Motor.DIR_CW"],
              ["counter clockwise", "Motor.DIR_CCW"]
            ]),
            "DIRECTION"
        );
    this.appendValueInput("ROTATION").setCheck("Number");
    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ["deg", "Motor.UNIT_DEG"],
          ["rotation", "Motor.UNIT_ROT"],
          ["sec", "Motor.UNIT_SEC"]
        ]),
        "UNIT_ROTATION"
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_stop_motor
Blockly.Blocks["block_stop_motor"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop")
        .appendField("Motor:")
        .appendField(new Blockly.FieldTextInput("M1"), "NAME")
        .appendField(
            new Blockly.FieldDropdown([
              ["Stop & hold", "Motor.ACTION_STOP_AND_HOLD"],
              ["Release", "Motor.ACTION_RELEASE"]
            ]),
            "STOP_ACTION"
        );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_stop_all_motors
Blockly.Blocks["block_stop_all_motors"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop all motors")
        .appendField("Action:")
        .appendField(
            new Blockly.FieldDropdown([
              ["Stop & hold", "Motor.ACTION_STOP_AND_HOLD"],
              ["Release", "Motor.ACTION_RELEASE"]
            ]),
            "STOP_ALL_ACTION"
        );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_ultrasonic_sensor
Blockly.Blocks["block_ultrasonic_sensor"] = {
  init: function() {
    this.appendDummyInput().appendField("Ultrasonic sensor");
    this.setOutput(true, "Number");
    this.setColour('#f8bc08');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_bumper
Blockly.Blocks["block_bumper"] = {
  init: function() {
    this.appendDummyInput().appendField("Bumper switch");
    this.setOutput(true, "Boolean");
    this.setColour('#f8bc08');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_tilt
Blockly.Blocks["block_tilt"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tilt control")
        .appendField(
            new Blockly.FieldDropdown([
              ["forward", "Sensor.TILT_FWD"],
              ["left", "Sensor.TILT_LEFT"],
              ["right", "Sensor.TILT_RIGHT"],
              ["backward", "Sensor.TILT_BACK"]
            ]),
            "DIRECTION_TILT"
        );
    this.setOutput(true, "Boolean");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_play_note
Blockly.Blocks["block_play_note"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Play note")
        .appendField("Octave:")
        .appendField(
            new Blockly.FieldDropdown([
              ["1st", "Sound.OCTAVE_1"],
              ["2nd", "Sound.OCTAVE_2"],
              ["3rd", "Sound.OCTAVE_3"],
              ["4th", "Sound.OCTAVE_4"],
              ["5th", "Sound.OCTAVE_5"],
              ["6th", "Sound.OCTAVE_6"],
              ["7th", "Sound.OCTAVE_7"],
              ["8th", "Sound.OCTAVE_8"]
            ]),
            "OCTAVE"
        )
        .appendField("Key:")
        .appendField(
            new Blockly.FieldDropdown([
              ["C", "Sound.OPTION_C"],
              ["C# / Db", "Sound.OPTION_CS"],
              ["D", "Sound.OPTION_D"],
              ["D# / Eb", "Sound.OPTION_DS"],
              ["E", "Sound.OPTION_E"],
              ["F", "Sound.OPTION_F"],
              ["F# / Gb", "Sound.OPTION_FS"],
              ["G", "Sound.OPTION_G"],
              ["G# / Ab", "Sound.OPTION_GS"],
              ["A", "Sound.OPTION_A"],
              ["A# / Bb", "Sound.OPTION_AS"],
              ["B", "Sound.OPTION_B"]
            ]),
            "KEY"
        )
        .appendField("Duration:");
    this.appendValueInput("DURATION").setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_stop_playback
Blockly.Blocks["block_stop_playback"] = {
  init: function() {
    this.appendDummyInput().appendField("Stop playback");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Block block_set_led
Blockly.Blocks["block_set_led"] = {
  init: function() {
    this.appendValueInput("LED")
        .setCheck("Number")
        .appendField("Set LED:");
    this.appendValueInput("COLOR")
        .setCheck("Colour")
        .appendField("Color:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#f8bc08');
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
