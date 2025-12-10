import React from 'react'

function SocialMedia() {
  return (
    <div className="icon-bar">

      {/* WhatsApp App */}
      <a 
        href="whatsapp://send?phone=918888888888" 
        className="whatsapp"
      >
        <i className="fa fa-whatsapp"></i>
      </a>

      {/* Facebook App */}
      <a 
        href="fb://profile/your-profile-id"
        className="facebook"
      >
        <i className="fa fa-facebook"></i>
      </a>

      {/* Twitter App */}
      <a 
        href="twitter://user?screen_name=yourUsername"
        className="twitter"
      >
        <i className="fa fa-twitter"></i>
      </a>

      {/* Gmail */}
      <a 
        href="mailto:youremail@gmail.com"
        className="google"
        target="_blank"
      >
        <i className="fa fa-google"></i>
      </a>

      {/* LinkedIn App */}
      <a 
        href="linkedin://in/yourUsername"
        className="linkedin"
      >
        <i className="fa fa-linkedin"></i>
      </a>

      {/* YouTube */}
      <a 
        href="https://youtube.com/@thepreproute?si=V1do8AhktReWX9ZQ"
        className="youtube"
        target="_blank"
      >
        <i className="fa fa-youtube"></i>
      </a>

      {/* ✅ Instagram App */}
      <a
        href="https://www.instagram.com/preproute?igsh=ZjhtNjM5YnM3enYy"
        className="instagram"
        target='blank'
      >
        <i className="fa fa-instagram"></i>
      </a>

    </div>
  );
}

export default SocialMedia;
