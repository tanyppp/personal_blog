const noteDAO = require('../DAO/noteDAO');
const resp = require('../utils/respUtil');
const timeUtil = require('../utils/timeUtil');

const m = new Map();

function insertNote(req, res) {
  req.on('data', function (data) {
    const {
      note
    } = JSON.parse(data.toString());
    const t = timeUtil.getNow();
    noteDAO.insertNote(note, t, t, function () {
      res.writeHead(200);
      res.end(resp('ok', '添加成功', null));
    });
  });
}
m.set('/insertNote', insertNote);

function queryAllNote(_, res) {
  noteDAO.queryAllNote(function (result) {
    result.forEach(function (item) {
      item.ctime = timeUtil.getFormatTime(item.ctime);
      item.utime = timeUtil.getFormatTime(item.utime);
    });
    res.writeHead(200);
    res.end(resp('ok', '添加成功', result));
  });
}
m.set('/queryAllNote', queryAllNote);

module.exports = m;
