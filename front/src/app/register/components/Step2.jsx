import { Input, Icon } from "@/components";
import { useState } from "react";

export const Step2 = ({ userProfile, setUserProfile, checkPassword }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="min-w-[100vw] h-full flex flex-col justify-center items-center p-4">
      <Input
        type={isPasswordShown ? "text" : "password"}
        label="비밀번호를 입력해주세요"
        placeholder="비밀번호"
        required
        value={userProfile.password}
        onChange={(e) =>
          setUserProfile({ ...userProfile, password: e.target.value })
        }
        actionComponent={
          <Icon
            className="text-grayText"
            onClick={() => setIsPasswordShown(!isPasswordShown)}
            icon={isPasswordShown ? "eye" : "eyeOff"}
            size={18}
          />
        }
        guideComponent={
          checkPassword(userProfile.password) === "checked" ? (
            <>
              <Icon icon="check" className="text-green" />
              <span className="text-green">안전한 비밀번호입니다.</span>
            </>
          ) : checkPassword(userProfile.password) === "notEnough" ? (
            <>
              <Icon icon="close" className="text-red" />
              <span className="text-red">4자 이상 입력해주세요.</span>
            </>
          ) : null
        }
      />
    </div>
  );
};
