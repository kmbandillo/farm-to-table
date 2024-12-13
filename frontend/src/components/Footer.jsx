import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-[#75B27C] py-12">
      <div className="container ">
        <div className="footer-content">
          <div className="about">
            <h5 className='text-5xl font-bold font-sans'>Agrilink.</h5>
            <div className='linebreak bg-[#ffffff] w-96 h-1 my-4'></div>
            <p>1st, Physical Sciences Building, Harold Cuzner  <br />Royal Palm Ave, Los Baños, 4031 Laguna</p>
          </div>
          <div className="contact">
            <h5>Contact Us</h5>
            <ul className="contact-list">
              <li><i className="fas fa-envelope"></i> agrilink@gmail.com</li>
              <li><i className="fas fa-phone"></i> +639 123 465 100</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>Copyright &#169; 2024 Agrilink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
