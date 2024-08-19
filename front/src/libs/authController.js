const API_BASE_URL = 'http://localhost:8000';

// 사용자 로그인
const loginUser = async (loginId, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, password }),
    });

    if (!response.ok) {
      throw new Error('로그인 실패');
    }

    const data = await response.json();
    console.log('로그인 성공:', data);

    // Access token을 localStorage에 저장
    localStorage.setItem('accessToken', data.access_token);

    return data;
  } catch (error) {
    console.error('로그인 중 오류:', error);
    throw error;
  }
};

// 로그인 ID 중복 확인
const checkLoginId = async (loginId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-loginid?loginid=${loginId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('로그인 ID 확인 실패');
    }

    const data = await response.json();
    console.log('로그인 ID 확인 성공:', data);
    return data;
  } catch (error) {
    console.error('로그인 ID 확인 중 오류:', error);
    throw error;
  }
};

// 사용자 회원가입
const registerUser = async (loginId, password, name) => {
  try {
    const input_box = JSON.stringify({ loginId:loginId, password:password, name:name });
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: input_box
    });

    if (!response.ok) {
      throw new Error('회원가입 실패');
    }

    const data = await response.json();
    console.log('회원가입 성공:', data);
    return data;
  } catch (error) {
    console.error('회원가입 중 오류:', error);
    throw error;
  }
};

// 사용자 정보 조회
const getUserInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('사용자 정보 조회 실패');
    }

    const data = await response.json();
    console.log('사용자 정보 조회 성공:', data);
    return data;
  } catch (error) {
    console.error('사용자 정보 조회 중 오류:', error);
    throw error;
  }
};

// passWd 검증 (길이 6자리 이상, 숫자 영문 포함, 기호는 넣어도 되고 안넣어도 됨)
const checkPasswd = (passwd) => {
    const passwdReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
    return passwdReg.test(passwd);
};

// Access token 존재 여부 확인
const isTokenAvailable = () => {
  // token출력  
  return !!localStorage.getItem('accessToken');
};

export { loginUser, checkLoginId, registerUser, getUserInfo, checkPasswd, isTokenAvailable };