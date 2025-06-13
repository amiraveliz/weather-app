"use client";

import WeatherApi from "@/api/WeatherApi";
import { useState } from "react";
import { Loader } from "lucide-react";
import Information from "@/components/Information/Information";

export default function Home() {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [weather, setWeather] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError("");
        setWeather(null);

        const response = await WeatherApi.getWeatherByCity(city);

        if (response.error) {
            setError(response.error);
        } else {
            setWeather(response.data);
        }

        setIsLoading(false);
    };

    return (
        <div className="w-full pt-8">
            <h1 className="text-center text-3xl md:text-5xl px-6 text-black/90">
                Weather App
            </h1>

            <div className="max-w-5xl mx-auto w-full px-5 md:px-8">
                <form
                    type="submit"
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row items-center gap-3 md:gap-2 py-8"
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

                {weather && !isLoading && <Information weather={weather} />}
                {error && !isLoading && (
                    <h1>
                        There was an error getting weather information, please
                        try again...
                    </h1>
                )}
            </div>
        </div>
    );
}
