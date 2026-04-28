import camp from "../assets/pic.jpeg";

export default function Banner() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-5 py-20 flex flex-col md:flex-row my-10 gap-10">
      <div className="w-full order-2 md:order-1 flex flex-col justify-center">
        <h1 className="text-4xl font-bold leading-snug">
          Hello, welcome here to learn something{" "}
          <span className="text-pink-500">new every day !!</span>
        </h1>
        <p className="text-lg text-gray-600 mt-6 leading-relaxed">
          Learning is not just about gaining knowledge — it's about transforming
          your future. Every small step you take today builds the confidence and
          skills you need tomorrow. Stay curious, stay consistent, and never be
          afraid to start from zero.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <a href="#study" className="btn bg-pink-500 hover:bg-pink-600 text-white px-6">
            Start Learning
          </a>
          <a href="#resources" className="btn btn-outline border-pink-400 text-pink-500 hover:bg-pink-50 px-6">
            View Resources
          </a>
        </div>
      </div>

      <div className="order-1 md:order-2 w-full flex justify-center items-center">
        <img
          src={camp}
          alt="Campus"
          className="rounded-2xl w-full max-w-md object-cover shadow-xl"
        />
      </div>
    </div>
  );
}
