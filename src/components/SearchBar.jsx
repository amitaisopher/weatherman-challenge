import { IoMdSearch } from 'react-icons/io'


function SearchBar({ inputChangeHandler, submitSearchHandler, placeholderText = '', ref, variant = 'rounded' }) {
    const variants = {
        "square": "rounded-none",
        "rounded": "rounded-full"
    }

    return (
        <form data-testid='search-bar' className={`h-16 bg-black/30 w-full max-w-[450px] ${variants[variant]} backdrop-blur-[32px] mb-8 mt-8`}>
            <div className="h-full relative flex items-center justify-between p-2">
                <input ref={ref} onChange={inputChangeHandler} className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full" type="text" placeholder={placeholderText} />
                <button data-testid='submit-button' onClick={submitSearchHandler} className={`bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 ${variants[variant]} flex justify-center items-center transition`}>
                    <IoMdSearch className="text-2xl text-white" />
                </button>

            </div>
        </form>

    )
}

export default SearchBar