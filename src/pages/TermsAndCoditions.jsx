import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import "./styles/terms_and_conditions.css";

function TermsAndCoditions() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Terms and conditions - Samjhana </title>
        <meta
          name="description"
          content=" Samhana doesn't have strict guidelines. Here in this platform we
          want all our users to not act like a civil citizens of a single
          country but a civil human being whose home is the whole earth."
        />
      </Helmet>
      <section>
        <div className="termsAndConditions fadeIn">
          <h1 className="termsAndConditionsHeading">
            <strong>Terms and Conditions</strong>
          </h1>

          <h4 className="samjhanaWelcome">Welcome to Sajhnana!</h4>

          <p className="termsParagraphIntro">
            These terms and conditions outline the rules and regulations for the
            use of Samjhana's Website, located at samjhana.netlify.app.
          </p>

          <div className="serviceLeadingSection">
            <h4>
              <span className="sn blue">1.</span>
              <span className="st blue">Guidelines</span>
            </h4>
            <p className="spl">
              Samhana doesn't have strict guidelines. Here in this platform we
              want all our users to not act like a civil citizens of a single
              country but a civil human being whose home is the whole earth.
            </p>
            <div className="serviceInfoContainer">
              <h6 className="serviceLead">Viewing the post</h6>
              <p className="serviceDetails">
                We require you to use have a google and github account to access
                the website. And no more restrictions on viewing the contents.
              </p>
              <div className="secionLine lineColorBlue"></div>
            </div>
            <div className="serviceInfoContainer">
              <h6 className="serviceLead">Posting</h6>
              <p className="serviceDetails">
                You can post anytime and as much wishes you want. But you
                shouldn't be posting political things or the contents that are
                not legal. Don't spam the site.
              </p>
              <div className="secionLine lineColorBlue"></div>
            </div>
            <div className="serviceInfoContainer">
              <h6 className="serviceLead">Images</h6>
              <p className="serviceDetails">
                Sharing harmful and scary images are highly prohibited. Quick
                actions will be taken against the creator if any disturbing
                image is found in the website.{" "}
              </p>
              <div className="secionLine lineColorBlue"></div>
            </div>
            <div className="serviceInfoContainer">
              <h6 className="serviceLead">Age restrictions</h6>
              <p className="serviceDetails">
                Age is just a number. It doesn't define you so feel free to use
                this platform without any age limit.
              </p>
              <div className="secionLine lineColorGreen"></div>
            </div>
          </div>

          <div className="serviceLeadingSection">
            <h4>
              <span className="sn orange">2.</span>
              <span className="st orange">License</span>
            </h4>
            <p className="spl">
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the "Software"), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions: The above
              copyright notice and this permission notice shall be included in
              all copies or substantial portions of the Software.
            </p>
            <div className="serviceInfoContainer">
              <h6 className="serviceLead">MIT license</h6>
              <p className="serviceDetails">
                Copyright (c) 2022 Aashish Panthi
              </p>
              <div className="secionLine lineColorOrange"></div>
            </div>
            <div className="serviceInfoContainer">
              <h6 className="serviceLead">Privacy</h6>
              <p className="serviceDetails">
                Read more about privacy policy{" "}
                <Link style={{ textDecoration: "none" }} to="/privacy-policy">
                  here
                </Link>
                .
              </p>
              <div className="secionLine lineColorOrange"></div>
            </div>
            <p className="spl">
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsAndCoditions;
