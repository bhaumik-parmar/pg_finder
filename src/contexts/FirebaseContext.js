import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
// import product from 'src/redux/slices/product';
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
  // changePassword: () => Promise.resolve(),
  bookPG: () => Promise.resolve(),
  paymentMethod: () => Promise.resolve(),
  payment: () => Promise.resolve(),
  invoice: () => Promise.resolve(),
  feedback: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  newPG: () => Promise.resolve(),
  updatePG: () => Promise.resolve(),
  deletePG: () => Promise.resolve(),
  contactUs: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { product } = useSelector((state) => state.product);

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
            displayName: `${firstName} ${lastName}`,
            role: 'customer'
          });
      });

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  // const changePassword = async (password) => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       const passwdRef = firebase.firestore().collection('Registration').doc(user.uid);
  //       passwdRef
  //         .update(
  //           {
  //             password
  //           },
  //           { merge: true }
  //         )
  //         .then(() => {
  //           console.log('Password changed');
  //         })
  //         .catch((error) => {
  //           console.error('Error updating document: ', error);
  //         });
  //     }
  //   });
  // };

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
              photoURL: photoURL || null,
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

  const bookPG = async (firstName, lastName, email, phone, profession, roomType) => {
    firebase.auth().onAuthStateChanged((user) => {
      const Pgname = product?.name;
      const key = `${Pgname.split(' ').join('')}`;
      const key2 = user.uid;
      const mainKey = key + key2;
      if (user) {
        const customerDetailsRef = firebase.firestore().collection('BookPG').doc(mainKey);
        customerDetailsRef
          .set({
            uid: user.uid,
            bookDate: firebase.firestore.FieldValue.serverTimestamp(),
            firstName,
            lastName,
            email,
            phone,
            profession,
            roomType,
            PGname: product?.name
          })
          .then(() => {
            console.log('Customer details submitted');
          })
          .catch((error) => {
            console.error('Error Customer details submit: ', error);
          });
      }
    });
  };

  const paymentMethod = async (payment) => {
    firebase.auth().onAuthStateChanged((user) => {
      const PGname = JSON.parse(localStorage.getItem('PG Name'));
      if (user) {
        const paymentMethodRef = firebase.firestore().collection('Payment').doc();
        paymentMethodRef
          .set({
            uid: user.uid,
            payment,
            pgName: PGname.name
          })
          .then(() => {
            console.log('PG booking successful');
          })
          .catch((error) => {
            console.error('Error booking PG: ', error);
          });
      }
    });
  };

  const payment = async (cardName, cardNumber, cardExpiredMonth, cardExpiredYear) => {
    firebase.auth().onAuthStateChanged((user) => {
      const PGname = JSON.parse(localStorage.getItem('PG Name'));
      if (user) {
        const cardExpiredDate = [cardExpiredMonth, cardExpiredYear].join('/');
        const paymentRef = firebase.firestore().collection('Payment').doc();
        paymentRef
          .set({
            paymentDate: firebase.firestore.FieldValue.serverTimestamp(),
            cardName,
            cardNumber,
            cardExpiredDate,
            pgName: PGname.name,
            uid: user.uid
          })
          .then(() => {
            console.log('Payment successful');
          })
          .catch((error) => {
            console.error('Error payment: ', error);
          });
      }
    });
  };

  const invoice = async (
    invoiceId,
    invoiceDate,
    pgName,
    pgAddress,
    pgPrice,
    customerName,
    customerAddress,
    customerPhone
  ) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const paymentRef = firebase.firestore().collection('Invoice').doc(invoiceId);
        paymentRef
          .set({
            invoiceId,
            invoiceDate,
            pgName,
            pgAddress,
            pgPrice,
            customerName,
            customerAddress,
            customerPhone,
            uid: user.uid
          })
          .then(() => {
            console.log('Invoice generated successful');
          })
          .catch((error) => {
            console.error('Error generate invoice: ', error);
          });
      }
    });
  };

  const feedback = async (rating, review, name, email) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const paymentRef = firebase.firestore().collection('Feedback').doc();
        paymentRef
          .set({
            feedbackDate: firebase.firestore.FieldValue.serverTimestamp(),
            PGname: product?.name,
            rating,
            review,
            name,
            email,
            uid: user.uid
          })
          .then(() => {
            console.log('Feedback give successful');
          })
          .catch((error) => {
            console.error('Error give feedback: ', error);
          });
      }
    });
  };

  const newPG = async (
    name,
    description,
    images,
    owner,
    area,
    city,
    state,
    price,
    houseRules,
    status,
    category,
    rooms,
    food,
    amenities
  ) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const key = `${name.split(' ').join('')}`;
        const pgDetailsRef = firebase.firestore().collection('PGdetails').doc(key);
        let image = [...images];
        image = image.map((item) => (image[item] = { ...item }));
        pgDetailsRef
          .set({
            uid: user.uid,
            publishDate: firebase.firestore.FieldValue.serverTimestamp(),
            name,
            description,
            image,
            owner,
            area,
            city,
            state,
            price,
            houseRules,
            status,
            category,
            rooms,
            food,
            amenities
          })
          .then(() => {
            console.log('Add PG successful');
          })
          .catch((error) => {
            console.error('Error add PG: ', error);
          });
      }
    });
  };

  const updatePG = async (
    name,
    description,
    images,
    owner,
    area,
    city,
    state,
    price,
    houseRules,
    status,
    category,
    rooms,
    food,
    amenities
  ) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const key = `${name.split(' ').join('')}`;
        const pgDetailsRef = firebase.firestore().collection('PGdetails').doc(key);
        let image = [...images];
        image = image.map((item) => (image[item] = { ...item }));
        pgDetailsRef
          .update(
            {
              uid: user.uid,
              publishDate: firebase.firestore.FieldValue.serverTimestamp(),
              name,
              description,
              image,
              owner,
              area,
              city,
              state,
              price,
              houseRules,
              status,
              category,
              rooms,
              food,
              amenities
            },
            { merge: true }
          )
          .then(() => {
            console.log('Update PG successful');
          })
          .catch((error) => {
            console.error('Error update PG: ', error);
          });
      }
    });
  };

  const contactUs = async (name, email, subject, message) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const contactRef = firebase.firestore().collection('Contactus').doc();
        contactRef
          .set({
            date: firebase.firestore.FieldValue.serverTimestamp(),
            uid: user.uid,
            name,
            email,
            subject,
            message
          })
          .then(() => {
            console.log('Send contact message successful');
          })
          .catch((error) => {
            console.error('Error send message: ', error);
          });
      }
    });
  };
  // const deletePG = async (name) => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     const key = `${name.split(' ').join('')}`;
  //     if (user) {
  //       firebase
  //         .firestore()
  //         .collection('PGdetails')
  //         .doc(key)
  //         .delete()
  //         .then(() => {
  //           console.log('successfully deleted! ');
  //         })
  //         .catch((error) => {
  //           console.log('Error removing document:', error);
  //         });
  //     }
  //   });
  // };
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
        // roleFetch,
        login,
        register,
        updateProfile,
        // changePassword,
        bookPG,
        paymentMethod,
        payment,
        invoice,
        feedback,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        newPG,
        updatePG,
        contactUs
        // deletePG
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
