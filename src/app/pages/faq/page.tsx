export default function FAQ() {
    return (
      <section
        id="faq"
        className="mt-20 flex flex-col text-black min-h-screen lg:h-[75vh] md:h-[120vh] pt-20 px-5 lg:px-0"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-12">FAQ</h1>
  
        {/* FAQ Items Container */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-center items-stretch gap-8">
          
          {/* Individual FAQ Item */}
          <article className="flex flex-col bg-slate-300 text-black rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="p-6 bg-slate-500 rounded-t-lg text-2xl font-semibold">
              What is the advantage of hiring me instead of a lawyer?
            </h3>
            <div className="p-6 flex-grow">
              <p>
                Having an FAQ section is a great way to present information about your product or service. Using the question-and-answer format makes it more relatable to your users.
              </p>
            </div>
          </article>
  
          {/* Repeat for other FAQ items */}
          <article className="flex flex-col bg-slate-300 text-black rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="p-6 bg-slate-500 rounded-t-lg text-2xl font-semibold">
            What kind of deliverables are to be expected?
            </h3>
            <div className="p-6 flex-grow">
              <p>
              Having an FAQ section is a great way to present information about your product or service. Using the question-and-answer format makes it more relatable to your users.
              </p>
            </div>
          </article>
  
          <article className="flex flex-col bg-slate-300 text-black rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="p-6 bg-slate-500 rounded-t-lg text-2xl font-semibold">
            How long will the project take and how long until results can be measured?
            </h3>
            <div className="p-6 flex-grow">
              <p>
              Having an FAQ section is a great way to present information about your product or service. Using the question-and-answer format makes it more relatable to your users.
              </p>
            </div>
          </article>
  
        </div>
      </section>
    );
  }
  