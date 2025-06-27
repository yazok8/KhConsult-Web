import AboutPage from "./pages/about/page";  
import ContactPage from "./pages/contact/page";  
import FAQ from "./pages/faq/page";  
import ServicesPage from "./pages/services/page";  
import Homepage from "./pages/home/page";  
import StoryPage from "./pages/story/page";
  
export default function Home() {  
  return (  
   <>  
    <Homepage />  
    <AboutPage />
    <StoryPage />  
    <ServicesPage />  
    <FAQ />  
    {/* <ReviewsPage />   */}
    <ContactPage />  
   </>  
  );  
}
