const { mpserverless } = getApp();
const lineCollection = mpserverless.db.collection('line')
const userCollection = mpserverless.db.collection('user')
const noticeCollection = mpserverless.db.collection('notice')

export {
  lineCollection,
  userCollection,
  noticeCollection
}