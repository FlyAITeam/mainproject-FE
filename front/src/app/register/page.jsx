"use client";

import { Screen, Button } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, createRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Step1, Step2, Step3 } from "./components";
import { checkDuplicateUserId, registerUser } from "@/libs/authManager";


export default function Page() {
  const router = useRouter();

  const topDivClasses = "w-screen h-4/5 flex overflow-x-hidden";
  const bottomDivClasses =
    "w-full h-1/5 flex flex-col justify-center items-center space-y-4 p-4";

  const [userProfile, setUserProfile] = useState({
    loginId: "",
    password: "",
    name: "",
  });

  const [step, setStep] = useState(1);
  const [isIdAvailable, setIsIdAvailable] = useState("none");

  const sectionRefs = useRef([createRef(), createRef(), createRef()]);

  const { scrollXProgress } = useScroll();
  const scrollX = useTransform(scrollXProgress, [0, 0.5, 1], [0, 50, 100]);

  useEffect(() => {
    const targetSection = sectionRefs.current[step - 1].current;
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [step]);

  useEffect(() => {
    if (userProfile.loginId) {
      const checkId = async () => {
        const result = await checkFunctions.loginId(userProfile.loginId);
        setIsIdAvailable(result);
      };
      checkId();
    } else {
      setIsIdAvailable("none");
    }
  }, [userProfile.loginId]);

  const checkFunctions = {
    loginId: async (value) => {
      const id = value.toLowerCase();
      const existingIds = ["user1", "user2", "user3"];
      if (id.length > 1) {
        // id check - begin
        const id_valid = await checkDuplicateUserId(id);
        return id_valid ? "duplicated" : "checked";
        // id check - end
      }
      return "none";
    },
    password: (value) => {
      if (value.length > 1) {
        return value.length >= 4 ? "checked" : "notEnough";
      }
      return "none";
    },
    name: (value) => {
      return value.length > 0 ? "checked" : "none";
    },
  };

  const handleNextStep = () => {
    if (step === 3) {
      handleProfileSubmit(userProfile);
      router.replace("/dogs");
    } else {
      setStep(step + 1);
    }
  };

  const handleProfileSubmit = async (userProfile) => {
    console.log("Uploading profile ... ", userProfile);
    try {
      const response = await registerUser(
        userProfile.loginId,
        userProfile.password,
        userProfile.name
      );
      console.log("회원가입 성공:", response);
    } catch (error) {
      console.error("회원가입 중 오류:", error);
    }
  };

  const isStepDisabled = {
    1: isIdAvailable !== "checked",
    2: checkFunctions.password(userProfile.password) !== "checked",
    3: checkFunctions.name(userProfile.name) !== "checked",
  }[step];

  const headerConfig = {
    title: "가입하기",
    left: {
      icon: "left",
      onClick: () => (step === 1 ? router.replace("/") : setStep(step - 1)),
    },
  };

  return (
    <Screen isFixed header={headerConfig}>
      <div className={topDivClasses} style={{ x: scrollX }}>
        <motion.div ref={sectionRefs.current[0]}>
          <Step1
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            isIdAvailable={isIdAvailable}
          />
        </motion.div>
        <motion.div ref={sectionRefs.current[1]}>
          <Step2
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            checkPassword={checkFunctions.password}
          />
        </motion.div>
        <motion.div ref={sectionRefs.current[2]}>
          <Step3
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            checkName={checkFunctions.name}
          />
        </motion.div>
      </div>
      <div className={bottomDivClasses}>
        <Button
          preset="default"
          className="w-full"
          disabled={isStepDisabled}
          onClick={handleNextStep}
        >
          {
            {
              1: "다음으로",
              2: "다음으로",
              3: "가입 완료!",
            }[step]
          }
        </Button>
      </div>
    </Screen>
  );
}
