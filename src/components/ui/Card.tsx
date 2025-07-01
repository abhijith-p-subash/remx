

const Card = (props: { title: string }) => {
  return (
    <div className="cursor-pointer mb-2 mx-1 p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className=" text-md font-bold tracking-tight text-gray-900 dark:text-white">
        {props.title}
      </h5>
    </div>
  );
};

export default Card;
