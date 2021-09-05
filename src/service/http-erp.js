import baseHttp from "./http-common"
const resource = '/erp';
const login = '/';

export default {
  // getInfoUser(){
  //   return baseHttp.get(`${resource}`);
  // },
  getInfoUser(){
    return baseHttp.get(`user`);
  },
  login(data){
    return baseHttp.post('login', data)
  },
  logout(){
    return baseHttp.get('logout')
  }
}
