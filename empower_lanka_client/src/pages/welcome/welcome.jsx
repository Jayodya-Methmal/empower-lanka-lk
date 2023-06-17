import "./welcome.scss";
import videoBg from "../../assets/backgroundvideo.mp4";
import welcomeVideo from "../../assets/welcome video.mp4";
import allinone from "../../assets//a user freindly.jpg";
import consultant from "../../assets/consultant.jpg";
import network from "../../assets/networkk.jpg";
import ecommerce from "../../assets/ecommerce.jpg";

const Welcome = () => {
  function scrollToSection(id) {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="welcome">
      <div className="main-sec">
        <video className="bgVideo" src={videoBg} autoPlay loop muted></video>
        <div className="container">
          <span>
            <h1>Welcome to Empower Lanka </h1>
          </span>
          <h2>Connect, Learn and Grow </h2>
          <button
            className="main-btn"
            onClick={() => scrollToSection("features_section")}
          >
            {" "}
            Get Started{" "}
          </button>
        </div>
      </div>

      <div className="features_section" id="features_section">
        <h2>Our Features</h2>
        <div className="features" id="features">
          <div className="feature">
            <h3>User-friendly Interface</h3>
            <img src={allinone} alt="" />
            <p>
              Our platform is designed to be easy to use, even for those without
              technical knowledge.
            </p>
            <button className="features_btn"  onClick={() => scrollToSection("user_friendly")}> Learn More </button>
          </div>
          <div className="feature">
            <h3>Knowledge Base</h3>
            <img src={allinone} alt="" />
            <p>
              Our platform provides a vast library of resources to grow your
              business.
            </p>
            <button className="features_btn" onClick={() => scrollToSection("EntrepreneurNetwork")}>Learn More</button>
          </div>
          <div className="feature">
            <h3>All-in-One Solution</h3>
            <img src={allinone} alt="" />
            <p>
              You don't need to use multiple tools to manage your business. We
              offer everything in one place.
            </p>
            <button className="features_btn" onClick={() => scrollToSection("EntrepreneurNetwork")}>Learn More</button>
          </div>
        </div>
      </div>

      <div className="EntrepreneurNetwork" id="EntrepreneurNetwork">
        <h1>What we offer - All in One Solution</h1>
        <div className="content">
          <div className="EntrepreneurNetwork__content">
            <h2 className="ctn_heading">
              Entrepreneur to Entrepreneur Network
            </h2>
            <p>
              The Entrepreneur to Entrepreneur Network is a platform designed
              for entrepreneurs to connect with each other and share ideas,
              advice, and resources. By joining the network, you'll be able to
              tap into a community of like-minded individuals who are passionate
              about entrepreneurship.
            </p>
          </div>
          <div className="EntrepreneurNetwork__image">
            <img src={network} alt="Entrepreneur Network" />
          </div>
        </div>

        <div className="content2">
          <div className="EntrepreneurNetwork__content">
            <h2 className="ctn_heading">
              Expert Business Consulting: Unlock Your Business's Potential
            </h2>
            <p>
              Maximize the success of your business with our expert consultants.
              Our team offers years of experience and industry knowledge to help
              you navigate challenges and capitalize on opportunities. Whether
              you're starting a new business or looking to grow an existing one,
              we provide tailored solutions that will unlock your business's
              full potential.
            </p>
          </div>
          <div className="EntrepreneurNetwork__image">
            <img src={consultant} alt="Entrepreneur Network" />
          </div>
        </div>

        <div className="content">
          <div className="EntrepreneurNetwork__content">
            <h2 className="ctn_heading">
              Revolutionize Your Online Business with Our Ecommerce Platform
            </h2>
            <p>
              Discover a powerful ecommerce solution that delivers results. Our
              platform offers a range of user-friendly tools and features to
              help you build and manage your online store, grow your customer
              base, and increase sales. Create a professional online presence
              that stands out from the competition and start achieving your
              ecommerce goals today.
            </p>
          </div>
          <div className="EntrepreneurNetwork__image">
            <img src={ecommerce} alt="Entrepreneur Network" />
          </div>
        </div>
      </div>

      <div className="user_friendly" id="user_friendly">
      <h1> User Friendly Interface</h1>

      <div className="content">

        <p>
          Our platform is user-friendly, intuitive, and designed with a simple yet effective interface. We have created a
          video demonstration to showcase its features and ease of use. Our goal is to provide an accessible and streamlined
          experience for all users, regardless of their level of expertise. We welcome feedback to continually improve our
          platform and ensure the best possible user experience.
        </p>
        <div className="video-container">
          <video controls>
            <source src={welcomeVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>



      <div className="testimonial">
        <h2>Testimonials</h2>
        <div className="card_section">
          <div className="card">
            <div className="avatar"></div>
            <p>
              "Entrepreneur Platform has been a game-changer for my business. It
              has everything I need to manage and grow my company."
            </p>
            <h4>John Doe, CEO</h4>
          </div>
          <div className="card">
            <div className="avatar"></div>
            <p>
              "Entrepreneur Platform has been a game-changer for my business. It
              has everything I need to manage and grow my company."
            </p>
            <h4>John Doe, CEO</h4>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer__content">
          <div className="footer__left">
            <h3 className="footer__logo">Empower Lanka</h3>
            <p className="footer__address">
              123 Main Street, Colombo, Sri Lanka
            </p>
          </div>
          <div className="footer__middle">
            <nav className="footer__nav">
              <a href="/" className="footer__link">
                Home
              </a>
              <a href="/" className="footer__link">
                Buy
              </a>
              <a href="/" className="footer__link">
                Contact Us
              </a>
            </nav>
            {/* <div className="footer__social-icons">
              <a href="/">a</a>
              <a href="/">a</a>
              <a href="/">a</a>
            </div> */}
          </div>
          <div className="footer__right">
            <p className="footer__copy">
              &copy; {new Date().getFullYear()} Empower Lanka. All Rights
              Reserved. Design and Developed By Jayodya, Isurika &amp; Annika
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
