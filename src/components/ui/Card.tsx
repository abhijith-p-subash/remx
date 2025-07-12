const Card = ({ title }: { title: string }) => {
  return (
    <div className="cursor-pointer px-3 py-2  bg-gray-800 border border-gray-600 rounded-md shadow-sm hover:border-green-400 transition-colors">
      <h5 className="text-sm font-semibold  text-gray-100 hover:text-green-500 transition">
        {title}
      </h5>
    </div>
  );
};

export default Card;
