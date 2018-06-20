import {fetchPost, fetchGet} from './server.js';

 const api={
	getUser(params={}){
		return new Promise ((resolve,reject)=>{
        	fetchPost('/user', params)
            .then(res=>{
            	resolve(res)
            },error=>{
		            reject(error)
            }).catch((error) => {
            	 reject(error)
            })
       })
	}
}
 export default api;
