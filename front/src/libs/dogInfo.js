const API_BASE_URL = 'http://localhost:8000';

// 강아지 정보 등록
const registerDog = async (dogName, breed, breedCategory, dogAge, sex, weight) => {
  const input_data = JSON.stringify({ dogName, breed, breedCategory, dogAge, sex, weight });
  console.log(input_data);

  try {
    const response = await fetch(`${API_BASE_URL}/dogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZWNvbWlhMTIiLCJleHAiOjE3MjQxMTY1ODB9.mJAcfcwuMKysOq4cXp7s6lPD_Tg1MiSOWvTI0iP3MOg'//`${localStorage.getItem('accessToken')}`,
      },
      body: input_data//JSON.stringify({ dogName, breed, breedCategory, dogAge, sex, weight }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('강아지 정보 등록 실패:', errorData);
      throw new Error(errorData.errorMessage || '강아지 정보 등록 실패');
    }

    const data = await response.json();
    console.log('강아지 정보 등록 성공:', data);
    return data;
  } catch (error) {
    console.error('강아지 정보 등록 중 오류:', error);
    throw error;
  }
};

// 강아지 정보 수정
const updateDog = async (dogName, breed, breedCategory, dogAge, sex, weight) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dogs/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ dogName, breed, breedCategory, dogAge, sex, weight }),
    });

    if (!response.ok) {
      throw new Error('강아지 정보 수정 실패');
    }

    const data = await response.json();
    console.log('강아지 정보 수정 성공:', data);
    return data;
  } catch (error) {
    console.error('강아지 정보 수정 중 오류:', error);
    throw error;
  }
};

// 강아지 사진 등록
const uploadDogPhoto = async (photoFile) => {
  try {
    const formData = new FormData();
    formData.append('photo', photoFile);

    const response = await fetch(`${API_BASE_URL}/dogs/photos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('강아지 사진 등록 실패');
    }

    const data = await response.json();
    console.log('강아지 사진 등록 성공:', data);
    return data;
  } catch (error) {
    console.error('강아지 사진 등록 중 오류:', error);
    throw error;
  }
};

// 강아지 정보 조회
const getDogInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dogs/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('강아지 정보 조회 실패');
    }

    const data = await response.json();
    console.log('강아지 정보 조회 성공:', data);
    return data;
  } catch (error) {
    console.error('강아지 정보 조회 중 오류:', error);
    throw error;
  }
};

export { registerDog, updateDog, uploadDogPhoto, getDogInfo };