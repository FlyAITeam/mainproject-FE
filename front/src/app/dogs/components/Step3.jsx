import { Input, Select } from "@/components";

export const Step3 = ({ sectionRef, dogProfile, setDogProfile }) => {
  return (
    <div
      ref={sectionRef}
      className="min-w-[100vw] h-full flex flex-col justify-center items-center p-4"
    >
      <div className="w-full h-fit flex py-10 justify-start items-center text-2xl font-bold text-deepgreen">
        반려견 견종과 분류를 알려주세요!
      </div>
      <div className="w-full h-full flex flex-col space-y-0 justify-start pt-10 items-center">
        <Input
          required
          type="text"
          label="견종"
          placeholder="견종을 입력해주세요"
          value={dogProfile.breed}
          onChange={(e) =>
            setDogProfile({ ...dogProfile, breed: e.target.value })
          }
        />
        <Select
          required
          label="분류"
          value={dogProfile.breedCategory}
          onChange={(e) =>
            setDogProfile({ ...dogProfile, breedCategory: e.target.value })
          }
          options={[
            { label: "소형견", value: 1 },
            { label: "중형견", value: 2 },
            { label: "대형견", value: 3 },
          ]}
        />
      </div>
    </div>
  );
};
