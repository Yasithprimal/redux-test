import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountsSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, message) {
        return { payload: { amount, message } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.balance = state.balance + action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.message;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});


export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposite", payload: converted });
  };
}

export const { withdraw, payLoan, requestLoan } = accountsSlice.actions;

export default accountsSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposite":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.message,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//         loanPurpose: "",
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

// export function deposite(amount, currency) {
//   if (currency === "USD") return { type: "account/deposite", payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//     dispatch({ type: "account/deposite", payload: converted });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(loanAmount, loanMessage) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: loanAmount, message: loanMessage },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
