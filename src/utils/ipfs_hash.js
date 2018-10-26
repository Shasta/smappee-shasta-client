const Unixfs = require('ipfs-unixfs');
const {DAGNode} = require('ipld-dag-pb');
const ipfs = require('./ipfs.js');

function localIpfsFromString(string) {
  return new Promise(function(resolve, reject) {
    const data = Buffer.from(string, 'ascii');
    const unixFs = new Unixfs('file', data)

    DAGNode.create(unixFs.marshal(), (err, dagNode) => {
      if (err) {
        return reject(err);
      }
      return resolve(dagNode.toJSON().multihash);
    });
  });
}

async function ipfsAddString(string) {
  const data = Buffer.from(string, 'ascii');
  try {
    const result = await ipfs.add(data);
    return result.hash;
  } catch(error) {
    console.error('Error while saving to IPFS:', error);
    throw new Error('ipfs-add-error');
  }
}

module.exports = {
  localIpfsFromString,
  ipfsAddString
}