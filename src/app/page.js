"use client";

import WeatherApi from "@/api/WeatherApi";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function Home() {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [weather, setWeather] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError("");

        const response = await WeatherApi.getWeatherByCity(city);

        if (response.error) {
            setError(error);
        } else {
            setWeather(response);
        }

        setIsLoading(false);

        console.log(weather);
    };

    return (
        <div className="w-full pt-8">
            <h1 className="text-center text-3xl md:text-5xl px-6 text-black/90">
                Weather App
            </h1>

            <form
                type="submit"
                onSubmit={handleSubmit}
                className="max-w-5xl flex flex-col md:flex-row items-center gap-3 md:gap-2 mx-auto w-full p-5 md:p-8"
            >
                <div className="flex flex-col w-full md:w-[70%]">
                    <input
                        type="text"
                        name="city"
                        className="border border-black/30 p-2 rounded-md text-xs md:text-[medium]"
                        placeholder="Enter a city or country..."
                        required
                        onChange={(event) => setCity(event.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div className="flex flex-col w-full md:w-[30%]">
                    <button className="bg-primary-100 hover:bg-primary-100/90 border-primary-100 border-1 disabled:bg-gray-400/30 p-2 rounded-md text-white cursor-pointer text-xs md:text-[medium]">
                        {isLoading ? (
                            <Loader
                                className="animate-spin mx-auto my-0"
                                size={20}
                            />
                        ) : (
                            "SEARCH"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
