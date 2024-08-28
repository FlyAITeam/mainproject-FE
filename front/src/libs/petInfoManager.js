// 강아지 정보 등록
const registerDog = async (
  dogName,
  breed,
  breedCategory,
  dogAge,
  sex,
  weight,
) => {
  const fetch_url = `${process.env.NEXT_PUBLIC_API_URL}/dogs`;
  try {
    const response = await fetch(fetch_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        dogName,
        breed,
        breedCategory,
        dogAge,
        sex,
        weight,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("강아지 정보 등록 실패:", errorData);
      throw new Error(errorData.errorMessage || "강아지 정보 등록 실패");
    }

    const data = await response.json();
    const accessToken = response.headers.get("accessToken");
    localStorage.setItem("accessToken", accessToken);

    return data;
  } catch (error) {
    console.error("강아지 정보 등록 중 오류:", error);
    throw error;
  }
};

// 강아지 정보 수정
const updateDog = async (
  dogName,
  breed,
  breedCategory,
  dogAge,
  sex,
  weight,
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accessToken: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        dogName,
        breed,
        breedCategory,
        dogAge,
        sex,
        weight,
      }),
    });

    if (!response.ok) {
      throw new Error("강아지 정보 수정 실패");
    }

    const data = await response.json();
    const accessToken = response.headers.get("accessToken");
    localStorage.setItem("accessToken", accessToken);

    return data;
  } catch (error) {
    console.error("강아지 정보 수정 중 오류:", error);
    throw error;
  }
};

// 강아지 사진 등록
const uploadDogPhoto = async (photoFile) => {
  const formData = new FormData();
  formData.append("image", photoFile); // 파일을 FormData에 추가

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dogs/photos`,
      {
        method: "POST",
        headers: {
          accessToken: `${localStorage.getItem("accessToken")}`, // accessToken을 헤더에 포함
        },
        body: formData, // FormData를 body로 전송
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("강아지 사진 등록 실패:", errorData);
      throw new Error(errorData.errorMessage || "강아지 사진 등록 실패");
    }

    // 필요시 응답에서 새로 발급된 토큰을 받아서 localStorage에 저장
    const newAccessToken = response.headers.get("accessToken");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("강아지 사진 등록 중 오류:", error);
    throw new Error(error.message || "Network error");
  }
};

// 강아지 정보 조회
const getDogInfo = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs/me`, {
      method: "GET",
      headers: {
        accessToken: `${localStorage.getItem("accessToken")}`, // accessToken을 헤더에 추가
      },
    });

    if (!response.ok) {
      throw new Error("강아지 정보 조회 실패");
    }

    const data = await response.json();
    const accessToken = response.headers.get("accessToken");
    localStorage.setItem("accessToken", accessToken);
    return data;
  } catch (error) {
    console.error("강아지 정보 조회 중 오류:", error);
    throw error;
  }
};

// 강아지 사진 조회
const getDogPhoto = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dogs/photos`,
      {
        method: "GET",
        headers: {
          accessToken: `${localStorage.getItem("accessToken")}`, // accessToken을 헤더에 추가
        },
      },
    );

    if (!response.ok) {
      console.error("강아지 사진 조회 실패", response.statusText);
      throw new Error("강아지 사진 조회 실패");
    }

    // Blob으로 응답 데이터 가져오기
    const blob = await response.blob();

    // Blob을 URL로 변환
    const imageUrl = URL.createObjectURL(blob);

    // 필요시 응답에서 새로 발급된 토큰을 받아서 localStorage에 저장
    const accessToken = response.headers.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    return imageUrl;
  } catch (url) {
    console.error("강아지 사진 조회 중 오류:", error);
    throw error;
  }
};

export { registerDog, updateDog, uploadDogPhoto, getDogInfo, getDogPhoto };
