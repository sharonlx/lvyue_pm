export default (req, res) => {
  const ret = {
      'ret': true,
      'msg': null,
      'errcode': null
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(ret));
};
