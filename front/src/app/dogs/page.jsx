"use client";

import { Screen, Button } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, createRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Step1, Step2, Step3, Step4 } from "./components";

export default function Page() {
  const router = useRouter();
  const topDivClasses = "w-screen h-4/5 flex overflow-x-hidden";
  const bottomDivClasses =
    "w-full h-1/5 flex flex-col justify-center items-center space-y-4 p-4";

  const [step, setStep] = useState(1);

  const sectionRefs = useRef([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);

  const { scrollXProgress } = useScroll();
  const scrollX = useTransform(scrollXProgress, [0, 0.5, 1], [0, 50, 100]);

  const [dogProfile, setDogProfile] = useState({
    dogName: "",
    breed: "",
    breedCategory: 1,
    dogAge: "",
    sex: "male",
    weight: "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
    dogName: (value) => (value === "" ? "none" : "checked"),
    breed: (value) => (value === "" ? "none" : "checked"),
    dogAge: (value) => (value === "" ? "none" : "checked"),
    weight: (value) => (value === "" ? "none" : "checked"),
  };

  const handleNextStep = () => {
    if (step === 2) {
      handleImageSubmit();
    }
    navigateNextStep();
  };

  const navigateNextStep = () => {
    if (step === 4) {
      handleDogProfileSubmit(dogProfile);
      router.replace("/main");
    } else {
      setStep(step + 1);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async () => {
    console.log("Uploading image ... ", image);
  };

  const handleDogProfileSubmit = async (dogProfile) => {
    console.log("Uploading dog profile ... ", dogProfile);
  };

  const isStepDisabled = {
    1: false,
    2: checkFunctions.dogName(dogProfile.dogName) !== "checked",
    3: checkFunctions.breed(dogProfile.breed) !== "checked",
    4:
      checkFunctions.dogAge(dogProfile.dogAge) !== "checked" ||
      checkFunctions.weight(dogProfile.weight) !== "checked",
  }[step];

  const headerConfig = {
    title: `반려견 정보 등록 ${step}/4`,
    left: {
      icon: "left",
      onClick: () =>
        setStep((prev) => (prev === 1 ? router.replace("/") : prev - 1)),
    },
  };

  return (
    <Screen isFixed header={headerConfig}>
      <div className={topDivClasses} style={{ x: scrollX }}>
        <motion.div ref={sectionRefs.current[0]}>
          <Step1
            dogProfile={dogProfile}
            setDogProfile={setDogProfile}
            checkDogName={checkFunctions.dogName}
          />
        </motion.div>
        <motion.div ref={sectionRefs.current[1]}>
          <Step2
            dogProfile={dogProfile}
            setDogProfile={setDogProfile}
            checkBreed={checkFunctions.breed}
            image={image}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
          />
        </motion.div>
        <motion.div ref={sectionRefs.current[2]}>
          <Step3 dogProfile={dogProfile} setDogProfile={setDogProfile} />
        </motion.div>
        <motion.div ref={sectionRefs.current[3]}>
          <Step4 dogProfile={dogProfile} setDogProfile={setDogProfile} />
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
              1: "나의 반려견 등록하기",
              2: "다음으로",
              3: "다음으로",
              4: "등록 완료!",
            }[step]
          }
        </Button>
      </div>
    </Screen>
  );
}
