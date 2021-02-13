/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from "gatsby"
import { RiHeart2Line } from "react-icons/ri";

const Footer = () => (
  <footer 
    className="site-footer"
    sx={{
      bg: 'primary'
    }}
  >
    <div className="container">
      <p>Blog feito com: GatsbyJS utilizando: Netlify CMS <span className="icon -love"><RiHeart2Line/></span></p>
    </div>
  </footer>
)

export default Footer
