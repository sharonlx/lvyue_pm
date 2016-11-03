export default (req, res) => {
  const ret = {
      'ret': true,
      'msg': null,
      'errcode': null,
      'data': [
        {
          'roomId': 1,
          'roomNo': '308室',
          'hotelId': 1,
          'hotelName': '北京哈哈哈哈酒店',
          'gwId': 1
        }
        ,
        {
          'roomId': 1,
          'roomNo': '309室',
          'hotelId': 1,
          'hotelName': '北京哈哈哈哈酒店',
          'gwId': 2
          },
          {
            'roomId': 2,
            'roomNo': '3109室',
            'hotelId': 1,
            'hotelName': '北京哈哈哈哈酒店2222',
            'gwId': 3
        },{
          'roomId': 2,
          'roomNo': '3108室',
          'hotelId': 1,
          'hotelName': '北京哈哈哈哈酒店2222',
          'gwId': 4
      },
        {
          'roomId': 3,
          'roomNo': '3029室',
          'hotelId': 1,
          'hotelName': '北京哈哈哈哈酒店33333',
          'gwId': 5
      },
      {
        'roomId': 3,
        'roomNo': '3210室',
        'hotelId': 1,
        'hotelName': '北京哈哈哈哈酒店33333',
        'gwId': 6
      }
      ]
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ret));
};
