"use client";
import { useState, React } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const questions = {
  "Getting to Know Them Better": [
    "What is your favorite hobby?",
    "What is your dream job?",
    "What is your favorite childhood memory?",
    "What's on your bucket list?",
    "Who do you admire the most and why",
    "What's your favorite place to be when you're feeling stressed?",
    "If you could have any superpower, what would it be and why?",
    "What's your favorite book or movie, and why? ",
  ],
  "Exploring Their Values and Aspirations": [
    "What motivates you in life?",
    "What is one value you hold above all else?",
    "What is your biggest aspiration?",
    "What do you value most in a friendship?",
    "What is your biggest fear?",
    "What are your goals for the next five years?",
    "What is your biggest regret?",
    "What's the most important lesson you've learned in life?",
    "What makes you feel truly happy?",
  ],
  "Delving into Their Personal Experiences": [
    "What is the most challenging experience you've faced?",
    "What is a moment in your life that changed you?",
    "What is your proudest achievement?",
    "What's the biggest challenge you've faced, and how did you overcome it? ",
    "What's the most considerate thing anyone has ever done for you? ",
    "What's something you're proud of accomplishing? ",
    "What's your biggest regret, and what have you learned from it? ",
    "Who makes you feel the most confident and why? ",
  ],
  "Open-Ended Questions": [
    "If you could live anywhere in the world, where would it be?",
    "What would you do if you won the lottery?",
    "What is one thing you wish people knew about you?",
    "If you could only do one thing with me before we die, what would it be? ",
    "What's one thing I don't know about you? ",
    "What's your favorite trait in me? ",
    "What's your biggest insecurity, and how have you overcome it? ",
    "What advice would you give to your younger self? ",
    "what part of your self the you dislike the most? ",
  ],
  "Questions About the Friendship": [
    "What do you value most in our friendship?",
    "What is your favorite memory of us?",
    "How can I be a better friend to you?",
    "What about our friendship is most important to you? ",
    "What do you like most about our friendship? ",
    "Is there anything I can do to be a better friend to you? ",
    "Is there anything I can do to be a better friend to you? ",
    "What's the most memorable moment we've shared? ",
    "If you could change one thing about our friendship, what would it be? ",
  ],
};

const front = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [flipDirection, setFlipDirection] = useState(""); // Tracks the flip direction
  const [shownQuestions, setShownQuestions] = useState([]); // Tracks shown questions

  const handleCategoryClick = (category) => {
    setFlipDirection("flip-right");
    setTimeout(() => {
      setSelectedCategory(category);
      const randomIndex = Math.floor(Math.random() * questions[category].length);
      const question = questions[category][randomIndex];
      setShownQuestions([question]); // Initialize shown questions for the category
      setSelectedQuestion(question);
      setFlipDirection(""); // Reset the flip direction after the animation
    }, 300); // Matches the animation duration
  };

  const handleNextQuestion = () => {
    setFlipDirection("flip-right"); // Set the flip direction to right
    setTimeout(() => {
      const remainingQuestions = questions[selectedCategory].filter(
        (q) => !shownQuestions.includes(q)
      );

      if (remainingQuestions.length === 0) {
        // Reset shown questions if all have been shown
        setShownQuestions([]);
      }

      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const nextQuestion =
        remainingQuestions.length > 0
          ? remainingQuestions[randomIndex]
          : questions[selectedCategory][
              Math.floor(Math.random() * questions[selectedCategory].length)
            ];

      setShownQuestions((prev) => [...prev, nextQuestion]);
      setSelectedQuestion(nextQuestion);
      setFlipDirection(""); // Reset the flip direction after the animation
    }, 300); // Matches the animation duration
  };

  const handleBack = () => {
    setFlipDirection("flip-left");
    setTimeout(() => {
      setSelectedCategory("");
      setSelectedQuestion("");
      setShownQuestions([]); // Reset shown questions when going back
      setFlipDirection(""); // Reset the flip direction after the animation
    }, 300); // Matches the animation duration
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className={`relative w-[600px] h-[400px] ${flipDirection}`}>
        {!selectedCategory ? (
          <Card className="absolute w-full h-full bg-white shadow-md rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-center">Q&A sa mga hubog</CardTitle>
              <CardDescription className="text-center">
                Select a category to get a random question
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap justify-center gap-2">
              {Object.keys(questions).map((category) => (
                <button
                  key={category}
                  className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </CardFooter>
          </Card>
        ) : (
          <Card className="absolute w-full h-full bg-white shadow-md rounded-lg p-4">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <p className="text-center text-lg">{selectedQuestion}</p>
            </CardContent>
            <CardFooter className="flex justify-between w-full">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-[100px]"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-[100px]"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </CardFooter>
          </Card>
        )}
      </div>
      <style jsx>{`
        .flip-right {
          animation: flip-right 0.3s ease-in-out;
        }
        .flip-left {
          animation: flip-left 0.3s ease-in-out;
        }
        @keyframes flip-right {
          0% {
            transform: rotateY(0);
          }
          100% {
            transform: rotateY(180deg);
          }
        }
        @keyframes flip-left {
          0% {
            transform: rotateY(0);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default front;