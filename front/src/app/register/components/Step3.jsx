import { Input, Icon } from "@/components";

export const Step3 = ({ userProfile, setUserProfile, checkName }) => {
  return (
    <div className="min-w-[100vw] h-full flex flex-col justify-center items-center p-4">
      <Input
        type="text"
        label="이름을 입력해주세요"
        placeholder="이름"
        required
        value={userProfile.name}
        onChange={(e) =>
          setUserProfile({ ...userProfile, name: e.target.value })
        }
        guideComponent={
          checkName(userProfile.name) === "checked" && (
            <>
              <span className="text-grayText">
                반갑습니다 {userProfile.name}님!
              </span>
            </>
          )
        }
      />
    </div>
  );
};
