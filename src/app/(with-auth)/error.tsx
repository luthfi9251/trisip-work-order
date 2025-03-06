"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import ErrorIllustration from "@/assets/illustration-error.svg";
import Image from "next/image";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // useEffect(() => {
    //     console.error(error);
    // }, [error]);

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
                <Image
                    src={ErrorIllustration}
                    alt="Error Illustration"
                    width={500}
                    height={500}
                    className="w-3/4 max-w-[600px]"
                />
                <h2 className="font-bold text-xl lg:text-2xl text-center">
                    Oops, Something went wrong!
                </h2>
                <p className="text-center">{error.message}</p>
            </div>
        </div>
    );
}
