"use client";

import React, { useState, useMemo } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

const Page = () => {
    console.log("Maybe try to add up the current day and the current month? Nah, that number would be too small...");

    // Get today's date
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const correctNumber = day * month;

    // Generate two random numbers with the same digit count
    const generateFakeNumber = () => {
        const min = Math.pow(10, correctNumber.toString().length - 1);
        const max = Math.pow(10, correctNumber.toString().length) - 1;
        let fakeNum;
        do {
            fakeNum = Math.floor(Math.random() * (max - min) + min);
        } while (fakeNum === correctNumber);
        return fakeNum;
    };

    // Create shuffled options
    const options = useMemo(() => {
        const nums = [correctNumber, generateFakeNumber(), generateFakeNumber()];
        return nums.sort(() => Math.random() - 0.5);
    }, [correctNumber]);

    const [selected, setSelected] = useState<number | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const checkAnswer = () => {
        if (selected === correctNumber) {
            setResult("🎉 Correct! You're worthy of the hidden reward.");
        } else {
            setResult("❌ Nope! Maybe tomorrow?");
        }
    };

    return (
        <div className="flex flex-col gap-16 p-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold">The hidden about page...</h1>
                <p className="text-xl">
                    Congratulations, you found the hidden about page. I&apos;m not sure why you&apos;re here, but I&apos;m glad you are.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">The challenge</h2>
                <p className="text-xl">
                    If you made it here you&apos;re either a true 10x developer or a complete idiot, either way, I&apos;m impressed.
                    A reward is in order, but first, you must solve a challenge.
                </p>
                <p className="text-xl">
                    The challenge is simple, select the right number.
                    Oh, and solve it today because this page might look different tomorrow. Almost like the **current date** is part of the challenge...
                </p>
            </div>
            <RadioGroup.Root
                className="flex flex-row justify-center gap-24 items-center"
                value={selected?.toString() || ""}
                onValueChange={(val) => setSelected(Number(val))}
            >
                {options.map((num) => (
                    <label key={num} className="flex items-center gap-2 cursor-pointer">
                        <RadioGroup.Item
                            className="w-6 h-6 rounded-full border-2 border-brand-black-900 dark:border-brand-white-100 data-[state=checked]:bg-brand-black-900 dark:data-[state=checked]:bg-brand-white-100"
                            value={num.toString()}
                        />
                        <span className="text-lg">{num}</span>
                    </label>
                ))}
            </RadioGroup.Root>

            <button
                className="mt-4 self-center w-fit p-4 bg-brand-black-900 dark:bg-brand-white-100 text-brand-white-100 dark:text-brand-black-900 py-2 rounded-md transition disabled:opacity-50"
                onClick={checkAnswer}
                disabled={selected === null}
            >
                Submit
            </button>

            {result && <p className="mt-4 self-center text-lg">{result}</p>}
        </div>
    );
};

export default Page;