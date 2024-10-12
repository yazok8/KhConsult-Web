export default function ReviewsPage() {
  return (
    <section
      id="reviews"
      className="md:flex text-start text-black min-h-screen pt-20 mx-auto justify-between"
    >
      {/* Reviews Container */}
      <div className="flex max-w-7xl items-stretch gap-8 px-4 pt-20 mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-nowrap">
          Early Reviews
        </h1>
        <div>
          {/* Individual Review */}
          <div className="bg-slate-500 text-white text-xl p-6 rounded-lg shadow-lg mb-5">
            <p>
              Testimonials are short quotes from people who love your brand.
              It&apos;s a great way to convince customers to try your services.
            </p>
            <p className="mt-4 text-pink-400">
              -Rosa Maria Aguado, Beal and Harlow
            </p>
          </div>

          {/* Repeat for other reviews */}
          <div className="bg-slate-500 text-white text-xl max-w-[60rem] p-6 rounded-lg shadow-lg mb-5">
            <p>
              Testimonials are short quotes from people who love your brand.
              It&apos;s a great way to convince customers to try your services.
            </p>
            <p className="mt-4 text-pink-400">-Aaron Loeb, Tully and Drive</p>
          </div>

          <div className="bg-slate-500 text-white text-xl max-w-[60rem] p-6 rounded-lg shadow-lg">
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
