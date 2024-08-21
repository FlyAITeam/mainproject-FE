// 사용자 로그인
const loginUser = async (loginId, password) => {
  try {
    const fetch_url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    const response = await fetch(fetch_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginId, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error("로그인 실패");
    }

    const data = await response.json();
    console.log("로그인 성공:", data);
    // 헤더에 저장된 Access token을 변수에 넣어 localStorage에 저장
    const accessToken = response.headers.get("accessToken");
    console.log("accessToken", accessToken);
    localStorage.setItem("accessToken", response.headers.get("accessToken"));

    return data;
  } catch (error) {
    console.error("로그인 중 오류:", error);
    throw error;
  }
};

// 로그인 ID 중복 확인
const checkDuplicateUserId = async (loginId) => {
  try {
    const fetch_url = `${process.env.NEXT_PUBLIC_API_URL}/check-loginid?loginid=${loginId}`;
    const response = await fetch(fetch_url, { method: "GET" });
    return !response.ok;
  } catch (error) {
    return false;
  }
};

// 사용자 회원가입
const registerUser = async (loginId, password, name) => {
  try {
    const fetch_url = `${process.env.NEXT_PUBLIC_API_URL}/register`;
    const response = await fetch(fetch_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginId, password, name }),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    const data = await response.json();
    console.log("회원가입 성공:", data);
    await loginUser(loginId, password);
    return data;
  } catch (error) {
    console.error("회원가입 중 오류:", error);
    throw error;
  }
};

// 사용자 정보 조회
const getUserInfo = async () => {
  try {
    const fetch_url = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;
    const response = await fetch(fetch_url, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (!response.ok) {
      throw new Error("사용자 정보 조회 실패");
    }

    const data = await response.json();
    console.log("사용자 정보 조회 성공:", data);
    return data;
  } catch (error) {
    console.error("사용자 정보 조회 중 오류:", error);
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
  // token 출력
  console.log(localStorage.getItem("accessToken"));
  return !!localStorage.getItem("accessToken");
};

export {
  loginUser,
  registerUser,
  getUserInfo,
  checkPasswd,
  isTokenAvailable,
  checkDuplicateUserId,
};
