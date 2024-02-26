"use client"

import { OrganizationList, OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
import React, { useState, useEffect } from 'react';
import OpenAI from "openai";
import { Card as CardTremor, Button as ButtonTremor, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { Card, CardContent } from "../../@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../@/components/ui/carousel"
import { RingLoader } from "react-spinners";

export default function TeamPage() {

    const [input, setInput] = useState("");
    const [prompt, setPrompt] = useState("");
    const [ideas, setIdeas] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generate, setGenerate] = useState("Generate");

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        setGenerate("Click Again to Confirm");

        if (generate === "Click Again to Confirm")
            setIsLoading(true);
        const openai = new OpenAI({
            apiKey: "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",
            dangerouslyAllowBrowser: true,
        });

        setPrompt(
            `Generate  3 project ideas that based on the keywords: ${input}.  
      Here is a sample keyword list: "SAAS, B2B, Sales"
      Here is a sample explanation from that input: "Here are  3 project ideas based on the keywords you entered:  1. An AI sales agent  2. An AI lead identifier  3. An AI Inbound meeting booker"
      Provide your response as a JSON object with the following schema:
      { "ideas": ["", "", ...]}`
        );

        var completion = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            temperature: 0.2,
            max_tokens: 1000,
        });
        const json = JSON.parse(completion.choices[0].text);

        setIdeas(json["ideas"]);
        setIsLoading(false);
    };

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                <div className="mt-5 mb-10 ml-5">
                    <CardTremor>
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            className="space-x-2"
                        >
                            <OrganizationSwitcher />
                        </Flex>
                    </CardTremor>
                </div>
                <div>
                    <CardTremor><div className="ml-5">Click+Drag to scroll possible teammates</div>
                        <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </CardTremor>
                </div>
                <CardTremor>
                    <div >
                        <label
                            htmlFor="comment"
                            className="block text-xl font-medium leading-6 font-bold text-gray-900"
                            style={{ fontWeight: "bold" }}
                        >
                            Keywords about the type of idea you're looking for
                        </label>
                        <div className="mt-2">
                            <textarea
                                rows={3}
                                name="comment"
                                id="comment"
                                placeholder="B2B, SAAS, Sales, AI"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg leading-6"
                                defaultValue={""}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className=" mt-5 flex mx-auto rounded-md px-3.5 py-2.5 bg-black text-lg font-semibold text-white shadow-sm hover:bg-gray-800 transition ease-in-out duration-150"
                        onClick={handleClick}
                    >
                        {generate}
                    </button>

                    {isLoading ? (
                        <div className="sweet-loading" style={{ display: 'flex', justifyContent: 'center' }}>
                            <RingLoader size={60} color={"#000000"} loading={isLoading} />
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="mt-10">
                        {ideas.length > 0 && (
                            <div>
                                <h1 className="text-center font-bold text-xl">Ideas List</h1>
                                <ul className="divide-y h-screen">
                                    {ideas.map((cl: string) => (
                                        <li key={ideas.indexOf(cl)} className="m-4 p-4 shadow-md">
                                            <h1 className="text-center">{cl}</h1>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </CardTremor>
            </Grid>
        </main>
    );
}