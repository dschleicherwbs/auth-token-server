const router = require('express').Router();
const verifyToken = require('../routes/verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.json({ posts: { title: 'mysdkfs', desc: 'dskfjsdkfmks' } });
});

module.exports = router;
