import { useState, useEffect } from "react";

export default function HeroHeading() {
  const [currentText, setCurrentText] = useState<string>("");
  const [textIndex, setTextIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const texts: string[] = ["GitHub Repo", "Docker Image", "Web Project", "AI Apps"];
    const typingSpeed = isDeleting ? 50 : 100;
    const nextTextDelay = 1000;

    if (!isDeleting && charIndex === texts[textIndex].length) {
      setTimeout(() => setIsDeleting(true), nextTextDelay);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    const timeout = setTimeout(() => {
      setCurrentText(
        texts[textIndex].substring(0, charIndex + (isDeleting ? -1 : 1))
      );
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <h1 className="text-center text-[40px] fsm:text-[50px] xl:text-[55px] 2xl:text-[60px] leading-[45px] fsm:leading-[55px] xl:leading-[60px] 2xl:leading-[65px] font-bold text-[#fff] font-['SF Pro Display']">
      <span className="flex flex-col items-center min-[750px]:flex-row">
        Deploy Your{" "}
        <span className="ml-4 h-[45px] fsm:h-[55px] min-[760px]:h-max  bg-clip-text text-transparent bg-gradient-to-r from-[#12C2E9] from-10% via-[#C471ED] to-[#F64F59]">
          {currentText}
        </span>
      </span>
      Go live in seconds
    </h1>
  );
}
