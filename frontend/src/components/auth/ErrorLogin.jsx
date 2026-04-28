import { Link } from "react-router-dom";

export default function ErrorLogin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="text-center p-10 bg-white rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-red-500 mb-4">❌ Invalid Credentials</h2>
        <p className="text-gray-500 mb-6">The username or password you entered is incorrect.</p>
        <Link to="/login" className="btn bg-pink-500 hover:bg-pink-600 text-white px-8">
          Try Again
        </Link>
      </div>
    </div>
  );
}
