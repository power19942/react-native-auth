import React,{Component} from 'react';
import {View,Text} from 'react-native';
import firebase from 'firebase'
import {Header} from './components/common';
import LoginForm from './components/LoginForm';
class App extends Component{
    state = {loggedIn:false};
    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyDG_Vi8bqlWrv6qPLYmAqR1q5hJqPaJlmg",
            authDomain: "react-auth-2a885.firebaseapp.com",
            databaseURL: "https://react-auth-2a885.firebaseio.com",
            projectId: "react-auth-2a885",
            storageBucket: "react-auth-2a885.appspot.com",
            messagingSenderId: "723980600981"
        });
        firebase.auth().onAuthStateChanged((user)=>{
           if(user){
               this.setState({loggedIn:true})
           }else{
               this.setState({loggedIn:false})
           }
        });
    }
    loginForm(){
        if(this.state.loggedIn){
            return <LoginForm/>;
        }else{

        }
    }
    render(){
        return(
           <View>
               <Header headerText={'Authentication'}/>
               {this.loginForm()}
           </View>
        )
    }
}

export default App;