import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-[#75B27C] py-12 w-full h-[200px] p-10">
      <div className="container ">
        <div className="flex">
          <div className="w-[85%]">
            <h5 className='text-3xl font-extrabold font-sans'>AgriLink.</h5>
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
        <div className="text-center">
          <p>Copyright &#169; 2024 AgriLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
