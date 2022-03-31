import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { firebaseConfig } from '../config';
// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['demo@minimals.cc'];

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const initialState = {
  isAuthenticated: false,
  isInitialized: true,
  user: null
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  changePassword: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase.firestore().collection('Registration').doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null }
          });
        }
      }),
    []
  );

  const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const register = (email, password, firstName, lastName, phone) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection('Registration')
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            firstName,
            lastName,
            email,
            phone,
            password,
            displayName: `${firstName} ${lastName}`
          });
      });

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const changePassword = async (password) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const passwdRef = firebase.firestore().collection('Registration').doc(user.uid);
        passwdRef
          .update(
            {
              password
            },
            { merge: true }
          )
          .then(() => {
            console.log('Password changed');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
      }
    });
  };

  const updateProfile = async ({ displayName, email, phone, photoURL, address, city, zipCode, about }) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const [firstName, lastName] = displayName.split(' ');
        const profileRef = firebase.firestore().collection('Registration').doc(user.uid);
        profileRef
          .update(
            {
              firstName,
              lastName,
              displayName,
              email,
              phone,
              photoURL,
              address,
              city,
              zipCode,
              about
            },
            { merge: true }
          )
          .then(() => {
            console.log('Profile updated');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
      }
    });
  };
  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          email: auth.email || profile?.email,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          password: auth.password || profile?.password,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
          phone: auth.phoneNumber || profile?.phone || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false
        },
        login,
        register,
        updateProfile,
        changePassword,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
