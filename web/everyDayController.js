const everyDayDAO = require('../DAO/everyDayDAO');
const resp = require('../utils/respUtil');
const timeUtil = require('../utils/timeUtil');

const m = new Map();

function insertEveryDay(req, res) {
  req.on('data', function (data) {
    const newData = JSON.parse(data.toString().replace(/[\r\n]/g, ''));
    everyDayDAO.insertEveryDay(newData.content, newData.author, timeUtil.getNow(), function () {
      res.writeHead(200);
      res.end(resp('ok', '插入成功', null));
    });
  });
}
m.set('/insertEveryDay', insertEveryDay);

function queryEveryDay(req, res) {
  everyDayDAO.queryEveryDay(function (result) {
    res.writeHead(200);
    res.end(resp('ok', '查询成功', result[0]));
  });
}
m.set('/queryEveryDay', queryEveryDay);

module.exports = m;
