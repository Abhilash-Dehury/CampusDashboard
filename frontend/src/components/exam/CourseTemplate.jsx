import { Link } from "react-router-dom";

export default function CourseTemplate({ dataObj }) {
  return (
    <div className="card bg-base-100 w-full p-3 shadow-xl hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer transition-all rounded-lg">
      <div className="card-body">
        <h2 className="card-title flex justify-between items-center">
          <span className="text-pink-500 uppercase text-sm font-bold">{dataObj.company}</span>
          <span className="badge badge-secondary text-white text-xs">NEW</span>
        </h2>
        <p className="font-semibold text-gray-800 capitalize">{dataObj.title}</p>
        <p className="text-gray-400 text-xs capitalize">{dataObj.description}</p>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>📝 {dataObj.numberOfQuestions || "?"} Questions</span>
        </div>
        <div className="card-actions justify-end mt-2">
          <Link
            to={`/exampage/${dataObj._id}`}
            className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white px-5 rounded-2xl"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
