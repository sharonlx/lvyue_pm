export default (req, res) => {
  const ret = {
      'ret': true,
      'msg': null,
      'errcode': null,
      'data': [
          {
            'typeId': 3,
            'typeName': '电视',
            'deviceType': 'TV',
            'devices': [
              {
                'id': 16,
                'deviceName': '电视',
                'open': 0
              }
            ]
        },
        {
          'typeId': 4,
          'typeName': '加湿器',
          'deviceType': '加湿器',
          'devices': [
            {
              'id': 12,
              'deviceName': '电视',
              'open': 1
            }
          ]
      },
          {
          'typeId': 1,
          'typeName': '照明',
          'deviceType': 'LIGHTS',
          'devices': [
            {
              'id': 17,
              'deviceName': '廊灯',
              'open': 0
            },
            {
              'id': 18,
              'deviceName': '客厅灯',
              'open': 0
            },
            {
              'id': 19,
              'deviceName': '一灯',
              'open': 0
            },
            {
              'id': 20,
              'deviceName': '2灯',
              'open': 0
            },
            {
              'id': 21,
              'deviceName': '零灯',
              'open': 0
            },
            {
              'id': 22,
              'deviceName': '三灯',
              'open': 0
            }
          ]
        }
      ]
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ret));
};
