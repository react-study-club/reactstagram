import { handleActions } from "redux-actions";
import { firebase_db } from "../service/firebaseConfig";
//const SAVEPROFILE = "auth/SAVEPROFILE";
const SYNCPROFILE = "auth/SYNCPROFILE";

// export const saveProfile = (profile) => async (dispatch) => {
//   try {
//     const newProfile = await firebase_db
//       .ref(`users/${profile.uid}/Profile`)
//       .set(profile);
//   } catch (e) {
//     throw e;
//   }
// };

export const syncProfile = (userId) => async (dispatch) => {
  try {
    const dbRef = firebase_db.ref(`users/${userId}/Profile`);
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      dispatch({ SYNCPROFILE, payload: data });
    });
    return () => dbRef.off();
  } catch (e) {
    throw e;
  }
};

const initialState = {
  Profile: {
    Introduce: "",
    Uid: "",
    Username: "",
    Userphoto: "",
  },
};

const profileDB = handleActions(
  {
    [SYNCPROFILE]: (state, action) => action.payload,
  },
  initialState
);

export default profileDB;
