export default (req, res) => {
  const ret = {
      'ret': true,
      'msg': null,
      'errcode': null,
      'data': [
          {
              'id': 1,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_1',
              'buttonId': 1,
              'description': '电视按键1'
          },
          {
              'id': 2,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_2',
              'buttonId': 1,
              'description': '电视按键2'
          },
          {
              'id': 3,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_3',
              'buttonId': 1,
              'description': '电视按键3'
          },
          {
              'id': 4,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_4',
              'buttonId': 1,
              'description': '电视按键4'
          },
          {
              'id': 5,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_5',
              'buttonId': 1,
              'description': '电视按键5'
          },
          {
              'id': 6,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_6',
              'buttonId': 1,
              'description': '电视按键6'
          },
          {
              'id': 7,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_7',
              'buttonId': 1,
              'description': '电视按键7'
          },
          {
              'id': 8,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_3',
              'buttonId': 8,
              'description': '电视按键8'
          },
          {
              'id': 9,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_9',
              'buttonId': 1,
              'description': '电视按键9'
          },
          {
              'id': 10,
              'infraredType': 'SONY_SERIAL',
              'displayName': '0',
              'buttonType': 'TV_0',
              'buttonId': 1,
              'description': '电视按键0'
          },
          {
              'id': 11,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_ADD_P',
              'buttonId': 1,
              'description': '节目+'
          },
          {
              'id': 12,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_REDUCE_P',
              'buttonId': 1,
              'description': '节目-'
          },
          {
              'id': 13,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_ON',
              'buttonId': 1,
              'description': '开'
          },
          {
              'id': 14,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_OFF',
              'buttonId': 1,
              'description': '关'
          },
          {
              'id': 15,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_MUTE',
              'buttonId': 1,
              'description': '静音'
          },
          {
              'id': 16,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_REPLAY',
              'buttonId': 1,
              'description': '回看'
          },
          {
              'id': 17,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_NUMBERS',
              'buttonId': 1,
              'description': '输入频道'
          },
          {
              'id': 18,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_ADD_V',
              'buttonId': 1,
              'description': '音量+'
          },
          {
              'id': 19,
              'infraredType': 'SONY_SERIAL',
              'displayName': '1',
              'buttonType': 'TV_REDUCE_V',
              'buttonId': 1,
              'description': '音量-'
          }

      ]
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ret));
};
