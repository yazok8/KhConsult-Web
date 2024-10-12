
import AboutPage from "./pages/about/page";
import ContactPage from "./pages/contact/page";
import FAQ from "./pages/faq/page";
import Homepage from "./pages/home/page";
import ReviewsPage from "./pages/reviews/page";
import ServicesPage from "./pages/services/page";


export default function Home() {
  return (
    <>
      <Homepage/>
      <AboutPage/>
      <ServicesPage />
      <FAQ/>
      <ReviewsPage />
      <ContactPage />
  </>
  );
}
