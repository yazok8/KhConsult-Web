import Homepage from "./pages/home/page";


export default function Home() {
  return (
    <>
      <Homepage/>
      <section id="about" className="text-black h-screen text-center flex">
      <h1 className="m-auto font-waterfall text-7xl">About</h1>
      </section>
      <section id="services" className="text-black h-screen text-center flex">
      <h1 className="m-auto font-waterfall text-7xl">Services</h1>
      </section>
      <section id="coaching" className="text-black h-screen text-center flex">
      <h1 className="m-auto font-waterfall text-7xl">Job Coaching</h1>
      </section>
      <section id="faq" className="text-black h-screen text-center flex">
      <h1 className="m-auto font-waterfall text-7xl">FAQs</h1>
      </section>
      <section id="reviews" className="text-black h-screen text-center flex">
      <h1 className="m-auto font-waterfall text-7xl">Early Reviews</h1>
      </section>
      <section id="contact" className="text-black h-screen text-center flex">
      <h1 className="m-auto font-waterfall text-7xl">Contact</h1>
      </section>
  </>
  );
}
