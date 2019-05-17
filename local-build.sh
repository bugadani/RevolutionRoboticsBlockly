#!/bin/sh

compressedBlocklyFullPath=/Users/matepapp/Work/supercharge/revolution-robotics/blockly-js

cd blockly

npm run prepare
python build.py $1

cp blockly_compressed.js $compressedBlocklyFullPath/Blockly/blockly_compressed.js
cp blocks_compressed.js $compressedBlocklyFullPath/Blockly/blocks_compressed.js
cp python_compressed.js $compressedBlocklyFullPath/Blockly/python_compressed.js
cp -R msg/ $compressedBlocklyFullPath/Blockly/msg/
cp -R media/ $compressedBlocklyFullPath/Blockly/media/


