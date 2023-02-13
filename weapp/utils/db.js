const { mpserverless } = getApp();
const lineCollection = mpserverless.db.collection('line')
const userCollection = mpserverless.db.collection('user')

export {
  lineCollection,
  userCollection
}