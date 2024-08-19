import { Input, Icon } from "@/components";

export const Step1 = ({ userProfile, setUserProfile, checkAvailableId }) => {
  // 영문, 숫자만 입력가능한 input 이벤트 함수
  const engAndNumberFunc = (e) => {
    var regexp = /[^a-z0-9]/gi;
    e.target.value = e.target.value.replace(regexp, "");
    setUserProfile({ ...userProfile, loginId: e.target.value });
  };

  return (
    <div className="min-w-[100vw] h-full flex flex-col justify-center items-center p-4">
      <Input
        type="text"
        label="아이디를 입력해주세요"
        placeholder="아이디"
        required
        value={userProfile.loginId}
        onChange={engAndNumberFunc}
        guideComponent={
          checkAvailableId(userProfile.loginId) === "checked" ? (
            <>
              <Icon icon="check" className="text-green" />
              <span className="text-green">사용 가능한 아이디입니다.</span>
            </>
          ) : checkAvailableId(userProfile.loginId) === "duplicated" ? (
            <>
              <Icon icon="close" className="text-red" />
              <span className="text-red">이미 사용 중인 아이디입니다.</span>
            </>
          ) : (
            <span className="text-grayText">
              영문, 숫자로 이루어진 4자 이상의 아이디를 입력해주세요.
            </span>
          )
        }
      />
    </div>
  );
};
