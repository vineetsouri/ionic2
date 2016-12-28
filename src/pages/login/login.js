var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
// import { Resource } from '../resource/page1';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LoginPage = (function () {
    function LoginPage(navCtrl, alertCtrl, loadingCtrl, af) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.af = af;
        this.loginBtnSelected = true;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var loadingItem = this.loadingCtrl.create({
            content: "Please Wait.. we are trying to log you in.",
        });
        loadingItem.present();
        this.af.auth.login({ email: this.loginUserName, password: this.loginPassword }).then(function (data) {
            loadingItem.dismissAll();
            // this.navCtrl.push(Resource);
        }).catch(function (err) {
            console.log(err);
            loadingItem.dismissAll();
            _this.alertCtrl.create({
                title: "Unable to Login",
                subTitle: "Please check your username and password",
                buttons: ['OK']
            }).present();
        });
    };
    LoginPage.prototype.doSignUp = function () {
        console.log(this.signUpUserName, this.signUpPassword);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController, AlertController,
        LoadingController, AngularFire])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map