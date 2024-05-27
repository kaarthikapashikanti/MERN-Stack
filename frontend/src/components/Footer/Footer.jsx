import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const d = new Date();
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo} alt="" />
          <p>
            At Pizza Pulse, we're dedicated to delivering the finest culinary
            experience with every bite. From our handcrafted pizzas to our
            carefully selected ingredients, each aspect of our menu is crafted
            with passion and precision. Join us on a journey where flavors
            ignite, and every meal is a celebration of taste. Come, savor the
            essence of artisanal pizza at Pizza Pulse, where every slice tells a
            story.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About US</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-123-7890</li>
            <li>contact@pizzapulse.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright {d.getFullYear()} © PizzaPulse.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
