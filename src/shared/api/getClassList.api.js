
import firebase from 'firebase';

const getClassList = () => {
  const DB = firebase.database();
  return DB.ref("/classList").once("value");
}
export default getClassList;