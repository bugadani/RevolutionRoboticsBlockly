/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Classic theme.
 * Contains multi colored border to create shadow effect.
 */

'use strict';

goog.provide('Blockly.Themes.Classic');

goog.require('Blockly.Theme');

var defaultBlockStyles = {
  "colour_blocks":{
    "colourPrimary": "#0264ff"
  },
  "list_blocks": {
    "colourPrimary": "260"
  },
  "logic_blocks": {
    "colourPrimary": "#0264ff"
  },
  "loop_blocks": {
    "colourPrimary": "120"
  },
  "math_blocks": {
    "colourPrimary": "#e60312"
  },
  "procedure_blocks": {
    "colourPrimary": "#0264ff"
  },
  "text_blocks": {
    "colourPrimary": "160"
  },
  "variable_blocks": {
    "colourPrimary": "#e60312"
  },
  "variable_dynamic_blocks":{
    "colourPrimary": "310"
  },
  "hat_blocks":{
    "colourPrimary":"330",
    "hat":"cap"
  }
};

var categoryStyles = {
  "colour_category":{
    "colour": "#e60312"
  },
  "list_category": {
    "colour": "#f8bc08"
  },
  "logic_category": {
    "colour": "#0264ff"
  },
  "loop_category": {
    "colour": "#dd7d3a"
  },
  "math_category": {
    "colour": "#4dc88f"
  },
  "procedure_category": {
    "colour": "290"
  },
  "text_category": {
    "colour": "160"
  },
  "variable_category": {
    "colour": "330"
  },
  "variable_dynamic_category":{
    "colour": "310"
  }
};

Blockly.Themes.Classic = new Blockly.Theme(defaultBlockStyles, categoryStyles);
