import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Page1 } from '../resource/page1';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  loginUserName: string;
  loginPassword: string;
  signUpUserName: string;
  signUpPassword: string;
  signUpReconfirmPassword: string;
  loginBtnSelected: boolean;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private af: AngularFire) {
    this.loginBtnSelected = true;
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  doLogin() {
    let loadingItem = this.loadingCtrl.create({
      content: "Please Wait.. we are trying to log you in.",
    });
    loadingItem.present();
    this.af.auth.login({email: this.loginUserName, password: this.loginPassword}).then(data => {
      loadingItem.dismissAll();
      this.navCtrl.push(Page1);
    }).catch(err => {
      console.log(err);
      loadingItem.dismissAll();
      this.alertCtrl.create({
        title: "Unable to Login",
        subTitle: "Please check your username and password",
        buttons: ['OK']
      }).present();
    })
  }

  doSignUp(){
    console.log(this.signUpUserName, this.signUpPassword);
  }
}