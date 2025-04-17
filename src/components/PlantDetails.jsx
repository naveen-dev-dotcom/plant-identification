import { useEffect, useState } from "react";
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/24/solid';


const PlantDetails = ({ base64Image }) => {
  const [plantInfo, setPlantInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthInfo, setHealthInfo] = useState(null);

  const identifyPlant = async () => {
    setLoading(true);
    setPlantInfo(null);
    try {
      const response = await fetch("https://plant.id/api/v3/identification", {
        method: "POST",
        headers: {
          // "Api-Key": "Gav87Vg8AlYSNur4P7DDWhh6F67oe94wxr69yc1fEadPjQOcuc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: [base64Image],
          latitude: 13.0827,
          longitude: 80.2707,
          similar_images: true,
        }),
      });

      const data = await response.json();

      // Store access token if present
      if (data.access_token) {
        localStorage.setItem("plant_id_access_token", data.access_token);
      }

      const suggestion = data.result?.classification?.suggestions?.[0];

      if (suggestion) {
        setPlantInfo({
          name: suggestion.name,
          similarImages: suggestion.similar_images || [],
        });
      } else {
        setPlantInfo(null);
      }
    } catch (error) {
      console.error("Plant identification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkHealth = async () => {
    if (!base64Image) return;

    setHealthLoading(true);
    try {
      const response = await fetch("https://plant.id/api/v3/health_assessment", {
        method: "POST",
        headers: {
          // "Api-Key": "Gav87Vg8AlYSNur4P7DDWhh6F67oe94wxr69yc1fEadPjQOcuc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: [base64Image],
          latitude: 13.0827,
          longitude: 80.2707,
        }),
      });

      const data = await response.json();

      // Store access token if present
      if (data.access_token) {
        localStorage.setItem("plant_id_access_token", data.access_token);
      }

      const result = data.result;

      if (result?.is_healthy?.probability !== undefined) {
        setHealthInfo({
          isHealthy: result.is_healthy.binary,
          probability: (result.is_healthy.probability * 100).toFixed(1),
          diseases: result.disease?.suggestions || [],
        });
      } else {
        setHealthInfo(null);
      }
    } catch (error) {
      console.error("Health check failed:", error);
      setHealthInfo(null);
    } finally {
      setHealthLoading(false);
    }
  };

  useEffect(() => {
    if (base64Image?.startsWith("data:image")) {
      identifyPlant();
      setHealthInfo(null);
    }
  }, [base64Image]);

  const wikiLink = plantInfo?.name
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(plantInfo.name)}`
    : "";

  return (
    <div className="mb-6 text-center max-w-4xl mx-auto">
    {loading && (
      <p className="text-lg font-medium text-gray-300">Identifying plant...</p>
    )}
  
    {!loading && base64Image && !plantInfo && (
      <p className="text-red-500">Could not identify the plant.</p>
    )}
  
    {!loading && plantInfo && (
      <>
        <h2 className="text-3xl font-bold text-green-300">{plantInfo.name}</h2>
  
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plantInfo.similarImages.length > 0 ? (
            plantInfo.similarImages.map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={image.url}
                  alt={`Similar Plant ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-lg border-2 border-green-600 shadow-lg"
                />
                <div className="mt-2 text-sm text-gray-300">
                  Similarity: {(image.similarity * 100).toFixed(1)}%
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No similar images found.</p>
          )}
        </div>
  
        <button
  onClick={checkHealth}
  disabled={healthLoading}
  className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg mt-6 transition duration-300 transform hover:scale-105 disabled:bg-gray-500 flex items-center justify-center space-x-2"
>
  {healthLoading ? (
    <>
      <ArrowPathIcon className="h-5 w-5 animate-spin text-white" />
      <span>Checking Health...</span>
    </>
  ) : (
    <>
      <CheckIcon className="h-5 w-5 text-white" />
      <span>Check Plant Health</span>
    </>
  )}
</button>

  
        {/* Health Result */}
        {healthInfo && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 text-left">
            <p className="text-lg font-semibold text-gray-300">
              Health Status:{" "}
              <span className={healthInfo.isHealthy ? "text-green-400" : "text-red-400"}>
                {healthInfo.isHealthy ? "Healthy 🌿" : "Unhealthy 🌱"}
              </span>
            </p>
            <p className="text-lg text-gray-300">
              Confidence: <strong>{healthInfo.probability}%</strong>
            </p>
  
            {healthInfo.diseases.length > 0 ? (
              <div className="mt-4">
                <p className="font-semibold text-gray-300">Possible Issues:</p>
                <ul className="list-disc ml-6 mt-2 space-y-4">
                  {healthInfo.diseases.map((disease, index) => (
                    <li key={index} className="text-gray-300">
                      <p className="font-bold">{disease.name}</p>
                      {disease.probability && (
                        <p className="text-sm text-gray-400">
                          Probability: {(disease.probability * 100).toFixed(1)}%
                        </p>
                      )}
                      {disease.similar_images?.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                          {disease.similar_images.map((img, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={img.url_small || img.url}
                              alt={`Disease example ${imgIndex + 1}`}
                              className="rounded-lg border border-gray-600 shadow"
                            />
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-2 text-gray-400">No visible diseases detected.</p>
            )}
          </div>
        )}
  
        {wikiLink && (
          <a
            href={wikiLink}
            className="block mt-6 text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more on Wikipedia
          </a>
        )}
      </>
    )}
  </div>
  
  );
};

export default PlantDetails;
