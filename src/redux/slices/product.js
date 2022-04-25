import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import firebase from 'firebase/compat/app';
import axios from '../../utils/axios';
import 'firebase/compat/firestore';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  sortBy: null,
  search: '',
  result: [],
  filters: {
    category: [],
    rooms: [],
    food: [],
    amenities: [],
    // colors: [],
    priceRange: ''
    // rating: ''
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null
  }
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // START LOADING
    getReviews(state) {
      state.R = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // GET REVIEWS
    getReviewsSuccess(state, action) {
      state.isLoading = false;
      state.product.review = action.payload;
    },

    // DELETE PRODUCT
    deleteProduct(state, action) {
      state.products = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.category = action.payload.category;
      state.filters.rooms = action.payload.rooms;
      state.filters.food = action.payload.food;
      state.filters.amenities = action.payload.amenities;
      // state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      // state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((product) => product.price * product.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = filter(state.checkout.cart, (item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  // deleteProduct,
  createBilling,
  applyShipping,
  applyDiscount,
  filterProducts,
  sortByProducts,
  increaseQuantity,
  decreaseQuantity
} = slice.actions;

// ----------------------------------------------------------------------

// export function getProducts() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/products');
//       dispatch(slice.actions.getProductsSuccess(response.data.products));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------

export function getProduct(name) {
  console.log('name', name);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    firebase.auth().onAuthStateChanged((user) => {
      // const key = `${name.split(' ').join('')}`;
      // const temp1 = [];
      if (user) {
        const docRef = firebase.firestore().collection('PGdetails');
        docRef
          .doc(name)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data();
              console.log('temp1', data);
              dispatch(slice.actions.getProductSuccess(data));
            }
          })
          .catch((error) => {
            console.error(error);
          });
        // console.log('key :>> ', key);
      }
    });
  };
}
// return async (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   try {
//     const response = await axios.get('/api/products/product', {
//       params: { name }
//     });
//     dispatch(slice.actions.getProductSuccess(response.data.product));
//   } catch (error) {
//     console.error(error);
//     dispatch(slice.actions.hasError(error));
//   }
// };
export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    firebase.auth().onAuthStateChanged((user) => {
      const temp = [];
      if (user) {
        const docRef = firebase.firestore().collection('PGdetails');
        docRef
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              temp.push(doc.data());
            });
            dispatch(slice.actions.getProductsSuccess(temp));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };
}

export function deleteProduct(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    firebase.auth().onAuthStateChanged((user) => {
      const key = `${name.split(' ').join('')}`;
      if (user) {
        firebase
          .firestore()
          .collection('PGdetails')
          .doc(key)
          .delete()
          .then(() => {
            console.log('successfully deleted! ');
          })
          .catch((error) => {
            console.log('Error removing document:', error);
          });
      }
    });
  };
}

export function deleteBookPG(name, uid) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    firebase.auth().onAuthStateChanged((user) => {
      const key = `${name.split(' ').join('')}`;
      const key2 = uid;
      const mainKey = key + key2;
      if (user) {
        firebase
          .firestore()
          .collection('BookPG')
          .doc(mainKey)
          .delete()
          .then(() => {
            console.log('successfully booking canceled! ');
          })
          .catch((error) => {
            console.log('Error cancel booking:', error);
          });
      }
    });
  };
}

export function getReviews(name) {
  console.log('namepgproduct', name);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    firebase.auth().onAuthStateChanged((user) => {
      const temp = [];
      if (user) {
        const docRef = firebase.firestore().collection('Feedback');
        docRef
          .where('PGname', '==', name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log('feedback', doc.data());
              temp.push(doc.data());
            });
            const reviews = temp?.map((item) => ({
              date: item?.feedbackDate?.toDate()?.toDateString(),
              name: item?.name,
              rating: item?.rating,
              review: item?.review
            }));
            console.log('temp', reviews);
            dispatch(slice.actions.getReviewsSuccess(reviews));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };
}
