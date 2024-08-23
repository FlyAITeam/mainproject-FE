// 내장 GPS정보 불러오기 (X, Y좌표)
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {// 내장 gps 모듈 call
        if (navigator.geolocation) { // 유저 gps권한 True
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        'latitude': position.coords.latitude, 
                        'longitude': position.coords.longitude
                    })
                },
                error => {
                    reject(f`${error.code}`);
                }
            );
        } else { // 유저 gps권한 False
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
}


export {getCurrentLocation};