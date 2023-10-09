export const SingleReview = ({
	rating,
	name,
    content,
    headline,
    createdAt
}: {
	rating: number,
	name: string,
    content: string,
    headline: string,
    createdAt: string
}) => {

return (
    <article>
        <div className="flex items-center mb-4 space-x-4">
            {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
            <div className="space-y-1 font-medium dark:text-white">
                <p className="capitalize"> {name} </p>
                <p className="capitalize"> {headline} </p>
            </div>
        </div>
        <div className="flex items-center mb-1">

                {[1, 2, 3, 4, 5].map((value) => (
                <p
                    key={value}
                    className={`ml-2 text-2xl ${rating >= value ? 'text-yellow-400' : 'text-gray-400'} mr-1`}
                >
                    ★
                </p>
                    
                ))}
        </div>
        <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed: {createdAt.slice(0, 10)}</p></footer>
        <p className="mb-2 text-gray-500 dark:text-gray-400"> {content} </p>
        {/* <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a> */}
        {/* <aside>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
            <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                <a href="#" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Helpful</a>
                <a href="#" className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Report abuse</a>
            </div>
        </aside> */}
    </article>
)}