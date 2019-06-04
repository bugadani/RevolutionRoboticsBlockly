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
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAeJJREFUaAXtmd1uwyAMhdtdpBd777UvtO0NtpfYdfsSk7JjCaQ0AoPBCc5kJERC8MGfT3/F6eTNK+AVaK3APM8T+g39HjpdT6165uMCLIandjOfeGuCwCRn1+3eqtcSd24Jao0h0lTsGS01v8XcyxailjUd2LI7Grm5wxpVtKzhDlt2RyM3d1ijipY13GHL7mjk5g5rVNGyhjts2R2N3NxhjSpa1nCHLbujkZs7rFFFyxrusGV3NHJzhzWqaFnDHU65gxMSOvV7Q4+nfleaS63dY27zfAIshqf2gbuLBPApenEj1Lgg9H0RHi+vEh12LRRTp360kQg6ZrYe2c0XDxGXgyXJx2Jp3yXEcsC0UTU0LU61muwQx8GSrCowvWe5VgWdEygBI64ES9J6B+sQm9AJimtF6FwwB4yYGthPWsfpiJ+FjbugpcDDYGN1eqElwMNhhdDJl1gtsBnYXugaYHOwPdAlYLOwrdAccIAtfSgm3yoxn11GSaI5YInGLlClTQQJ55jtO7suQiV0DpibH/8yXsPG+wCd+ifDAXHP7MJuAF38qRr3HD4qOH0c2FjtDujjwXZAHxe2Afr4sALo/wO7gv5JfAfRnO6f97jp6BFgr+hf6L+hf9Pc6Lx8f6/AgSvwB0P1yfltdbYsAAAAAElFTkSuQmCC',
  WAIT:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgPHBhdGggZD0iTTkgOUgybDctN0gyTTcgMTZINGwzLTNINE0xNiAxMWgtNWw1LTVoLTUiLz4KICAgIDwvZz4KPC9zdmc+Cg==',
  BREAK:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+CiAgICAgICAgPHBhdGggZD0iTTE2LjQ0OSA4LjkyM0g3LjExNU0xMi45NSAxMi40MjNsMy40OTktMy41LTMuNS0zLjUiLz4KICAgICAgICA8cGF0aCBkPSJNMTMgMTZIMlYyaDExIi8+CiAgICA8L2c+Cjwvc3ZnPgo=',
  STOP_ALL:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICA8cGF0aCBkPSJNMTYuNjY3IDlBNy42NjYgNy42NjYgMCAxIDEgMS4zMzQgOWE3LjY2NiA3LjY2NiAwIDAgMSAxNS4zMzMgMHpNMy41NzkgMy41OEwxNC40MiAxNC40Mk0xNC40MjEgMy41OEwzLjU4IDE0LjQyIi8+CiAgICA8L2c+Cjwvc3ZnPgo=',
  STOP:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICA8cGF0aCBkPSJNMTYuNjY3IDlBNy42NjYgNy42NjYgMCAxIDEgMS4zMzQgOWE3LjY2NiA3LjY2NiAwIDAgMSAxNS4zMzMgMHpNMTQuNDIxIDMuNThMMy41OCAxNC40MiIvPgogICAgPC9nPgo8L3N2Zz4K',
  BUMPER:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQuNTU2IDkuODg5SDFWOC4xMWgzLjU1NlY2LjMzM0w3LjIyMiA5bC0yLjY2NiAyLjY2N1Y5Ljg4OXptOC44ODgtMS43NzhIMTdWOS44OWgtMy41NTZ2MS43NzhMMTAuNzc4IDlsMi42NjYtMi42Njd2MS43Nzh6TTkgOWwuODg5LThoMi42NjdMOSA5em0wIDBsMy41NTYgOEg5Ljg4OUw5IDl6bTAgMEw1LjQ0NCAxaDIuNjY3TDkgOXptMCAwbC0uODg5IDhINS40NDRMOSA5eiIvPgo8L3N2Zz4K',
  REPEAT:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICA8cGF0aCBkPSJNMTEuMzMzIDE0LjY2N2gtNmEyIDIgMCAwIDEtMi0yVjcuMzMzTTYuNjY3IDMuMzMzaDZhMiAyIDAgMCAxIDIgMnY1LjMzNCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xLjMzMyA4LjY2N2wyLTEuMzM0IDIgMS4zMzRNMTIuNjY3IDkuMzMzbDIgMS4zMzQgMi0xLjMzNCIvPgogICAgPC9nPgo8L3N2Zz4K',
  TUNE:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICA8cGF0aCBkPSJNOS40MTcgMTQuMzMzYzAgMS4xNDMtMS4xMiAyLjI4Ni0yLjUgMi4yODZzLTIuNS0xLjAyNC0yLjUtMi4yODYgMS4xMi0yLjI4NSAyLjUtMi4yODVoMi41djIuMjg1ek05LjQxNyAxMi4wNDhWMi45MDVsNC4xNjYtMS41MjRNOS40MTcgNS41NzFsNC4xNjYtMS41MjMiLz4KICAgIDwvZz4KPC9zdmc+Cg==',
  SPIN:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICA8cGF0aCBkPSJNMTcuMTU4IDEwLjA0OEwxNC44OCA3LjU3M2wtMS43OTEgMi44MzNNMTQuODY3IDcuNjA0Yy44OTYgMy40NjUtMS4xNzQgNy4wNDUtNC43MTYgNy45MjFNNS40MiAxLjM2TDQuMTQ5IDQuNDVsMy4zODcuMzNNNC4xNTggNC40NDRjMi43ODktMi4zMDggNy4wMS0yLjA2IDkuMzcuNjdNMi45ODIgMTZsMy4zNjgtLjQ4Mi0xLjQxOC0zLjAyOU02LjMwNCAxNS40OUMyLjg2IDE0LjMuOTg4IDEwLjYzIDIuMjA2IDcuMjYiLz4KICAgIDwvZz4KPC9zdmc+Cg==',
  LIGHT:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTcuMTI3IDEyLjg2OGMtMS41MDMtLjc1Mi0yLjU0Mi0yLjM2NS0yLjU0Mi00LjIzNCAwLTIuNTg4IDEuOTkyLTQuNjg2IDQuNDQ5LTQuNjg2czQuNDQ4IDIuMDk4IDQuNDQ4IDQuNjg2YzAgMS44NjktMS4wMzkgMy40ODItMi41NDIgNC4yMzR2MS4xMkg3LjEyN3YtMS4xMnptMCAyLjEyNGgzLjgxM1YxN0g3LjEyN3YtMi4wMDh6TTkuNTQgMi45NDRoLTFWMWgxdjEuOTQ0ek0xLjUgOC44MVY3LjgwNmgyLjIxNlY4LjgxSDEuNXpNMy40NTIgMy4zbC42OTktLjcxIDEuNTY3IDEuNTktLjcuNzFMMy40NTMgMy4zem0xMC45NjcgNS42MTVWNy45MTFIMTYuNXYxLjAwNGgtMi4wODF6bS0xLjA4Mi00LjEyMWwtLjY5OS0uNzFMMTQuMTEgMi41OWwuNy43MS0xLjQ3MyAxLjQ5NHoiLz4KPC9zdmc+Cg==',
  GLOBAL_TIMER:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNCAxMC41YTYgNiAwIDEgMC0xMiAwIDYgNiAwIDAgMCAxMiAweiIvPgogICAgICAgIDxwYXRoIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik02LjM3NSAyaDMuNDMyTTUuNjE5IDguMTE5bDIuNDI3IDIuNDI3Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTggMTJhMS41IDEuNSAwIDEgMCAwLTMgMS41IDEuNSAwIDAgMCAwIDN6Ii8+CiAgICAgICAgPHBhdGggc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTEyLjYxOSAzLjExOWwyLjQyNyAyLjQyN00xMi42MTkgNS40MTdsMS4yMTMtMS4wODUiLz4KICAgIDwvZz4KPC9zdmc+Cg==',
  REPEAT_FOREVER:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICA8cGF0aCBkPSJNOC43NSAxMC43NWgtNC41YTEuNSAxLjUgMCAwIDEtMS41LTEuNXYtNE01LjI1IDIuMjVoNC41YTEuNSAxLjUgMCAwIDEgMS41IDEuNXY0Ii8+CiAgICAgICAgPHBhdGggZD0iTTEuMjUgNi4yNWwxLjUtMSAxLjUgMU05Ljc1IDYuNzVsMS41IDEgMS41LTFNMTMuMzQ4IDE1LjkxUzE0LjA0MyAxNyAxNS4wODcgMTdDMTYuMTMgMTcgMTcgMTYuMTA0IDE3IDE1cy0uODctMi0xLjkxMy0yYy0xLjc0IDAtMi40MzUgNC00LjE3NCA0QzkuODU2IDE3IDkgMTYuMTA0IDkgMTVzLjg3LTIgMS45MTMtMmMxLjA0NCAwIDEuNTY1IDEuMjczIDEuNTY1IDEuMjczIi8+CiAgICA8L2c+Cjwvc3ZnPgo=',
  REPEAT_UNTIL:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTEzLjUzOCAxMy41SDhNMTEuNDYyIDE1LjU3N2wyLjA3Ni0yLjA3Ny0yLjA3Ni0yLjA3NyIvPgogICAgICAgIDwvZz4KICAgICAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNi4zMDggMTZ2LTUiLz4KICAgICAgICA8ZyBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik03LjAyOCA3LjgwNmgtMy41QTEuMTY2IDEuMTY2IDAgMCAxIDIuMzYgNi42MzlWMy41MjhNNC4zMDYgMS4xOTRoMy41Yy42NDQgMCAxLjE2Ni41MjMgMS4xNjYgMS4xNjd2My4xMTEiLz4KICAgICAgICAgICAgPHBhdGggZD0iTTEuMTk0IDQuMzA2bDEuMTY3LS43NzggMS4xNjcuNzc4TTcuODA2IDQuNjk0bDEuMTY2Ljc3OCAxLjE2Ny0uNzc4Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K',
  REPEAT_WHILE:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjY1NCAxMy41aC01LjUzOU0xNC41NzggMTUuNTc3bDIuMDc2LTIuMDc3LTIuMDc2LTIuMDc3Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIHN0cm9rZS13aWR0aD0iMiIgZD0iTTguMzQ2IDE2di01Ii8+CiAgICAgICAgPGcgc3Ryb2tlLXdpZHRoPSIxLjUiPgogICAgICAgICAgICA8cGF0aCBkPSJNNy4wMjggNy44MDZoLTMuNUExLjE2NiAxLjE2NiAwIDAgMSAyLjM2IDYuNjM5VjMuNTI4TTQuMzA2IDEuMTk0aDMuNWMuNjQ0IDAgMS4xNjYuNTIzIDEuMTY2IDEuMTY3djMuMTExIi8+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjE5NCA0LjMwNmwxLjE2Ny0uNzc4IDEuMTY3Ljc3OE03LjgwNiA0LjY5NGwxLjE2Ni43NzggMS4xNjctLjc3OCIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==',
  ULTRASONIC:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNSA3LjIyMmMuOTkgMCAxLjguOCAxLjggMS43NzggMCAuOTc3LS44MSAxLjc3OC0xLjggMS43NzhWMTVhMiAyIDAgMCAxLTIgMkgzYTIgMiAwIDAgMS0yLTJWM2EyIDIgMCAwIDEgMi0yaC41YTIgMiAwIDAgMSAyIDJ2NC4yMjJ6TTEwLjY5NSAxYy4wNjggMCAuMTM5LjAwOS4yMDkuMDI3QzE0LjQwOSAxLjkzNiAxNyA1LjE2NiAxNyA5YzAgMy44MzQtMi41OTEgNy4wNjQtNi4wOTYgNy45NzMtLjU2LjE0NS0xLjEwNC0uMzA1LTEuMTA0LS44OTQgMC0uNDA2LjI2Mi0uNzcyLjY0Ny0uODcyQzEzLjE4NSAxNC40OTUgMTUuMiAxMS45ODUgMTUuMiA5YzAtLjE4Ny0uMDA3LS4zNzItLjAyMy0uNTU1LS4yMzEtMi43MzgtMi4xNjMtNC45ODUtNC43My01LjY1Mi0uMzg1LS4xLS42NDctLjQ2Ni0uNjQ3LS44NzIgMC0uNTE2LjQxNi0uOTI0Ljg5NS0uOTIxem0tLjAzIDMuOWEuODM2LjgzNiAwIDAgMSAuNDU1LjExNEE0LjYwMSA0LjYwMSAwIDAgMSAxMy40IDlhNC42IDQuNiAwIDAgMS0yLjI4IDMuOTg1Yy0uNTg3LjM0My0xLjMyLS4xMi0xLjMyLS44MXYtLjAxOWMwLS4zMjMuMTY3LS42MjYuNDQ1LS43ODJDMTEuMDczIDEwLjkwOSAxMS42IDEwLjAyIDExLjYgOWMwLTEuMDIyLS41MjctMS45MS0xLjM1NS0yLjM3NmEuODkuODkgMCAwIDEtLjQ0NS0uNzh2LS4wMjJjMC0uNTE3LjQxMS0uOTA1Ljg2NS0uOTIzeiIvPgo8L3N2Zz4K',
  ENGINE:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcuNTQ1IDJhLjcuNyAwIDAgMC0uNjM2LjdjLS4wMDYuMzguMzEuNjk1LjcwNS43SDl2MS40aDIuMTgyVjMuNGgxLjQ1NGEuNzM0LjczNCAwIDAgMCAuNTE3LS4yMDIuNjc5LjY3OSAwIDAgMCAuMjEtLjQ5OC42NzkuNjc5IDAgMCAwLS4yMS0uNDk4LjczNC43MzQgMCAwIDAtLjUxNy0uMjAySDcuNTQ1em0tLjcyNyAzLjVjLS4xNDUgMC0uMjg3LjE0OC0uNDMyLjIxOUw1LjEzNiA3LjZIMy45MWMtLjIxOSAwLS4yODEuMDgtLjUuMjE5LS4yMTkuMTQtLjIyNy4yNy0uMjI3LjQ4MXYxLjRoLS43MjdWOC4zNjZjMC0uMzUtLjI5LS43LS43MjgtLjctLjI5LS4wNzEtLjcyNy4yMS0uNzI3Ljd2NC45YzAgLjM1LjI5LjcuNzI3LjcuMzY0IDAgLjcyOC0uMjguNzI4LS43di0xLjRoLjcyN3YxLjRjMCAuMzUuMjkuNy43MjcuN2gxLjE2bDEuMzE3IDEuODE1Yy4xNDUuMTQuMjg3LjIxOS40MzIuMjE5aDUuMDkxYy4yMTkgMCAuMzU1LS4wOC41LS4yMTlsMi4xODItMi44Yy4xNDUtLjE0LjIyNy0uMjc2LjIyNy0uNDE1di0uN2guNzI3VjEzLjJjMCAuMzUuMjkuNy43MjguNy4zNjMgMCAuNzI3LS4yNzkuNzI3LS43VjguM2MwLS4zNS0uMzctLjctLjY2LS43LS4zNjMgMC0uNzI2LjI3OS0uNzI2Ljd2MS40aC0uNzI4VjYuMmMwLS4zNS0uMjktLjctLjcyNy0uN0g2Ljgyem0yLjc3MyAyLjE2NmgxLjcyN2wtMS43MjcgMi44aDEuNjU5VjEwLjRoLjA2OGwtLjA2OC4wNjYtMy4yNzMgNC4wNjggMS4yNS0zLjMwM0g3LjY4Mkw5LjU5IDcuNjY2eiIvPgo8L3N2Zz4K',
  LIGHTS:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTQuOTI0IDEwLjM4NGMtMS4zMTUtLjY1OC0yLjIyNS0yLjA3LTIuMjI1LTMuNzA1IDAtMi4yNjQgMS43NDMtNC4xIDMuODkzLTQuMSAyLjE1IDAgMy44OTIgMS44MzYgMy44OTIgNC4xIDAgMS42MzYtLjkwOSAzLjA0Ny0yLjIyNCAzLjcwNXYuOThINC45MjR2LS45OHptMCAxLjg2SDguMjZWMTRINC45MjR2LTEuNzU3ek03LjcxNSAxLjdINi4xNTlWMGgxLjU1NnYxLjcwMXpNMCA2LjgzNHYtLjg3OGgxLjkzOXYuODc4SDB6bTEuNzA4LTQuODIybC42MTEtLjYyMUwzLjY5IDIuNzgzbC0uNjExLjYyMS0xLjM3MS0xLjM5MnptOS41OTYgNC45MTR2LS44NzhoMS44MjF2Ljg3OGgtMS44MjF6bS0uOTQ2LTMuNjA2bC0uNjEyLS42MjEgMS4yODgtMS4zMDguNjExLjYyMS0xLjI4NyAxLjMwOHpNMTIuNjY1IDE1LjY3NmMtLjg0NS0uNDIzLTEuNDMtMS4zMy0xLjQzLTIuMzgyIDAtMS40NTYgMS4xMi0yLjYzNiAyLjUwMy0yLjYzNiAxLjM4MiAwIDIuNTAyIDEuMTggMi41MDIgMi42MzYgMCAxLjA1MS0uNTg0IDEuOTU5LTEuNDMgMi4zODJ2LjYzaC0yLjE0NXYtLjYzem0wIDEuMTk1aDIuMTQ1VjE4aC0yLjE0NXYtMS4xM3ptMS43OTUtNi43NzdoLTFWOWgxdjEuMDk0em0tNC45NiAzLjN2LS41NjVoMS4yNDZ2LjU2NEg5LjV6bTEuMDk4LTMuMWwuMzkzLS40Ljg4MS44OTUtLjM5My40LS44ODEtLjg5NnptNi4xNjkgMy4xNTh2LS41NjRoMS4xN3YuNTY0aC0xLjE3em0tLjYwOC0yLjMxOGwtLjM5NC0uNC44MjgtLjg0LjM5My40LS44MjcuODR6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo='
};

function getDirectionLabelText(directionID) {
  if (directionID === 'Motor.DIRECTION_RIGHT' || directionID === 'Motor.DIRECTION_LEFT') {
    return 'turn';
  }

  return 'drive';
}

function createShadowElement(workspace, blockType, input, defaultNumberValue) {
  var numberShadowBlock = workspace.newBlock(blockType);
  numberShadowBlock.setShadow(true);

  if (defaultNumberValue) {
    numberShadowBlock.setFieldValue(defaultNumberValue, 'NUM');
  }
  var outputConnection = numberShadowBlock.outputConnection;
  var inputConnection = input.connection;
  inputConnection.connect(outputConnection);
}

// Terminate program
Blockly.Blocks['block_terminate_program'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.STOP, 15, 15, '*'), 'STOP_IMAGE')
        .appendField('terminate program');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Terminate all
Blockly.Blocks['block_terminate_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.STOP_ALL, 15, 15, '*'), 'STOP_IMAGE')
        .appendField('terminate all');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block wait
Blockly.Blocks['block_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.WAIT, 15, 15, '*'), 'WAIT_IMAGE')
        .appendField('wait');

    var limitValueInput = this.appendValueInput('WAIT').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', limitValueInput, '1');

    this.appendDummyInput().appendField('sec');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('time_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block global timer
Blockly.Blocks['block_global_timer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldImage(CUSTOM_IMAGES.GLOBAL_TIMER, 15, 15, '*'),
            'GLOBAL_TIMER_IMAGE'
        )
        .appendField('read global timer in sec');
    this.setOutput(true, 'Number');
    this.setStyle('time_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block repeat forever
Blockly.Blocks['block_repeat_forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldImage(CUSTOM_IMAGES.REPEAT_FOREVER, 15, 15, '*'),
            'REPEAT_FOREVER_IMAGE'
        )
        .appendField('repeat forever');
    this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField('do');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block break
Blockly.Blocks['block_break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.BREAK, 15, 15, '*'), 'BREAK_IMAGE')
        .appendField('break');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block repeat while
Blockly.Blocks['block_repeat_while'] = {
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField(
            new Blockly.FieldImage(CUSTOM_IMAGES.REPEAT_WHILE, 15, 15, '*'),
            'REPEAT_WHILE_IMAGE'
        )
        .appendField('repeat while');
    this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_repeat_until
Blockly.Blocks['block_repeat_until'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldImage(CUSTOM_IMAGES.REPEAT_UNTIL, 15, 15, '*'),
            'REPEAT_UNTIL_IMAGE'
        )
        .appendField('repeat');
    this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField('do');
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('until');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_repeat_n_times
Blockly.Blocks['controls_repeat_ext2'] = {
  init: function() {
    var forValueInput = this.appendValueInput('TIMES')
        .setCheck('Number')
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.REPEAT, 15, 15, '*'))
        .appendField('repeat');
    createShadowElement(this.workspace, 'math_number', forValueInput);
    this.appendDummyInput().appendField('times');
    this.appendStatementInput('DO')
        .setCheck(null)
        .appendField('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_drive
Blockly.Blocks['block_drive'] = {
  init: function() {
    
    var image = CUSTOM_IMAGES.DIRECTION_FWD;

    this.appendDummyInput()
        .appendField(
            new Blockly.FieldImage(image, 15, 15, '*'),
            'DIRECTION_IMAGE'
        )
        .appendField('drive', 'DIRECTION_LABEL')
        .appendField(
            new Blockly.FieldDropdown([
              ['forward', 'Motor.DIRECTION_FWD'],
              ['left', 'Motor.DIRECTION_LEFT'],
              ['right', 'Motor.DIRECTION_RIGHT'],
              ['backward', 'Motor.DIRECTION_BACK']
            ]),
            'DIRECTION_SELECTOR'
        );

    var rotationValueInput = this.appendValueInput('ROTATION').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', rotationValueInput);

    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([['rotation', 'Motor.UNIT_ROT'], ['sec', 'Motor.UNIT_SEC']]),
        'UNIT_ROTATION_SELECTOR'
    );

    var speedValueInput = this.appendValueInput('SPEED').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', speedValueInput);

    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['rpm', 'Motor.UNIT_SPEED_RPM'],
          ['power', 'Motor.UNIT_SPEED_PWR']
        ]),
        'UNIT_SPEED_SELECTOR'
    );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('motor_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (event instanceof Blockly.Events.Change) {
      if (event.name === 'DIRECTION_SELECTOR') {
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
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.ENGINE, 15, 15, '*'), 'ENGINE_IMAGE')
        .appendField('move motor')
        .appendField(new Blockly.FieldTextInput('M1'), 'NAME_INPUT')
        .appendField(
            new Blockly.FieldDropdown([
              ['clockwise', 'Motor.DIR_CW'],
              ['counter clockwise', 'Motor.DIR_CCW']
            ]),
            'DIRECTION_SELECTOR'
        );

    var amountValueInput = this.appendValueInput('AMOUNT').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', amountValueInput);

    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['time', 'Motor.UNIT_SEC'],
          ['degree', 'Motor.UNIT_DEG'],
          ['numOfRot', 'Motor.UNIT_ROT']
        ]),
        'UNIT_AMOUNT_SELECTOR'
    );

    var limitValueInput = this.appendValueInput('LIMIT').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', limitValueInput);

    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['rpm', 'Motor.UNIT_SPEED_RPM'],
          ['power', 'Motor.UNIT_SPEED_PWR']
        ]),
        'UNIT_LIMIT_SELECTOR'
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('motor_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_motor
Blockly.Blocks['spin_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.SPIN, 15, 15, '*'), 'SPIN_IMAGE')
        .appendField('spin motor')
        .appendField(new Blockly.FieldTextInput('M1'), 'NAME_INPUT')
        .appendField(
            new Blockly.FieldDropdown([
              ['clockwise', 'Motor.DIR_CW'],
              ['counter clockwise', 'Motor.DIR_CCW']
            ]),
            'DIRECTION_SELECTOR'
        );

    var rotationValueInput = this.appendValueInput('ROTATION').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', rotationValueInput);
    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['speed', 'Motor.UNIT_SPEED_RPM'],
          ['power', 'Motor.UNIT_SPEED_PWR']
        ]),
        'UNIT_SPEED_SELECTOR'
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('motor_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_stop_motor
Blockly.Blocks['block_stop_motor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.STOP, 15, 15, '*'), 'STOP_IMAGE')
        .appendField('stop motor')
        .appendField(new Blockly.FieldTextInput('M1'), 'NAME_INPUT')
        .appendField(
            new Blockly.FieldDropdown([
              ['Stop & hold', 'Motor.ACTION_STOP_AND_HOLD'],
              ['Release', 'Motor.ACTION_RELEASE']
            ]),
            'STOP_ACTION_SELECTOR'
        );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('motor_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_stop_all_motors
Blockly.Blocks['block_stop_all_motors'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.STOP_ALL, 15, 15, '*'), 'STOP_ALL_IMAGE')
        .appendField('stop all motors')
        .appendField(
            new Blockly.FieldDropdown([
              ['Stop & hold', 'Motor.ACTION_STOP_AND_HOLD'],
              ['Release', 'Motor.ACTION_RELEASE']
            ]),
            'STOP_ALL_ACTION_SELECTOR'
        );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('motor_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_ultrasonic_sensor
Blockly.Blocks['block_ultrasonic_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldImage(CUSTOM_IMAGES.ULTRASONIC, 15, 15, '*'),
            'ULTRASONIC_IMAGE'
        )
        .appendField('read')
        .appendField(new Blockly.FieldTextInput('S1'), 'NAME_INPUT')
        .appendField('ultrasonic sensor');
    this.setOutput(true, 'Number');
    this.setStyle('colour_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_bumper
Blockly.Blocks['block_bumper'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.BUMPER, 15, 15, '*'), 'BUMPER_IMAGE')
        .appendField('read')
        .appendField(new Blockly.FieldTextInput('S1'), 'NAME_INPUT')
        .appendField('bumper switch');

    this.setOutput(true, 'Boolean');
    this.setStyle('colour_blocks');
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
            'DIRECTION_TILT_SELECTOR'
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
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.TUNE, 15, 15, '*'), 'TUNE_IMAGE')
        .appendField('play note')
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
            'OCTAVE_SELECTOR'
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
            'KEY_SELECTOR'
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
    this.appendDummyInput().appendField(
        new Blockly.FieldImage(CUSTOM_IMAGES.LIGHT, 15, 15, '*'),
        'LIGHT_IMAGE'
    );
    var ledValueInput = this.appendValueInput('LED')
        .setCheck('Number')
        .appendField('set LED');

    createShadowElement(this.workspace, 'math_number', ledValueInput, '1');
    var colorValueInput = this.appendValueInput('COLOR')
        .setCheck('Colour')
        .appendField('color');

    createShadowElement(this.workspace, 'colour_picker', colorValueInput);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('colour_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block block_set_led
Blockly.Blocks['block_set_multiple_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.LIGHTS, 15, 15, '*'), 'LIGHT_IMAGE')
        .appendField('set LEDs')
        .appendField(new Blockly.FieldTextInput('1,2,3'), 'LED_IDS');

    var colorValueInput = this.appendValueInput('COLOR')
        .setCheck('Colour')
        .appendField('color');

    createShadowElement(this.workspace, 'colour_picker', colorValueInput);

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('colour_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block for random int.
Blockly.Blocks['math_random_int2'] = {
  init: function() {
    this.appendDummyInput().appendField('random integer from');

    var fromValueInput = this.appendValueInput('FROM').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', fromValueInput, '1');

    this.appendDummyInput().appendField('to');

    var toValueInput = this.appendValueInput('TO').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', toValueInput, '100');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setStyle('math_blocks');
    this.setTooltip('%{BKY_MATH_RANDOM_INT_TOOLTIP}');
    this.setHelpUrl('%{BKY_MATH_RANDOM_INT_HELPURL}');
  }
};

// Block for rounding functions.
Blockly.Blocks['math_round2'] = {
  init: function() {
    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['%{BKY_MATH_ROUND_OPERATOR_ROUND}', 'ROUND'],
          ['%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}', 'ROUNDUP'],
          ['%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}', 'ROUNDDOWN']
        ]),
        'OPERATOR_SELECTOR'
    );

    var rightValueInput = this.appendValueInput('NUM').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', rightValueInput);

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setStyle('math_blocks');
    this.setTooltip('%{BKY_MATH_ROUND_HELPURL}');
    this.setHelpUrl('%{BKY_MATH_ROUND_TOOLTIP}');
  }
};

// Block for repeat n times (external number).
Blockly.Blocks['math_arithmetic2'] = {
  init: function() {
    var leftValueInput = this.appendValueInput('A').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', leftValueInput);

    this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['%{BKY_MATH_ADDITION_SYMBOL}', 'ADD'],
          ['%{BKY_MATH_SUBTRACTION_SYMBOL}', 'MINUS'],
          ['%{BKY_MATH_MULTIPLICATION_SYMBOL}', 'MULTIPLY'],
          ['%{BKY_MATH_DIVISION_SYMBOL}', 'DIVIDE'],
          ['%', 'MODULO']
        ]),
        'OPERATOR_SELECTOR'
    );

    var rightValueInput = this.appendValueInput('B').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', rightValueInput);

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setStyle('math_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block logic_and
Blockly.Blocks['logic_and'] = {
  init: function() {
    var leftValueInput = this.appendValueInput('LEFT').setCheck('Boolean');
    createShadowElement(this.workspace, 'logic_boolean', leftValueInput);

    this.appendDummyInput().appendField('and');

    var rightValueInput = this.appendValueInput('RIGHT').setCheck('Boolean');
    createShadowElement(this.workspace, 'logic_boolean', rightValueInput);

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block logic_and
Blockly.Blocks['logic_or'] = {
  init: function() {
    var leftValueInput = this.appendValueInput('LEFT').setCheck('Boolean');
    createShadowElement(this.workspace, 'logic_boolean', leftValueInput);

    this.appendDummyInput().appendField('or');

    var rightValueInput = this.appendValueInput('RIGHT').setCheck('Boolean');
    createShadowElement(this.workspace, 'logic_boolean', rightValueInput);

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block logic_and
Blockly.Blocks['logic_not'] = {
  init: function() {
    this.appendDummyInput().appendField('not');

    var rightValueInput = this.appendValueInput('RIGHT').setCheck('Boolean');
    createShadowElement(this.workspace, 'logic_boolean', rightValueInput);

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['math_trig2'] = {
  init: function() {
    this.setStyle('math_blocks');
    var amountValueInput = this.appendValueInput('RIGHT')
        .setCheck('Number')
        .appendField(
            new Blockly.FieldDropdown([['sin', 'sin'], ['cos', 'cos'], ['tan', 'tan']]),
            'MATH_TRIG_SELECTOR'
        );
    createShadowElement(this.workspace, 'math_number', amountValueInput);
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['if_then_else'] = {
  init: function() {
    this.appendValueInput('COND')
        .setCheck('Boolean')
        .appendField('if');
    this.appendStatementInput('IN_IF')
        .setCheck(null)
        .appendField('then');
    this.appendStatementInput('IN_ELSE')
        .setCheck(null)
        .appendField('else');
    this.setInputsInline(false);
    this.setStyle('logic_blocks');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['if_then'] = {
  init: function() {
    this.appendValueInput('COND')
        .setCheck('Boolean')
        .appendField('if');
    this.appendStatementInput('IN_IF')
        .setCheck(null)
        .appendField('then');
    this.setInputsInline(false);
    this.setStyle('logic_blocks');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['play_tune'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(CUSTOM_IMAGES.TUNE, 15, 15, '*'), 'TUNE_IMAGE')
        .appendField('play tune')
        .appendField(new Blockly.FieldDropdown([['boci', 'boci'], ['pipi', 'pipi']]), 'IN_SOUND');
    this.setColour('#f8bc08');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Block for composing a colour from RGB components.
Blockly.Blocks['colour_rgb2'] = {
  init: function() {
    this.appendDummyInput().appendField('colour with red');

    var redValueInput = this.appendValueInput('RED').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', redValueInput, '0');

    this.appendDummyInput().appendField('green');
    var greenValueInput = this.appendValueInput('GREEN').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', greenValueInput, '0');

    this.appendDummyInput().appendField('blue');
    var blueValueInput = this.appendValueInput('BLUE').setCheck('Number');
    createShadowElement(this.workspace, 'math_number', blueValueInput, '0');

    this.setInputsInline(true);
    this.setOutput(true, 'Colour');
    this.setColour('#f8bc08');
    this.setTooltip('%{BKY_COLOUR_RGB_TOOLTIP}');
    this.setHelpUrl('%{BKY_COLOUR_RGB_HELPURL}');
  }
};
