"use client";

import classNames from "classnames";
import { Screen, AppTitle, Button, Loading } from "@/components";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const topDivClasses =
    "w-full h-3/4 flex flex-col justify-center items-center space-y-4 p-4";
  const bottomDivClasses =
    "w-full h-1/4 flex flex-col justify-center items-center space-y-4 p-4";

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <Screen>
      <div className={topDivClasses}>
        <AppTitle />
      </div>
      <AnimatePresence>
        {isLoaded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={bottomDivClasses}
          >
            <Button
              preset="default"
              className="w-full"
              onClick={() => router.push("/register")}
            >
              시작하기
            </Button>
            <Button
              preset="reversed"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              로그인 하기
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={bottomDivClasses}
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
