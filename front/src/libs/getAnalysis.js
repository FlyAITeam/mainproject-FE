// 심박값 데이터 전송
export const getHeartData = async () => {
    console.log("SEFEKFHEKF");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hearts`, {
        method: "GET",
        headers: {
          accessToken: `${localStorage.getItem("accessToken")}`,
        },
      });
  
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.log(response);
      //   throw new Error(errorData.errorMessage || "Failed to fetch heart data.");
      // }
  
      const data = await response.json();
      console.log("Heart data:", data);
  
      // Update the accessToken if a new one is provided
      const newAccessToken = response.headers.get("accessToken");
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }
  
      return data;
    } catch (error) {
      console.error("Error fetching heart data:", error);
      throw error;
    }
};
      
// 운동 목표량 달성 정도 리턴
export const getExerciseData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercise`, {
        method: "GET",
        headers: {
          accessToken: `${localStorage.getItem("accessToken")}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(response);
        throw new Error(errorData.errorMessage || "Failed to fetch exercise data.");
      }
  
      const data = await response.json();
      console.log("Exercise data:", data);
  
      // Update the accessToken if a new one is provided
      const newAccessToken = response.headers.get("accessToken");
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }
  
      return data;
    } catch (error) {
      console.error("Error fetching exercise data:", error);
      throw error;
    }
};
  
// 시퀀스 테이블 1시간 데이터 전송
export const getSequences = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sequences`, {
        method: "GET",
        headers: {
          accessToken: `${localStorage.getItem("accessToken")}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(response);
        throw new Error(errorData.errorMessage || "Failed to fetch sequences.");
      }
  
      const data = await response.json();
      console.log("Sequences data:", data);
  
      // Update the accessToken if a new one is provided
      const newAccessToken = response.headers.get("accessToken");
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }
  
      return data;
    } catch (error) {
      console.error("Error fetching sequences data:", error);
      throw error;
    }
};
