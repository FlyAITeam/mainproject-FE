const API_BASE_URL = 'http://localhost:8000';

// 강아지 정보 등록
const registerDog = async (dogName, breed, breedCategory, dogAge, sex, weight) => {
    const fetch_url = `${process.env.NEXT_PUBLIC_API_URL}/dogs`;
    try {
        const response = await fetch(fetch_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': `${localStorage.getItem('accessToken')}`,
            },
        body: JSON.stringify({ dogName, breed, breedCategory, dogAge, sex, weight })
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
        'accessToken': `${localStorage.getItem('accessToken')}`,
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
  console.log('photoFile', photoFile);
  const formData = new FormData();
  formData.append('image', photoFile);
  try {
    const response = await fetch(`${API_BASE_URL}/dogs/photos`, {
      method: 'POST',
      headers: {
        'accessToken': `${localStorage.getItem('accessToken')}`,
      },
      body: formData
    });
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errorMessage || 'Server error');
    } else {
      throw new Error('Network error');
    }
  }
};

// 강아지 정보 조회
const getDogInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dogs/me`, {
      method: 'GET',
      headers: {
        'accessToken': `${localStorage.getItem('accessToken')}`,
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

