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
 * @fileoverview Modern theme.
 * Same colors as classic, but single colored border.
 */
'use strict';

goog.provide('Blockly.Themes.Modern');

goog.require('Blockly.Theme');

var defaultBlockStyles = {
  "colour_blocks": {
    "colourPrimary": "#e60312",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#845d49"
  },
  "list_blocks": {
    "colourPrimary": "#0264ff",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#5d4984"
  },
  "logic_blocks": {
    "colourPrimary": "#e60312",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#496684"
  },
  "loop_blocks": {
    "colourPrimary": "#dd7d3a",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#498449"
  },
  "math_blocks": {
    "colourPrimary": "#0264ff",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#495284"
  },
  "procedure_blocks": {
    "colourPrimary": "#e60312",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#7a4984"
  },
  "text_blocks": {
    "colourPrimary": "#dd7d3a",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#498470"
  },
  "variable_blocks": {
    "colourPrimary": "#0264ff",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#84497a"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#e60312",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#84497a"
  },
  "hat_blocks": {
    "colourPrimary": "#0264ff",
    "colourSecondary": "#FFFFFF",
    "colourTertiary": "#84497a",
    "hat": "cap"
  }
};

var categoryStyles = {
  "colour_category":{
    "colour": "#e60312",
  },
  "list_category": {
    "colour": "#745ba5",
  },
  "logic_category": {
    "colour": "#0264ff",
  },
  "loop_category": {
    "colour": "#dd7d3a",
  },
  "math_category": {
    "colour": "#5b67a5",
  },
  "procedure_category": {
    "colour": "#995ba5",
  },
  "text_category": {
    "colour": "#dd7d3a",
  },
  "variable_category": {
    "colour": "#a55b99",
  },
  "variable_dynamic_category":{
    "colour": "#e60312",
  }
};

//This style is still being fleshed out and may change.
Blockly.Themes.Modern = new Blockly.Theme(defaultBlockStyles, categoryStyles);
