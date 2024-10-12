export default function ReviewsPage() {
  return (
    <section
      id="reviews"
      className="text-start text-black min-h-screen pt-20 mx-auto px-5 md:px-8 max-w-6xl"
    >
      {/* Flex layout to ensure proper alignment between heading and reviews */}
      <div className="flex flex-col lg:flex-row max-w-7xl gap-16 items-start mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-0 lg:mr-16 lg:text-nowrap">
          Early Reviews
        </h1>

        {/* Reviews Section */}
        <div className="flex flex-col gap-8 w-full">
          {/* Individual Review */}
          <div className="bg-slate-500 text-white text-xl p-6 rounded-lg shadow-lg max-w-full lg:max-w-[40rem]">
            <p>
              Testimonials are short quotes from people who love your brand.
              It&apos;s a great way to convince customers to try your services.
            </p>
            <p className="mt-4 text-pink-400">
              -Rosa Maria Aguado, Beal and Harlow
            </p>
          </div>

          {/* Repeat for other reviews */}
          <div className="bg-slate-500 text-white text-xl p-6 rounded-lg shadow-lg max-w-full lg:max-w-[40rem]">
            <p>
              Testimonials are short quotes from people who love your brand.
              It&apos;s a great way to convince customers to try your services.
            </p>
            <p className="mt-4 text-pink-400">-Aaron Loeb, Tully and Drive</p>
          </div>

          <div className="bg-slate-500 text-white text-xl p-6 rounded-lg shadow-lg max-w-full lg:max-w-[40rem]">
            <p>
              Testimonials are short quotes from people who love your brand.
              It&apos;s a great way to convince customers to try your services.
            </p>
            <p className="mt-4 text-pink-400">-Saira Kohli, The Plew</p>
          </div>
        </div>
      </div>
    </section>
  );
}
