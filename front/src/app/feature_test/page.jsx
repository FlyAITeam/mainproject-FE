// "use client";
// import React from 'react';
// import { getUserInfo } from '@/libs/authController';

// const GetUserInfoPage = () => {
//   const handleGetUserInfo = async () => {
//     try {
//       const response = await getUserInfo();
//       console.log('User info retrieved successfully:', response);
//     } catch (error) {
//       console.error('Error retrieving user info:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGetUserInfo}>Get User Info</button>
//     </div>
//   );
// };

// export default GetUserInfoPage;
// -> 로그인한 사용자의 정보를 가져오는 페이지를 만들어보자.
// -> getUserInfo 함수를 사용하여 사용자 정보를 가져온다.

"use client";
import React from 'react';
import { checkPasswd } from '@/libs/authController';

const LoginPage = () => {
  const handleLogin = async () => {
    const pwd_list = ["123982a!", "1238", "21378", "hjk23", "239knl", "123!@@3"];
    for (let i = 0; i < pwd_list.length; i++) {
      console.log(pwd_list[i], checkPasswd(pwd_list[i]));
    }
  
    // try {
    //   const response = await loginUser('pocketguy1', '1234');
    //   console.log('Login successful:', response);
    // }
    // catch (error) {
    //   console.error('Error logging in:', error);
    // }

  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
