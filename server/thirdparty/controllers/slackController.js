const handleSlackEvents = (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(req.body.challenge);
};
module.exports = { handleSlackEvents }
;