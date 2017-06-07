import React from 'react';
import firebase from 'firebase';
import {Button,Card,CardSection,Input,Spinner} from './common';
import {Text} from 'react-native';
class LoginForm extends React.Component{
    state={email:'',password:'',errors:'',loading:false};
    constructor(props){
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFaild = this.onLoginFaild.bind(this);
    }
    onButtonPress(){
        this.setState({loading:true});
        const {email,password}=this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((res)=>{
                this.onLoginSuccess();
            })
            .catch(()=>{
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((res)=>{
                        this.onLoginSuccess();
                    })
                    .catch((e)=>{
                        this.onLoginFaild(e)
                    });
            })
    }
    onLoginFaild(err){
        this.setState({
            errors:err
        });
    }
    onLoginSuccess(){
        this.setState({
            email:'',
            password:'',
            errors:'',
            loading:false
        });
    }
    renderButton(){
        if(this.state.loading){
            return <Spinner size="small"/> ;
        }else{
            return(
                <Button onPress={this.onButtonPress}>
                    Login
                </Button>
            );
        }
    }
    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        placeholder="user@gmail.com"
                        secure={false}
                        value={this.state.email}
                        onChangeText={email=>this.setState({email})}
                        />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label='Password'
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={password=>this.setState({password})}
                    />
                </CardSection>
                <CardSection>
                </CardSection>
                <Text style={{alignSelf:'center',color:'red',fontSize:20}}>{this.state.errors}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

export default LoginForm;