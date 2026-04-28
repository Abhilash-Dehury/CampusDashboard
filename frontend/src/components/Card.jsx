export default function Card({ item }) {
  return (
    <div className="mb-10 mt-10 card bg-base-100 w-full p-2 shadow-xl hover:shadow-2xl hover:scale-105 duration-300 cursor-pointer transition-all">
      <figure className="h-48 w-full overflow-hidden rounded-t-xl">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
          <div className="badge badge-secondary text-white">NEW</div>
        </h2>
        <p className="text-gray-500 text-sm">{item.title}</p>
        <div className="card-actions justify-end">
          <div className="border px-4 py-1 rounded-2xl hover:bg-pink-500 hover:text-white cursor-pointer transition">
            Explore
          </div>
        </div>
      </div>
    </div>
  );
}
