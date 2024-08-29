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
    localStorage.setItem("accessToken", response.headers.get("accessToken"));

    // 토큰 출력
    // console.log("최근 토큰 정보: ", localStorage.getItem("accessToken"));

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        method: "GET",
        headers: {
          accessToken: `${localStorage.getItem("accessToken")}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("사용자 정보 조회 실패");
    }

    const data = await response.json();

    // 수정된 accessToken으로 localStorage 업데이트
    const accessToken = response.headers.get("accessToken");
    localStorage.setItem("accessToken", accessToken);

    // 토큰 출력
    // console.log("최근 토큰 정보: ", localStorage.getItem("accessToken"));

    return data;
  } catch (error) {
    console.error("사용자 정보 조회 중 오류:", error);
    throw error;
  }
};

export {
  loginUser,
  registerUser,
  getUserInfo,
  checkDuplicateUserId,
};
