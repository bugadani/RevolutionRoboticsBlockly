goog.require('Blockly.Blocks');
goog.require('Blockly');

var CUSTOM_IMAGES = {
  DIRECTION_RIGHT:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAeNJREFUaAXtmkFOwzAQRROE0jNwiq65BSfgGuxZVL0G3KHAEZA4A0vSE7BggcL/KJZSMw4RsRN7mJFGTsaJ7ffHjVs3VWVmCpgCpoApYAqYAqbAf1Kg67oGvoO38CN8D9+o1QBwhPXtEQGd0AB782n7c53QI8Dk1gcNKGlKE9aZLmhQNfCDowuU6qA3Bi2n2jJd/HqNxNr0lme3siXLMh1IM8IPFKf4z7IDmJhpg3aCFVv2mWYmx0xlpg1aSLmY6Xo4v3FTg/Nb+DX8YlhX6PErxr2t6/rdjd8H3qPixlUqKZ8BfOlYfOAWFRoy6/hYfgL43AV84M5VKCpPgM8UgYVQXoYV2jP846E1hK+ER/t36OSiDE4wKP58nL8WlwAcDZaJyx04KmzuwNFhcwZOApsrcA/72561+L2ZTKOGxkUbvSlhJQYzZTPvb7Act0iLYEKmYNMTYeftUecCvAhsLhleDDYH4EVh1wZeHHZNYMCu83cpOhaNYqQ0dLrOH+IiLYIpYdk2ugi948EhzVt6xgaPxlv24Bm3fZIa+gsBR4f1dzzuBTIpJlw2K3Qn3P2E2BX2oz6EujghKM2HB18KY6bpPObWbVJjH/AdnH0e4bpfTEuqpjVuCpgCpoApYAqYAtko8AVTOveurE9g/wAAAABJRU5ErkJggg==',
  DIRECTION_FWD:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAdFJREFUaAXtmc1twzAMhZMekkP3bjJHd2i7QbtEzu0SAVw+wAKCgJYoiUqeABIg7NASzY/PPzG024VFB6IDrR1YluVV/Fv8uvoPYq35qOcJ2FH8In5viB2pi68tDkDiH/ekN78/MaY2L+V4gIjnYBP3/NAVsPNDN8DOC90BOx+0A2yC/kIuygdTKsoRlh96ACwvtBEWl+iW4ZWUM57LW6rEe9ZUcIbInCPdPk/Z1sCiwC3g9Rg3dC1sCZgaugXWAkwJ3QprBb6BLv3/Hv8g64GtAaaANsJmv3gkh2oA1EwGW760/JWWEx/ES6+eLCyAVFoJarApJocfDy0nPW0Vu8aLsK3A6zwL9Dk1qXsrUL8ZYBNsD7AR+q8bNCXIAJthe4EN0K7Ab4rCVbAewAXoE467mMDioQVoXNpw3NOH2uQyR7WGPM317GtP1jMetNr8vZgWHxF7GZGUOWcAM6vjUVso7NFF5hyhMLM6HrWFwh5dZM4RCjOr41FbKOzRReYcoTCzOh61hcIeXWTOEQozq+NRWyjs0UXmHKEwszoetYXCHl1kzhEKD1ZHW+HTYsPKeLTC7wqJFlOGTRiStTSs+p3F0yok9qtXISdEj5KjA6M68A8EfLZH1sRx5QAAAABJRU5ErkJggg==',
  DIRECTION_LEFT:
    'data:simage/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAeBJREFUaAXtmkFOwzAQRROQyoIbsOUSnIPTsGKJ6DHgDpQjsGDFJRquAEJK/6BO9GU5JMhO8JixNPLEjpN5f5y6Td00XlwBV8AVcAVcAVfAFbCsQN/3G9gdbA/rYPewjWWm0dgBdgZ7goVlOzrIagcIx2AF/t0qVzTuCdi6gGfACnAdU3om7LOcF50alhodFgoExTNraQZ/x4oM/rT0aII9s1Yzu9MUjtRVZdZhKcueWX9mS1YAU1WWHn9m6ZkVMUx+N255pgHiHMdvsEtuN+p3iPsRdtu27acyhMAv6LjSzkrqLYBvlCUE/kLHqXZWUncAvlCW/wDcAHjgPFHyY/0aHFd3OJALWWUfWkOyOMNDozqy3MCm1uAilyXEHS3KNlpjlEnoKC0aR0G5wyJ0ErDAz4Qu5pdSMrA16CzAlqCzAVuBzgpsATo7cOnQiwATdOw/YL7n6p/efHP2JebkggsW90KeIdlPhtULlAbNkOxrvFnqkqAZkv0soHyRmdCL/yHOkOxzrNn8GdCL7/FgSPazQYYXmoBeA1i2SYVlz3GGbzy479c+fmh/YNA1bBcZ/BBpy90kbynDEmsLz0k7hsR/sjHteF/ZBCeZFqt3Q1xainy0K+AKuAKugCvgCqyhwAG/yvXGudncwgAAAABJRU5ErkJggg==',
  DIRECTION_BACK:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAeJJREFUaAXtmd1uwyAMhdtdpBd777UvtO0NtpfYdfsSk7JjCaQ0AoPBCc5kJERC8MGfT3/F6eTNK+AVaK3APM8T+g39HjpdT6165uMCLIandjOfeGuCwCRn1+3eqtcSd24Jao0h0lTsGS01v8XcyxailjUd2LI7Grm5wxpVtKzhDlt2RyM3d1ijipY13GHL7mjk5g5rVNGyhjts2R2N3NxhjSpa1nCHLbujkZs7rFFFyxrusGV3NHJzhzWqaFnDHU65gxMSOvV7Q4+nfleaS63dY27zfAIshqf2gbuLBPApenEj1Lgg9H0RHi+vEh12LRRTp360kQg6ZrYe2c0XDxGXgyXJx2Jp3yXEcsC0UTU0LU61muwQx8GSrCowvWe5VgWdEygBI64ES9J6B+sQm9AJimtF6FwwB4yYGthPWsfpiJ+FjbugpcDDYGN1eqElwMNhhdDJl1gtsBnYXugaYHOwPdAlYLOwrdAccIAtfSgm3yoxn11GSaI5YInGLlClTQQJ55jtO7suQiV0DpibH/8yXsPG+wCd+ifDAXHP7MJuAF38qRr3HD4qOH0c2FjtDujjwXZAHxe2Afr4sALo/wO7gv5JfAfRnO6f97jp6BFgr+hf6L+hf9Pc6Lx8f6/AgSvwB0P1yfltdbYsAAAAAElFTkSuQmCC'
};

function getDirectionLabelText(directionID) {
  if (directionID === 'Motor.DIRECTION_RIGHT' || directionID === 'Motor.DIRECTION_LEFT') {
    return 'turn';
  }

  return 'drive';
}

function createShadowElement(workspace, blockType, input) {
  var numberShadowBlock = workspace.newBlock(blockType);
  numberShadowBlock.setShadow(true);
  var outputConnection = numberShadowBlock.outputConnection;
  var inputConnection = input.connection;
  inputConnection.connect(outputConnection);
}

// Terminate program
Blockly.Blocks['block_terminate_program'] = {
  init: function() {
    this.appendDummyInput().appendField('terminate program');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Terminate all
Blockly.Blocks['block_terminate_all'] = {
  init: function() {
    this.appendDummyInput().appendField('terminate all');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block wait
Blockly.Blocks['block_wait'] = {
  init: function() {
    this.appendValueInput('WAIT')
        .setCheck('Number')
        .appendField('wait');
    this.appendDummyInput().appendField('sec');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#d9dee1');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block global timer
Blockly.Blocks['block_global_timer'] = {
  init: function() {
    this.appendDummyInput().appendField('global timer [sec]');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour('#d9dee1');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block repeat forever
Blockly.Blocks['block_repeat_forever'] = {
  init: function() {
    this.appendDummyInput().appendField('repeat forever');
    this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField('do');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block break
Blockly.Blocks['block_break'] = {
  init: function() {
    this.appendDummyInput().appendField('break');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block repeat while
Blockly.Blocks['block_repeat_while'] = {
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('repeat while');
    this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_repeat_until
Blockly.Blocks['block_repeat_until'] = {
  init: function() {
    this.appendDummyInput().appendField('repeat');
    this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField('do');
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('until');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#dd7d3a');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_drive
Blockly.Blocks['block_drive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('drive', 'DIRECTION_LABEL')
        .appendField(
            new Blockly.FieldImage(CUSTOM_IMAGES.DIRECTION_FWD, 15, 15, '*'),
            'DIRECTION_IMAGE'
        )
        .appendField('direction')
        .appendField(
            new Blockly.FieldDropdown([
              ['forward', 'Motor.DIRECTION_FWD'],
              ['left', 'Motor.DIRECTION_LEFT'],
              ['right', 'Motor.DIRECTION_RIGHT'],
              ['backward', 'Motor.DIRECTION_BACK']
            ]),
            'DIRECTION'
        );

    var rotationValueInput = this.appendValueInput('ROTATION').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', rotationValueInput);

    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([['rotation', 'Motor.UNIT_ROT'], ['sec', 'Motor.UNIT_SEC']]),
        'UNIT_ROTATION'
    );

    var speedValueInput = this.appendValueInput('SPEED').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', speedValueInput);

    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['rpm', 'Motor.UNIT_SPEED_RPM'],
          ['power', 'Motor.UNIT_SPEED_PWR']
        ]),
        'UNIT_SPEED'
    );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip('');
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (event instanceof Blockly.Events.Change) {
      if (event.name === 'DIRECTION') {
        var driveBlock = this.workspace.getBlockById(event.blockId);
        var imageField = driveBlock.getField('DIRECTION_IMAGE');
        imageField.setValue(CUSTOM_IMAGES[event.newValue.replace('Motor.', '')]);

        var labelField = driveBlock.getField('DIRECTION_LABEL');
        labelField.setText(getDirectionLabelText(event.newValue));
      }
    }
  }
};

// Block block_motor
Blockly.Blocks['block_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Motor')
        .appendField('Name:')
        .appendField(new Blockly.FieldTextInput('M1'), 'NAME')
        .appendField('Rotation:')
        .appendField(
            new Blockly.FieldDropdown([
              ['clockwise', 'Motor.DIR_CW'],
              ['counter clockwise', 'Motor.DIR_CCW']
            ]),
            'DIRECTION'
        );

    var rotationValueInput = this.appendValueInput('ROTATION').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', rotationValueInput);
    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['deg', 'Motor.UNIT_DEG'],
          ['rotation', 'Motor.UNIT_ROT'],
          ['sec', 'Motor.UNIT_SEC']
        ]),
        'UNIT_ROTATION'
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_stop_motor
Blockly.Blocks['block_stop_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Stop')
        .appendField('Motor:')
        .appendField(new Blockly.FieldTextInput('M1'), 'NAME')
        .appendField(
            new Blockly.FieldDropdown([
              ['Stop & hold', 'Motor.ACTION_STOP_AND_HOLD'],
              ['Release', 'Motor.ACTION_RELEASE']
            ]),
            'STOP_ACTION'
        );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_stop_all_motors
Blockly.Blocks['block_stop_all_motors'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Stop all motors')
        .appendField('Action:')
        .appendField(
            new Blockly.FieldDropdown([
              ['Stop & hold', 'Motor.ACTION_STOP_AND_HOLD'],
              ['Release', 'Motor.ACTION_RELEASE']
            ]),
            'STOP_ALL_ACTION'
        );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#e60312');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_ultrasonic_sensor
Blockly.Blocks['block_ultrasonic_sensor'] = {
  init: function() {
    this.appendDummyInput().appendField('Ultrasonic sensor');
    this.setOutput(true, 'Number');
    this.setColour('#f8bc08');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_bumper
Blockly.Blocks['block_bumper'] = {
  init: function() {
    this.appendDummyInput().appendField('Bumper switch');
    this.setOutput(true, 'Boolean');
    this.setColour('#f8bc08');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_tilt
Blockly.Blocks['block_tilt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Tilt control')
        .appendField(
            new Blockly.FieldDropdown([
              ['forward', 'Sensor.TILT_FWD'],
              ['left', 'Sensor.TILT_LEFT'],
              ['right', 'Sensor.TILT_RIGHT'],
              ['backward', 'Sensor.TILT_BACK']
            ]),
            'DIRECTION_TILT'
        );
    this.setOutput(true, 'Boolean');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_play_note
Blockly.Blocks['block_play_note'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Play note')
        .appendField('Octave:')
        .appendField(
            new Blockly.FieldDropdown([
              ['1st', 'Sound.OCTAVE_1'],
              ['2nd', 'Sound.OCTAVE_2'],
              ['3rd', 'Sound.OCTAVE_3'],
              ['4th', 'Sound.OCTAVE_4'],
              ['5th', 'Sound.OCTAVE_5'],
              ['6th', 'Sound.OCTAVE_6'],
              ['7th', 'Sound.OCTAVE_7'],
              ['8th', 'Sound.OCTAVE_8']
            ]),
            'OCTAVE'
        )
        .appendField('Key:')
        .appendField(
            new Blockly.FieldDropdown([
              ['C', 'Sound.OPTION_C'],
              ['C# / Db', 'Sound.OPTION_CS'],
              ['D', 'Sound.OPTION_D'],
              ['D# / Eb', 'Sound.OPTION_DS'],
              ['E', 'Sound.OPTION_E'],
              ['F', 'Sound.OPTION_F'],
              ['F# / Gb', 'Sound.OPTION_FS'],
              ['G', 'Sound.OPTION_G'],
              ['G# / Ab', 'Sound.OPTION_GS'],
              ['A', 'Sound.OPTION_A'],
              ['A# / Bb', 'Sound.OPTION_AS'],
              ['B', 'Sound.OPTION_B']
            ]),
            'KEY'
        )
        .appendField('Duration:');
    this.appendValueInput('DURATION').setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_stop_playback
Blockly.Blocks['block_stop_playback'] = {
  init: function() {
    this.appendDummyInput().appendField('Stop playback');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_set_led
Blockly.Blocks['block_set_led'] = {
  init: function() {
    this.appendValueInput('LED')
        .setCheck('Number')
        .appendField('Set LED:');
    this.appendValueInput('COLOR')
        .setCheck('Colour')
        .appendField('Color:');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#f8bc08');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
