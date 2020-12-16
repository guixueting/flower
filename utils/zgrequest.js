const baseUrl = "https://h5.youzan.com"
export function myRequestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifndef H5
			url: baseUrl + url,
			//#endif
			//#ifdef H5
			url: url,
			//#endif
			method: "GET",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}


