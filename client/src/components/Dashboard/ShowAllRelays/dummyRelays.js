const totalRelays = Array(98).fill(0).map(Number.call, Number);
export default totalRelays.reduce((relays, relay, idx) => {
  relays.push({
    id: idx,
    name: `Relay Name ${relay}`,
    lastModified: `2019-05-${relay}`,
    createdOn: `2018-06-${relay}`,
    count: relay,
  });
  return relays;
}, []);
