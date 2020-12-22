//网络请求
export default class Request{
	/*
	*paramete 参数
	* data 参数值
	* method 请求方式
	*/
	http(paramete,data,method){
		//根地址
		let BASE_API="http://admin.farmereasy.com";
		return new Promise((resolve,reject)=>{
			uni.request({
				url:`${BASE_API}${paramete}`,
				data:data,
				method:method,
				success:(res)=>{
					resolve(res);
				},
				fail:(res)=>{
					resolve(0);
				}
			})
		});
	}
}
