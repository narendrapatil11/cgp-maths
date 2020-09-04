
import firebase from 'firebase';

const getSubjectList = (className) => {
  const DB = firebase.database();
  return DB.ref(`/subjects/${className}`).once("value");
}
export default getSubjectList;