import { useState } from "react";
import { askStudee } from "../utils/askStudee";

const StudeeReview = () => {
  const [collegeName, setCollegeName] = useState("");
  const [college, setCollege] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCollegeName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res_college = await askStudee(collegeName);
    setCollege(res_college);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-yellow-800 mb-6 text-center">
        Review Colleges
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl mb-6"
      >
        <input
          type="text"
          placeholder="Enter college name"
          value={collegeName}
          onChange={handleInputChange}
          className="flex-1 px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
        >
          {loading ? "Reviewing...." : "Ask"}
        </button>
      </form>

      {college ? (
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
          <pre className="whitespace-pre-wrap text-gray-800">{college}</pre>
        </div>
      ) : (
        <p className="text-gray-400 text-center">Your review will appear here 🍳</p>
      )}

      <footer className="mt-8 text-center text-gray-500">Built with ❤️ by Harshit</footer>
    </div>
  );
};

export default StudeeReview;
