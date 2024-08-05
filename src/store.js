import { combineReducers, createStore } from "redux";

///initial-states

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

///reducers-account

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.message,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

///reducers-customer

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

///rootreducer

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

///actioncreators-account

function deposite(amount) {
  store.dispatch({ type: "account/deposite", payload: amount });
}
function withdraw(amount) {
  store.dispatch({ type: "account/withdraw", payload: amount });
}
function requestLoan(loanAmount, loanMessage) {
  store.dispatch({
    type: "account/requestLoan",
    payload: { amount: loanAmount, message: loanMessage },
  });
}
function payLoan() {
  store.dispatch({ type: "account/payLoan" });
}

///actioncreators-customer

function createCustomer(fullName, nationalId) {
  store.dispatch({
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  });
}

function updateName(fullName) {
  store.dispatch({
    type: "customer/updateName",
    payload: fullName,
  });
}

///

deposite(5000);
withdraw(2000);
requestLoan(1000, "for rent");
payLoan();

createCustomer("Adrew Yasith Primal", "2222222");
updateName("Prima yasith Andrew");

console.log(store.getState());
