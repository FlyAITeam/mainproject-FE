import { Input, Select } from "@/components";

export const Step4 = ({ sectionRef, dogProfile, setDogProfile }) => {
  /** 최대 3자리 숫자만 입력되도록 하는 함수 */
  const threeNumberFunc = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^[0-9]*$/.test(value)) {
      setDogProfile({ ...dogProfile, dogAge: value });
    }
  };

  /** 소수점 한 자리까지만 입력되도록 하는 함수 */
  const weightFunc = (e) => {
    const value = e.target.value;
    const validWeight = /^\d*\.?\d{0,1}$/;
    if (validWeight.test(value)) {
      setDogProfile({ ...dogProfile, weight: value });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="min-w-[100vw] h-full flex flex-col justify-center items-center p-4"
    >
      <div className="w-full h-fit flex flex-col py-10 justify-start items-start text-2xl font-bold text-deepgreen">
        <span> 반려견의 성별과 나이, </span>
        <span> 몸무게를 알려주세요!</span>
      </div>
      <div className="w-full h-full flex flex-col space-y-4 justify-start items-center pt-10">
        <Select
          required
          label="성별"
          value={dogProfile.sex}
          onChange={(e) =>
            setDogProfile({ ...dogProfile, sex: e.target.value })
          }
          options={[
            { label: "남", value: "male" },
            { label: "여", value: "female" },
            { label: "중성화", value: "neuter" },
          ]}
        />
        <div className="w-full h-fit flex flex-row space-x-4">
          <Input
            required
            type="number"
            label="나이"
            placeholder="예: 10"
            maxLength="3"
            value={dogProfile.dogAge}
            onChange={threeNumberFunc}
            actionComponent={<span className="text-grayText">살</span>}
          />
          <Input
            required
            type="number"
            step="0.1"
            max="500"
            label="몸무게"
            placeholder="예: 5.5"
            value={dogProfile.weight}
            onChange={weightFunc}
            actionComponent={<span className="text-grayText">kg</span>}
          />
        </div>
      </div>
    </div>
  );
};
