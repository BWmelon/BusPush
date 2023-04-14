const { mpserverless } = getApp();
const lineCollection = mpserverless.db.collection('line')
const userCollection = mpserverless.db.collection('user')
const noticeCollection = mpserverless.db.collection('notice')
const feedbackCollection = mpserverless.db.collection('feedback')

export {
    lineCollection,
    userCollection,
    noticeCollection,
    feedbackCollection
}