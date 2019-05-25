const tagsDAO = require('../DAO/tagsDAO');
const resp = require('../utils/respUtil');

const m = new Map();

function queryTags(_, res) {
  tagsDAO.queryTags(function (result) {
    res.writeHead(200);
    res.end(resp('ok', '查询成功', result));
  });
}
m.set('/queryTags', queryTags);

module.exports = m;
