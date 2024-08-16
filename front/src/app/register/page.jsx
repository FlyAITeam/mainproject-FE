"use client";

import { Screen, Button } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, createRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Step1, Step2, Step3 } from "./components";

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

  const checkFunctions = {
    loginId: (value) => {
      const id = value.toLowerCase();
      const existingIds = ["user1", "user2", "user3"];
      if (id.length > 1) {
        return existingIds.includes(id) ? "duplicated" : "checked";
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
  };

  const isStepDisabled = {
    1: checkFunctions.loginId(userProfile.loginId) !== "checked",
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
            checkAvailableId={checkFunctions.loginId}
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
