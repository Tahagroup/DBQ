// import { BrowseRouter } from "react-router-dom";
// <BrowseRouter>
//   <App />
// </BrowseRouter>;
// import { NavigateBefore } from "@material-ui/icons";
// import { mergeClasses } from "@material-ui/styles";
// import { Route } from "react-router-dom";
// //now to define a root:
// {
//   /* <Route path="/welcome">
//   <Component_to_render />
// </Route>; */
// }

// // import { Link } from "react-router-dom";
// // <NavLink activeClassName={classes.active} to="/welcome">
// //   WELCOME navbar link
// // </NavLink>;
// <Route path="/products/:productId">
//   <Component_to_render />
// </Route>;

// import { useParams } from "react-router-dom";
// const params = useParams();
// // now we can access it by: params.productId

// <Switch>
//   {/* other routes, default should be last */}
//   <Route path="*">
//     <PageNotFound />
//   </Route>
// </Switch>;

// <Route path="/" exact>
//   {/* set homepage route: */}
//   <Redirect to="welcome" />
// </Route>;

// import { useHistory } from "react-router-dom";
// // const history = useHistory();
// history.push("/products"); // navigate to products, browser's back button returns to current page
// history.replace("/products"); // browser's back button DOES NOT return to current page

// import { Prompt } from "react-router-dom";
// // should be placed beside page which we are trying to protect:
// // if boolState is true propt will prevent route transitions
// <prompt
//   when={boolState}
//   message={(location) => " text to be displayed on prompt"}
// />;

// import { useHistory, useLocation } from "react-router-dom";
// const history = useHistory();
// const location = useLocation();
// // URLSearchParams is a built-in browser method to extract query params:
// const queryParams = new URLSearchParams(Location.search); //search holds queryParameter data like: '?id=quoteId'
// const getPar = queryParams.get("id");
// // and to change query parameters which leads to component re-execution:
// history.push("/quotes/?id=quoteId");

// //similar to use location but has more information:
// import { useRouteMatch } from "react-router-dom";
// const match = useRouteMatch();
// // and use:
// match.params; // object that holds route parameters
// match.path; // like: 'quotes/:quoteId'
// match.url; // like: 'quotes/:q2'
// // to calculate paths dynamically

// // all paths that start with /product expect one's that are more specific like: /products/main which will be directed to the corresponding route
// <Route path="/products/*" element={<Component_to_render />} />;

// <NavLink
//   ClassName={(navData) => {
//     navData.isActive ? classes.active : "";
//   }}
//   to="/welcome"
// >
//   WELCOME navbar link
// </NavLink>;

// <Route path="/" element={<Navigate replace to="/welcome" />} />;

// <Route path="/products/product-id/details">
//   <Component_to_render />
// </Route>;

// // wrapping with <Routes> is necessary, path should be relative to parent
// <Routes>
//   {/* other routes */}
//   <Route path="product-id" element={<p>Hi,new user!</p>}>
//     <Component_to_render />
//   </Route>
// </Routes>;

// <Routes>
//   {/* other main routes */}
//   <Route path="/welcome/*" element={<Welcome />}>
//     <Route path="new-user" element={<p>Hi,new user!</p>} />
//   </Route>
//   {/* other main routes */}
// </Routes>;

// import { useNavigation } from "react-router-dom";
// const navigate = useNavigation();
// navigate(-2); // go two pages back
// navigate("/welcome", { replace: true }); //can pass options like replacing instead of pushing

// import React, { Suspense, useReducer, useRef } from "react";
// const componentName = React.lazy(() => import("component path"));

// <Suspense fallback={<fallbackComponentName />}>
//   <Routes>{/* ... */}</Routes>
// </Suspense>;

// <Routes>
//   {/* 1: can not use path if not loggedIn */}
//   isLoggedIn && (<Route path={"/profile"} element={<Component_to_render />} />)
//   {/* 1: enters the path but diffrent pages based on login status */}
//   <Route
//     path={"/profile"}
//     element={isLoggedIn ? <Login /> : <Navigate to="/login" replace />}
//   />
//   <Route path={"*"} element={<Navigate to="/pagenotfound" replace />} />
// </Routes>;

// const ComponentName: React.FC<{ items: string[] }> = (props) => {
//   return (
//     <>
//       <div>props.items</div>
//       <div>props.children</div>
//     </>
//   );
// };
// export default ComponentName;

// function add(a: number, b: number): number {
//   // the return expression is inferred to be a number
//   // even if not declared
//   return a + b;
// }
// class Todo {
//   id: string;
//   text: String;
//   constructor(todoId: string, todoText: string) {
//     this.id = todoId;
//     this.text = todoText;
//   }
// }

// const submitHandler = (event: React.FormEvent) => {
//   event.preventDefault;
//   // implemention
// };

// //
// const inputRef = useRef < HTMLInputElement > null;
// <input type="text" id="text" ref={inputRef}>
//   TEXT
// </input>;

// const [data,setData] = setState<string[]>([])

// import React, { useState } from 'react';

// import Todo from '../models/todo';

// type TodosContextObj = {
//   items: Todo[];
//   addTodo: (text: string) => void;
//   removeTodo: (id: string) => void;
// };

// export const TodosContext = React.createContext<TodosContextObj>({
//   items: [],
//   addTodo: () => {},
//   removeTodo: (id: string) => {},
// });

// const TodosContextProvider: React.FC = (props) => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   const addTodoHandler = (todoText: string) => {
//     const newTodo = new Todo(todoText);

//     setTodos((prevTodos) => {
//       return prevTodos.concat(newTodo);
//     });
//   };

//   const removeTodoHandler = (todoId: string) => {
//     setTodos((prevTodos) => {
//       return prevTodos.filter((todo) => todo.id !== todoId);
//     });
//   };

//   const contextValue: TodosContextObj = {
//     items: todos,
//     addTodo: addTodoHandler,
//     removeTodo: removeTodoHandler,
//   };

//   return (
//     <TodosContext.Provider value={contextValue}>
//       {props.children}
//     </TodosContext.Provider>
//   );
// };

// export default TodosContextProvider;

// useState(prevState => {
//   // calculations
//   return newState;
// });

// const reducerFunction = (prevState, action) =>{
// switch (action.type) {
//   case "action1:like ADD":
//   return newState1;
//   case "action2:like DELETE":
//   return newState2;

//   default:
//     // throw an error or provide a default state
// }
// }

const [stateData, dispatch] = useReducer(reducerFunction, []); // no optional init function here

export const contextName = React.createContext(
  // data of context, can be strings, number, an object and etc. example:
  { isAuthenticated: false, login: () => {}, logout: () => {} }
);

const AuthContexProvider = (props) => {
  //logic will be here:
  const [isAuthenticated, setIsAuthenticaed] = useState(false);
  const loginHandler = () => {
    setIsAuthenticaed(true);
  };
  const logoutHandler = () => {
    setIsAuthenticaed(false);
  };
  return (
    <contextName.Provider
      value={{
        isAuthenticated: false,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </contextName.Provider>
  );
};

export default AuthContexProvider;

<AuthContexProvider>
  <App />
</AuthContexProvider>;

{
  (ctx) => {
    return <contextName.consumer>{/* <Component/> */}</contextName.consumer>;
  };
}

const authContextData = useContext(authContext);
const loginStatus = authContextData.isAuthenticated;
