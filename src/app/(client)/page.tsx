import AboutPage from "./pages/about/page";  
import ContactPage from "./pages/contact/page";  
import FAQ from "./pages/faq/page";  
import ServicesPage from "./pages/services/page";  
import Homepage from "./pages/home/page";  
import ReviewsPage from "./pages/reviews/page";  
import TeamPage from "./pages/team/page";
  
export default function Home() {  
  return (  
   <>  
    <Homepage />  
    <AboutPage />
    <TeamPage />  
    <ServicesPage />  
    <FAQ />  
    <ReviewsPage />  
    <ContactPage />  
   </>  
  );  
}
